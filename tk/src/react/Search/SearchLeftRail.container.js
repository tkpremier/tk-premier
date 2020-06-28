import { connect } from 'react-redux';
import { filter, map } from 'lodash/fp';
import SearchLeftRail from './SearchLeftRail';

const mapStateToProps = (state, ownProps) => {
  const { makers, lots, auctions, editorials } = state;
  const lists = [makers, lots, auctions, editorials];
  const types = filter(list => list.data.length > 0)(lists);
  const results = map((type) => {
    const withCount = type;
    withCount.count = type.data.length;
    return withCount;
  })(types);
  return { results };
};

export default connect(mapStateToProps)(SearchLeftRail);