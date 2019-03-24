import React, { Component } from 'react';

import TV from '../../components/TV/TV';
import Televisions from '../../db/tvs';

class List extends Component {

  state = {
    televisions: Televisions 
  }

  componentDidMount () {
    this.getDisplaySizes();
  }

  getDisplaySizes = () => {
    const displaySizes = this.state.televisions.map((tv) => tv.displaySizeInInches);
    const displaySizesSet = new Set(displaySizes);
    const individualDisplaySizes = Array.from(displaySizesSet).sort((a, b) => a - b);
    console.log(individualDisplaySizes);
  }

  render() {

    const headers = {
      name: "Name",
      itemNo: "Item Number",
      displaySizeInInches: "Display Size In Inches",
      displayType: "Display Type",
      resolutionK: "Resolution K"
    }

    return(
      <div>

      <TV tvDetails={headers}/>


        {
          this.state.televisions.map( (television) => {
            return (
              
              <TV 
                key={television.itemNo}
                tvDetails={television}
              />
            )
          })
        }
      </div>
    )

  }

}

export default List;