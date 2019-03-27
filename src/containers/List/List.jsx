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
    filteredTelevisions: [],
    filtersValuesSet: {
      displaySizes: [], // unused value set yet
      displayTypes: [],
      resolutionsKs: [], // unused value set yet
      outputs: [],
    },
    filters: [
      {
        filterLabel: 'name',
        filterType: 'string',
        filterValue: '',
        filterMode: undefined,
      },
      {
        filterLabel: 'displaySize',
        filterType: 'number',
        filterValue: null,
        filterMode: 'lessThan',
      },
      {
        filterLabel: 'displayType',
        filterType: 'checkbox',
        filterValue: [],
        filterMode: undefined,
      },
      {
        filterLabel: 'resolutionK',
        filterType: 'number',
        filterValue: null,
        filterMode: 'lessThan',
      },
      {
        filterLabel: 'outputs',
        filterType: 'checkbox',
        filterValue: [],
        filterMode: undefined,
      },
    ]
  }

  componentDidMount() {
    this._populateFilterValues();
  }

  _populateFilterValues() {

    const filtersValuesSet = {
      displaySizes: this._pullAndSortIndividualValues('displaySizeInInches'),
      displayTypes: this._pullAndSortIndividualValues('displayType'),
      resolutionsKs: this._pullAndSortIndividualValues('resolutionK'),
      outputs: this._pullAndSortIndividualValues('outputs'),
    }

    this.setState({
      ...this.state,
      filtersValuesSet,
    });

  }

  _pullAndSortIndividualValues(propKey) {
    const arrayOfValues = this.state.televisions.map( tv => tv[propKey] ).flat();
    const setOfValues = new Set(arrayOfValues);
    const individualAndSortedValuesArray = Array.from(setOfValues).sort((a, b) => a - b);

    return individualAndSortedValuesArray;
  }

  _isGridFiltered() {
    const isGridFiltered = this.state.filters.some(
      ({ filterValue }) => this._isFilterActive(filterValue)
    );

    console.log(isGridFiltered);

    return isGridFiltered;

  }

  handleFilter = ({
    filterValue,
    filterLabel
  }) => {

    const filters = [...this.state.filters];
    const filterIndex = this.state.filters.findIndex( filter => filter.filterLabel === filterLabel );

    filters[filterIndex].filterValue = filterValue;

    this.setState({
      ...this.state,
      filters,
    });

    this._filterTelevisions();

  }

  _filterTelevisions() {

    const activeFilters = this.state.filters.filter( ({ filterValue }) => this._isFilterActive(filterValue) );

    let filteredTVs = [...this.state.televisions];

    activeFilters.forEach(({
      filterLabel: label,
      filterValue: value,
      filterMode: mode,
      filterType: type,
    }) => {
      filteredTVs = filteredTVs.filter( tv => {
        let isCurrentTvMatches = false;

        switch(type) {
          case 'string':
            isCurrentTvMatches = tv[label].toLowerCase().includes(value.toLowerCase());
            break;
          case 'number':

            break;
          case 'checkbox':

            break;
          default:
            throw new TypeError(`Unkown filter type: ${type}`);
        }

        return isCurrentTvMatches;
      })
    });

    this.setState({
      ...this.state,
      filteredTelevisions: filteredTVs,
    })

  }

  _isFilterActive(filterValue) {

    const isArray = Array.isArray(filterValue);

    const isFilterActive = ( filterValue && !isArray ) || ( isArray && filterValue.length > 0 );

    console.log('_isFilterActive:::', filterValue, isFilterActive );

    return isFilterActive;
  }

  render() {

    const displayedTVs = !this._isGridFiltered() ? this.state.televisions : this.state.filteredTelevisions;

    return (
      <>
        <header className="TV grid-header">
          <section>
            <span>Name</span>
            <div className="filter-box">
              <NameFilter onChange={ this.handleFilter } />
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
              <CheckBoxFilter checkboxValues={this.state.filtersValuesSet.displayTypes} />
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
            <div className="filter-box outputs">
              <CheckBoxFilter checkboxValues={this.state.filtersValuesSet.outputs} />
            </div>
          </section>
        </header>


        <main>
          {
            displayedTVs.map( (television) => (

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
