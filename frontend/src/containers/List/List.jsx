import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './List.css';


import TV from '../../components/TV/TV';
import NameFilter from '../../components/Filter/NameFilter/NameFilter';
import NumberFilter from '../../components/Filter/NumberFilter/NumberFilter';
import CheckBoxFilter from '../../components/Filter/CheckBoxFilter/CheckBoxFilter';

export default class List extends Component {

  state = {
    televisions: this.props.Televisions,
    filteredTelevisions: [],
    filtersValuesSet: {
      displaySizes: [], // unused value set yet
      displayTypes: [],
      resolutionsKs: [], // unused value set yet
      outputs: [],
    },
    activeFilters: [
      {
        filterLabel: 'name',
        filterType: 'string',
        filterValue: '',
        filterMode: undefined,
      },
      {
        filterLabel: 'displaySizeInInches',
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
    const isGridFiltered = this.state.activeFilters.some(
      ({ filterValue }) => this._isFilterActive(filterValue)
    );

    return isGridFiltered;

  }

  handleFilter = ({
    filterLabel,
    filterValue,
    filterMode,
  }) => {

    const filters = [...this.state.activeFilters];
    const filterIndex = this.state.activeFilters.findIndex( ({ filterLabel: label }) => label === filterLabel );

    filters[filterIndex].filterValue  = filterValue;
    filters[filterIndex].filterMode   = filterMode;

    this.setState({
      ...this.state,
      filters,
    });

    this._filterTelevisions();

  }

  _filterTelevisions() {

    const activeFilters = this.state.activeFilters.filter( ({ filterValue }) => this._isFilterActive(filterValue) );

    let filteredTVs = [...this.state.televisions];

    console.log({activeFilters});

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
            isCurrentTvMatches =
              mode === 'contains' ?
                tv[label].toLowerCase().includes(value.toLowerCase()) :
                tv[label] === value;
            break;
          case 'number':
            switch(mode) {
              case 'lessThan':
                isCurrentTvMatches = parseInt(tv[label], 10) < parseInt(value, 10);
                break;
              case 'equals':
                isCurrentTvMatches = parseInt(tv[label], 10) === parseInt(value, 10);
                break;
              case 'greaterThan':
                isCurrentTvMatches = parseInt(tv[label], 10) > parseInt(value, 10);
                break;
              default:
                throw new Error(`Unkown filter mode: ${mode}`);
            }
            break;
          case 'checkbox':
            isCurrentTvMatches = value.every(checkboxVal => tv[label].includes(checkboxVal));
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

    return isFilterActive;
  }

  render() {

    const displayedTVs = this._isGridFiltered() ? this.state.filteredTelevisions : this.state.televisions;

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
              <NumberFilter
                onChange={ this.handleFilter }
                label={"displaySizeInInches"}
              />
            </div>
          </section>

          <section>
            <span>DisplayType</span>
            <div className="filter-box">
              <CheckBoxFilter
                onChange={ this.handleFilter }
                label={"displayType"}
                checkboxValues={ this.state.filtersValuesSet.displayTypes }
              />
            </div>
          </section>

          <section>
            <span>ResolutionK</span>
            <div className="filter-box">
              <NumberFilter
                onChange={ this.handleFilter }
                label={"resolutionK"}
              />
            </div>
          </section>

          <section>
            <span>Outputs</span>
            <div className="filter-box outputs">
              <CheckBoxFilter
                onChange={ this.handleFilter }
                label={"outputs"}
                checkboxValues={ this.state.filtersValuesSet.outputs }
              />
            </div>
          </section>
        </header>


        <main>
          {
            displayedTVs.map( (television) => (

              <Link to={`/televisions/${television.itemNo}`} key={television.itemNo}>
                <TV
                  tvDetails={television}
                />
              </Link>

              )
            )
          }
        </main>
      </>
    )

  }

}
