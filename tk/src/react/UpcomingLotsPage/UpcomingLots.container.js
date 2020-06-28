import { connect } from 'react-redux';
import UpcomingLots from './UpcomingLots';
import { sortBy, toggleFilterByTag } from './actions';
import { gridSelector } from './selectors';

const mapStateToProps = (state) => {
  const { urlQueries } = state;
  const { sort, filter } = urlQueries;
  return {
    ...state,
    filter,
    gridLots: state.lots,
    sort
  };
};

const mapDispatchToProps = {
  sortBy,
  toggleFilterByTag
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingLots);
