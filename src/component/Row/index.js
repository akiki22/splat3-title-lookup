import React, { Component } from 'react'
import './index.css'

export default class Row extends Component {
  render() {
    const { langs, titleObj } = this.props
    return (
      <tr>
        {
          langs.map((lang, index) => (
            <td key={index}>
              {titleObj[lang]}
            </td>
          ))
        }
      </tr>
    )
  }
}
