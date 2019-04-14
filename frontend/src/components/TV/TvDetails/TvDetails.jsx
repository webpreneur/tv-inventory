import React, { Component } from 'react';
import { withRouter } from "react-router";
import * as apiCalls from '../../../api/api';

class TvDetails extends Component {

    state = {
        tvs: this.props.tvs,
    };

    componentWillMount() {
        this.loadTv();
    }

    redirectToTvs = () => {
        this.props.history.push('/televisions');
    }

    async loadTv() {

        const tv = await apiCalls.getTv(this.props.match.params.id)

        this.setState({
            ...tv,
        });

    }

    render() {

        let result = [];

        for (const key in this.state) {

            if ( !['_id', '__v', 'tvs'].includes(key) ) {

                result.push(`${key}: ${this.state[key]}`);

            }

        }

        return (

            <>
                <h2>TV Details</h2>

                {result.map( (text, i) => <p key={`${this.state._id}_${i}`} >{text}</p>)}

                <button
                    style={{
                        background: 'salmon',
                        border: 'none',
                        padding: '20px',
                        fontSize: '1.2rem',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    onClick={this.props.deleteTv(this.state._id, this.redirectToTvs)}
                >
                    Delete TV
                </button>
            </>

        );
    }

}

export default withRouter(TvDetails);
