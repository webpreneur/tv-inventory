import React, { Component } from 'react'

export default class NumberFilter extends Component {

  filterMode = 'lessThan';
  searchValue = null;

  _handleSearchValueInput = ({
    target: {
        value: searchValue,
    }
  }) => {

    this.searchValue = parseInt(searchValue, 10);

    this.props.onChange({
        filterLabel: this.props.label,
        filterValue: this.searchValue,
        filterMode: this.filterMode,
    });

  }

  _handleFilterModeInput = ({
    target: {
      value: filterMode
    }
  }) => {
    this.filterMode = filterMode;
    this._handleSearchValueInput({
      target:{
        value: this.searchValue,
      }
    });
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
