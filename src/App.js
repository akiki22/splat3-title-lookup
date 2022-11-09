import React, { Component } from 'react'
import axios from 'axios'
import Lookup from './component/Lookup'
import './App.css'


export default class App extends Component {
  state = {
    langs: ['CNzh', 'JPja', 'USen', 'EUfr'],
    adjective: {},
    subject: {},
  }


  componentDidMount() {
    console.log('did mount')

    const { langs } = this.state

    // 删除[]中的内容
    const bracket = /\[.+?\]/gi

    langs.forEach(lang => {
      const url = `https://leanny.github.io/splat3/data/language/${lang}.json`

      axios.get(url)
        .then(response => {
          // console.log(response)
          const data = response.data
          const currentAdj = data['CommonMsg/Byname/BynameAdjective']
          const currentSub = data['CommonMsg/Byname/BynameSubject']

          const { adjective, subject } = this.state

          for (let id in currentAdj) {
            if (!adjective.hasOwnProperty(id)) {
              adjective[id] = { id: id }
            }
            adjective[id][lang] = currentAdj[id].replace(bracket, '')
          }

          for (let id in currentSub) {
            // 去掉id为xxxx_1的多余数据
            if (id[5] === '1') continue
            if (!subject.hasOwnProperty(id)) {
              subject[id] = { id: id }
            }
            subject[id][lang] = currentSub[id].replace(bracket, '')
          }

          this.setState({
            adjective: adjective,
            subject: subject,
          })

        })
        .catch(error => { console.log(error) })
    })
  }


  // 返回包含keyword的titles
  getMatchedTitles = (keyword, allTitles) => {
    const kwReg = new RegExp(keyword, 'i')
    const titles = Object.values(allTitles).filter(titleObj =>
      // 该title只要有任一语言包含keyword即可
      Object.keys(titleObj).some(key => {
        if (key === 'id') {
          return false
        }
        return titleObj[key].match(kwReg)
      })
    )
    return titles
  }


  render() {
    const { langs, adjective, subject, } = this.state

    return (
      <div className='app'>
        <h1>
          <span>Splatoon 3</span> <br />
          <span>中/日/英/法称号速查</span>
        </h1>

        <div className='main'>
          <Lookup
            langs={langs}
            allTitles={adjective}
            placeholder={'搜索前缀'}
            getMatchedTitles={this.getMatchedTitles}
          />
          <Lookup
            langs={langs}
            allTitles={subject}
            placeholder={'搜索后缀'}
            getMatchedTitles={this.getMatchedTitles}
          />
        </div>

        <footer>
          <p>
            Author: &nbsp;
            <span>@Aki!</span>
            &nbsp; from 蛮颓镇扶贫促进就业发展群🦑🐙
          </p>
          <p>
            Data Source: &nbsp;
            <a href='https://leanny.github.io/splat3/database.html'>
              leanny.github.io/splat3/database.html
            </a>
          </p>
        </footer>
      </div>

    )
  }
}

