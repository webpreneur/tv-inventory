import React, { Component } from 'react';
import './List.css';
import Televisions from '../../db/tvs';

import TV from '../../components/TV/TV';
import NameFilter from '../../components/Filter/NameFilter/NameFilter';
import NumberFilter from '../../components/Filter/NumberFilter/NumberFilter';
import CheckBoxFilter from '../../components/Filter/CheckBoxFilter/CheckBoxFilter';

export default class List extends Component {

  state = {
    televisions: Televisions,
    filterValues: {
      displaySizes: [],
      displayTypes: [],
      resolutionsKs: [],
      outputs: [],
    },
    filterConfig: {
      name: '',
      displaySize: {
        value: null,
        type: '',
      },
      displayType: [''],
      resolutionK: {
        value: null,
        type: '',
      },
      outputs: [''],
    }
  }

  componentDidMount() {
    this._populateFilterValues();
  }

  _populateFilterValues() {

    const filterValues = {
      displaySizes: this._pullAndSortIndividualValues('displaySizeInInches'),
      displayTypes: this._pullAndSortIndividualValues('displayType'),
      resolutionsKs: this._pullAndSortIndividualValues('resolutionK'),
      outputs: this._pullAndSortIndividualValues('outputs'),
    }

    this.setState({
      ...this.state,
      filterValues,
    });

  }

  _pullAndSortIndividualValues(propKey) {
    const arrayOfValues = this.state.televisions.map( tv => tv[propKey] ).flat();
    const setOfValues = new Set(arrayOfValues);
    const individualAndSortedValuesArray = Array.from(setOfValues).sort((a, b) => a - b);

    return individualAndSortedValuesArray;
  }

  render() {

    return (
      <>
        <header className="TV grid-header">
          <section>
            <span>Name</span>
            <div className="filter-box">
              <NameFilter />
            </div>
          </section>

          <section>
            <span>ItemNo</span>
          </section>

          <section>
            <span>DisplaySize</span>
            <div className="filter-box">
              <NumberFilter />
            </div>
          </section>

          <section>
            <span>DisplayType</span>
            <div className="filter-box">
              <CheckBoxFilter checkboxValues={this.state.filterValues.displayTypes} />
            </div>
          </section>

          <section>
            <span>ResolutionK</span>
            <div className="filter-box">
              <NumberFilter />
            </div>
          </section>

          <section>
            <span>Outputs</span>
            <div className="filter-box">
              <CheckBoxFilter checkboxValues={this.state.filterValues.outputs} />
            </div>
          </section>
        </header>


        <main>
          {
            this.state.televisions.map( (television) => (

                <TV
                  key={television.itemNo}
                  tvDetails={television}
                />

              )
            )
          }
        </main>
      </>
    )

  }

}
