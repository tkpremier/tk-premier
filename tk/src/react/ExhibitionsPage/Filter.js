// This component will handle currnet active filters and handle clearing all filters
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import Expandable from '../Expandable/Expandable';
import FilterItem from './FilterItem';

/*
  {
    type: 'ROUTES_DEFAULT,
    payload : {}
  }
  {
    type: 'ROUTES_FILTER',
    payload : {
      filter: 'makerName=Warhol,
    }
  },
  {
    type: 'ROUTES_SORT',
    payload : {
      sort: 'makerName=Warhol,
    }
  }
*/

const Filter = (props) => {
  const { filterData, urlQueries } = props;
  return (
    <ul
      id="filter-backbone"
      className="filter short-list col-xs-6 col-md-12"
    >
      <li className="header closed" key="filter-list">
        <a href="#" className="toggle">
          Filter
        </a>
        {urlQueries.filter && urlQueries.filter.length > 0 ? (
          <Link className="clearall" style={{ display: 'block' }} to="#">
            (clear all)
          </Link>
        ) : null}
        {filterData.map(item => (
          <ul className="filter-list " key={item.categoryName}>
            <Expandable
              expanded={urlQueries.filter.includes(item.categoryName)}
              className="filter"
              key={`${item.categoryName}-li`}
              header={item.categoryName}
            >
              <ul>
                {item.categoryValues.map(filter => (
                  <FilterItem filterName={filter.filterValue} filterCat={item.categoryName} key={filter.filterValue} />
                ))}
              </ul>
            </Expandable>
          </ul>
        ))}
      </li>
    </ul>
  );
};
Filter.defaultProps = {
  urlQueries: {
    filter: '',
    sort: ''
  }
};
Filter.propTypes = {
  urlQueries: PropTypes.shape({
    filter: PropTypes.string,
    sort: PropTypes.string
  })
};
export default Filter;
