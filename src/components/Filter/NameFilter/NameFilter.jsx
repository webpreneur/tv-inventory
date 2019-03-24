import React, { Component } from 'react'

export default class NameFilter extends Component {
    render() {
        return (
            <>
                <input placeholder="name" type="text" />

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
