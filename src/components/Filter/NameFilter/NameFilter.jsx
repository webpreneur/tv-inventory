import React, { Component } from 'react'

export default class NameFilter extends Component {

    state = {
        searchString: '',
    }

    handleInput = ({
        target: {
            value: searchString,
        }
    }) => {
        this.props.onChange({
            filterLabel: 'name',
            filterValue: searchString,
        });
    }

    render() {
        return (
            <>
                <input
                    onInput={ this.handleInput }
                    placeholder="name"
                    type="text" />

                <fieldset className="filter-type-container">
                    <label htmlFor="filter-type-select">Choose Filter Type</label>

                    <select id="filter-type-select">
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                    </select>
                </fieldset>

            </>
        )
    }
}
