import React, { Component } from 'react'

export default class NumberFilter extends Component {
  render() {
    return (
      <>
        <input type="number"/ >

        <fieldset className="filter-type-container">
            <label htmlFor="filter-type-select">Choose Filter Type</label>

            <select id="filter-type-select">
                <option value="lessThan">Less than...</option>
                <option value="equals">Equals</option>
                <option value="greaterThan">Greater than...</option>
            </select>
        </fieldset>

      </>
    )
  }
}
