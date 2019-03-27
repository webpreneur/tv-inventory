import React, { Component } from 'react'

export default class CheckBoxFilter extends Component {
  render() {
    return (
      <>
        {
          this.props.checkboxValues.map( (checkboxValue, i) => (
            <div key={ checkboxValue + i } >
              <label htmlFor={checkboxValue + i}>{checkboxValue}</label>
              <input
                type="checkbox"
                id={checkboxValue + i}
                value={checkboxValue}
                name={checkboxValue}
              />
            </div>
          ))
        }
      </>
    )
  }
}
