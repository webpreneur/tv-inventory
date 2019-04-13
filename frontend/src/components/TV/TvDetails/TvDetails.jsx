import React, { Component } from 'react';
import apiUrls from '../../../api/api-urls';
import { withRouter } from "react-router";

class TvDetails extends Component {

    state = {};

    componentWillMount() {
        this.loadTv();
    }

    loadTv() {
        fetch(`${apiUrls.tvApi}${this.props.match.params.id}`)
            .then( response => {
                if(!response.ok) {
                if ( response.status >= 400 && response.status < 500 ) {
                    return response.json()
                    .then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    })
                } else {
                    let err = {errorMessage: 'please try again later, server is not responding'};
                    throw err;
                }
                }
                return response.json();
            })
            .then( tv => {
                this.setState(tv);
            });
    }

    render() {

        let result = [];

        for (const key in this.state) {
            result.push(`${key}: ${this.state[key]}`);
        }

        const mySpan = document.createElement('span');
        mySpan.innerText = 'próba';

        return (
            <>
                <h2>TV Details</h2>
                {result.map( text => <p>{text}</p>)}
            </>
        );
    }

}

export default withRouter(TvDetails);
