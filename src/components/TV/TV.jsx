import React, { Component } from 'react';
import './TV.css';

class TV extends Component {

  render() {

    const { tvDetails } = this.props;
    return(
      <div className="TV">
        <span>{tvDetails.name}</span>
        <span>{tvDetails.itemNo}</span>
        <span>{tvDetails.displaySizeInInches}</span>
        <span>{tvDetails.displayType}</span>
        <span>{tvDetails.resolutionK}</span>

      </div>
    )
  }
}

export default TV;


