import React, { Component } from 'react'

export default class NumberFilter extends Component {

  filterMode = 'lessThan';

  _handleSearchValueInput = ({
    target: {
        value: searchValue,
    }
  }) => {
    this.props.onChange({
        filterLabel: 'name',
        filterValue: parseInt(searchValue, 10),
        filterMode: this.filterMode,
    });
  }

  _handleFilterModeInput = ({
    target: {
      value: filterMode
    }
  }) => {
    this.filterMode = filterMode;
  }

  render() {
    return (
      <>
        <input onInput={ this._handleSearchValueInput } type="number"/ >

        <fieldset className="filter-type-container">
            <label htmlFor="filter-type-select">Choose Filter Type</label>

            <select onInput={ this._handleFilterModeInput } id="filter-type-select">
                <option value="lessThan">Less than...</option>
                <option value="equals">Equals</option>
                <option value="greaterThan">Greater than...</option>
            </select>

        </fieldset>

      </>
    )
  }
}
