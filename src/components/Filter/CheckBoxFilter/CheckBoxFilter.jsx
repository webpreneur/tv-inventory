import React, { Component } from 'react'

export default class CheckBoxFilter extends Component {

  checkedValues = new Set([]);

  _handleToggle = ({
    target: {
      value,
      checked,
    }
  }) => {

    checked ? this.checkedValues.add(value) : this.checkedValues.delete(value);

    this.props.onChange({
      filterLabel: this.props.label,
      filterValue: [...this.checkedValues],
      filterMode: undefined,
    });

  }

  render() {
    return (
      <>
        {
          this.props.checkboxValues.map( (checkboxValue, i) => (
            <div key={ checkboxValue + i } >
              <label htmlFor={ checkboxValue + i }>{ checkboxValue }</label>
              <input
                onInput={ this._handleToggle }
                type="checkbox"
                id={ checkboxValue + i }
                value={ checkboxValue }
                name={ checkboxValue }
              />
            </div>
          ))
        }
      </>
    )
  }
}
