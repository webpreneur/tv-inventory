import React, { Component } from 'react';
import './TV.css';

export default class TV extends Component {

  render() {

    const {
      name,
      itemNo,
      displaySizeInInches,
      displayType,
      resolutionK,
      outputs
    } = this.props.tvDetails;

    const outputsList = outputs.map( (output, i) => (<span key={ `${itemNo}_${i}` } >{ output }</span>) );

    return(

      <div className="TV">
        <span>{ name }</span>
        <span>{ itemNo }</span>
        <span>{ displaySizeInInches }</span>
        <span>{ displayType }</span>
        <span>{ resolutionK }</span>
        <span>
          { outputsList }
        </span>
      </div>

    )
  }
}



