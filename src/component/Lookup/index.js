import React, { Component } from 'react'
import Row from '../Row'
import './index.css'


export default class Lookup extends Component {
  state = {
    keyword: '',
  }


  handleInputChange = () => {
    const { input } = this
    this.setState({
      keyword: input.value
    })
  }


  render() {
    const { langs, allTitles, placeholder, getMatchedTitles } = this.props
    const { keyword } = this.state

    const matchedTitles = getMatchedTitles(keyword, allTitles)

    return (
      <div className='lookup'>
        <header>
          <input type="text" ref={c => { this.input = c }}
            placeholder={placeholder}
            onChange={this.handleInputChange}>
          </input>
        </header>
        <div className='table'>
          <table>
            <tbody>
              {
                matchedTitles.map(titleObj =>
                  <Row key={titleObj.id} langs={langs} titleObj={titleObj} />)
              }
            </tbody>
          </table>
        </div>
        <footer></footer>
      </div>
    )
  }
}
