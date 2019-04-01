import React, { Component } from 'react'

export default class NameFilter extends Component {

    filterMode = 'contains';
    searchString = '';

    _handleSearchValueInput = ({
        target: {
            value: searchString,
        }
    }) => {

        this.searchString = searchString;

        this.props.onChange({
            filterLabel: 'name',
            filterValue: this.searchString,
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
                <input
                    onInput={ this._handleSearchValueInput }
                    placeholder="name"
                    type="text" />

                <fieldset className="filter-type-container">
                    <label htmlFor="filter-type-select">Choose Filter Type</label>

                    <select  onInput={ this._handleFilterModeInput } id="filter-type-select">
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                    </select>

                </fieldset>

            </>
        )
    }
}
