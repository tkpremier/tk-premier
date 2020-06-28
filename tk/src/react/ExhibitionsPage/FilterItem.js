import React, { Component } from 'react';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { filterSort } from './actions';
import { queryDisabled, parseFilterQuery, generateFilterPayload } from './functionIndex';

class FilterItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const enabled = true;
    const { filterCat, filterName } = this.props;
    const {
      urlQueries, data
    } = this.props.state;
    const selected = this.props.state.urlQueries.filter.includes(filterName);
    const parsedQuery = parseFilterQuery(urlQueries.filter);
    const filterPayload = generateFilterPayload(selected, parsedQuery[filterCat], parsedQuery, filterCat, filterName);
    const newFilter = filterSort(filterPayload, urlQueries.sort);
    const disabled = selected ? false : queryDisabled(newFilter, data);

    return (
      <li
        className={classNames({ 'selected': selected, 'disabled': disabled })}
      >
        {disabled ? <a href="#">{ filterName }</a> : (
          <Link
            to={newFilter}
            shouldDispatch={Boolean(enabled)}
          >
            {filterName}
            {selected ? (<span className="close">x</span>) : null}
          </Link>
        )}
      </li>
    );
  }
}

const mapStateToProps = state => ({ state });
export default connect(mapStateToProps, null)(FilterItem);
