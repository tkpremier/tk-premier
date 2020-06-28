import React from 'react';
import PropTypes from 'prop-types';
import SearchLeftRail from './SearchLeftRail';
import SearchGridList from './SearchGridList';

const App = props =>
  (<div className="container content-area" id="search-page">
    <h2>Search results for &ldquo;<strong>{props.query}</strong>&rdquo;</h2>
    <SearchLeftRail
      results={props.results}
      type={props.searchType}
      query={props.query}
    />
    <SearchGridList
      results={props.results}
      type={props.searchType}
    />
  </div>);

App.defaultProps = {
  results: [],
  query: '',
  searchType: ''
}

App.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  query: PropTypes.string,
  searchType: PropTypes.string
}

export default App;
