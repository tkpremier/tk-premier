// This component will handle filter selection and manage the selected filter state.
// each component will have a value based on the given keyValue

import React, { Component } from 'react';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  isArray, isUndefined, reject, omit
} from 'lodash/fp';
import { filterSort } from './actions';
import { parseFilterQuery } from '../../utils/filterQueryUtils';

class FilterItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // returns string
    const encodeFilterQuery = (filterQueries = {}) => Object.keys(filterQueries).reduce(
      (result, filterParameter) => {
        let newResult = result.length > 0 ? `${result}%26` : result;
        const filterValues = filterQueries[filterParameter];
        if (isArray(filterValues) && filterValues.length > 0) {
          newResult = `${newResult}${filterParameter}=${filterValues.join('!')}`;
        } else if (typeof filterValues === 'boolean') {
          newResult = filterValues ? `${newResult}${filterParameter}=${filterValues}` : newResult;
        } else if (!isUndefined(filterValues)) {
          newResult = `${newResult}${filterParameter}=${filterValues}`;
        }
        return newResult;
      }, ''
    );
    const generateFilterPayload = (selected = false, currentFilterValues = [], filterQuery = {}, parameter = '', value = '') => {
      let filterPayload = '';
      let nextFilterValues = [];
      if (selected) {
        // remove filter selection
        nextFilterValues = reject(filterValue => filterValue === value)(currentFilterValues);
        filterPayload = nextFilterValues.length > 0
          ? encodeFilterQuery({ ...filterQuery, [`${parameter}`]: nextFilterValues })
          : encodeFilterQuery(omit(parameter)(filterQuery));
      } else {
        // add filter selection
        nextFilterValues = [...currentFilterValues, value];
        filterPayload = encodeFilterQuery({ ...filterQuery, [`${parameter}`]: nextFilterValues });
      }
      return filterPayload;
    };

    const enabled = true;
    const { filterCat, filterName } = this.props;
    const { urlQueries, location, sortBy } = this.props.state;

    const selected = this.props.state.urlQueries.filter.includes(filterName);
    const filterObject = { [filterCat]: filterName };
    const parsedQuery = parseFilterQuery(urlQueries.filter);
    const filterPayload = generateFilterPayload(selected, parsedQuery[filterCat], parsedQuery, filterCat, filterName);

    return (
      <li
        className={classNames({ 'selected': selected })}
      >
        <Link
          to={filterSort(filterPayload, urlQueries.sort)}
          shouldDispatch={Boolean(enabled)}
        >
          {filterName}
          {selected ? (<span className="close">x</span>) : null}
        </Link>
      </li>
    );
  }
}

const mapStateToProps = state => ({ state });
export default connect(mapStateToProps, null)(FilterItems);
