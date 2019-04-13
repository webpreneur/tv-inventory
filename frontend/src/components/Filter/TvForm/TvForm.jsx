import React, {Component} from 'react';

export default class TvForm extends Component {

    state = {
        name: '',
        itemNo: '',
        displaySizeInInches: null,
        displayType: '',
        resolutionK: null,
        outputs: [],
    }

    set inputValue({
        propName,
        value
    }) {
        this.setState({
            ...this.state,
            [propName]: value,
        })
    }

    handleChange = propName => ({
        target : {
            value
        }
    }) => {

        value = propName !== 'outputs' ? value : value.split(';').map( output => output.trim() );

        this.inputValue = {
            propName,
            value,
        }
    }

    handleSubmit = () => {
        this.props.addTv({...this.state});
    }

    render() {
        return (
            <section>

                <input
                    type="text"
                    value={ this.state.name }
                    placeholder="Name..."
                    onChange={ this.handleChange('name') }
                />

                <input
                    type="text"
                    value={ this.state.itemNo }
                    placeholder="SKU..."
                    onChange={ this.handleChange('itemNo') }
                />

                <input
                    type="number"
                    value={ this.state.displaySizeInInches === null ? '' : this.state.displaySizeInInches }
                    placeholder="Size..."
                    onChange={ this.handleChange('displaySizeInInches') }
                />

                <input
                    type="text"
                    value={ this.state.displayType }
                    placeholder="Type..."
                    onChange={ this.handleChange('displayType') }
                />

                <input
                    type="number"
                    value={ this.state.resolutionK === null ? '' : this.state.resolutionK }
                    placeholder="Resolution..."
                    onChange={ this.handleChange('resolutionK') }
                />

                <input
                    type="text"
                    value={ this.state.outputs.join(';') }
                    placeholder="Outputs, seperated by semicolons..."
                    onChange={ this.handleChange('outputs') }
                />

                <button
                    onClick={ this.handleSubmit }
                >
                    Hozzáadás
                </button>

                <button>Mégse</button>
            </section>
        )
    }

}
