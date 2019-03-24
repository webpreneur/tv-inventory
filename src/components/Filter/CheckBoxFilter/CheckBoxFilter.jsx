import React, { Component } from 'react'

export default class CheckBoxFilter extends Component {
  render() {
    return (
      <>
        {
          this.props.checkboxValues.map( (checkboxValue, i) => (
            <>
              <label htmlFor={checkboxValue + i}>{checkboxValue}</label>
              <input
                type="checkbox"
                id={checkboxValue + i}
                key={i + checkboxValue}
                value={checkboxValue}
                name={checkboxValue}
              />
            </>
          ))
        }
      </>
    )
  }
}
