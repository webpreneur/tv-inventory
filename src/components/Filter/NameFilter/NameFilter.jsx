import React, { Component } from 'react'

export default class NameFilter extends Component {

    _handleInput = ({
        target: {
            value: searchString,
        }
    }) => {
        this.props.onChange({
            filterLabel: 'name',
            filterValue: searchString,
            filterMode: undefined,
        });
    }

    render() {
        return (
            <>
                <input
                    onInput={ this._handleInput }
                    placeholder="name"
                    type="text" />

                <fieldset className="filter-type-container">
                    <label htmlFor="filter-type-select">Choose Filter Type</label>

                    {/* TODO: implement filtermode logic */}
                    <select id="filter-type-select">
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                    </select>

                </fieldset>

            </>
        )
    }
}
