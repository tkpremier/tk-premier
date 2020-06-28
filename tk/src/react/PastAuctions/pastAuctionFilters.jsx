// This component will handle currnet active filters and handle clearing all filters
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import Expandable from '../Expandable/Expandable';
import PastAuctionFilterItems from './PastAuctionFilterItem';

const PastAuctionsFilter = (props) => {
  const { filterData, urlQueries } = props;
  return (
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
                  <PastAuctionFilterItems filterName={filter.filterValue} filterCat={item.categoryName} key={filter.filterValue} />
                ))}
              </ul>
            </Expandable>
          </ul>
        ))}
  );
};


PastAuctionsFilter.defaultProps = {
  urlQueries: {
    filter: '',
    sort: ''
  }
};
PastAuctionsFilter.propTypes = {
  urlQueries: PropTypes.shape({
    filter: PropTypes.string,
    sort: PropTypes.string
  })
};
export default PastAuctionsFilter;
