import { connect } from 'react-redux';
import { filter, isUndefined } from 'lodash/fp';
import App from './SearchPage';

// reselect
/*
  if there's a list defined
  that means results are there

 */

const mapStateToProps = (state) => {
  const hasType = isUndefined(state.location.payload.searchType) ?
    false : state.location.payload.searchType;
  const { makers, lots, auctions, teams,
    query, searchType, editorials } = state;
  const lists = hasType ? [state[`${hasType}s`]] : [makers, lots, auctions, teams, editorials];
  const results = filter(list => list.results.length > 0)(lists);
  return { results, query, searchType };
}

export default connect(mapStateToProps)(App);
