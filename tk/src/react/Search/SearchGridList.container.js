import { connect } from 'react-redux';
import { filter, map } from 'lodash/fp';
import SearchGridList from './SearchGridList';

const mapStateToProps = (state) => {
  const { makers,
    lots,
    auctions,
    // teams,
    editorials } = state;
  const lists = [makers, lots, auctions, editorials];
  const types = filter(list => list.data.length > 0)(lists);
  const results = map((type) => {
    const withCount = type;
    withCount.count = type.data.length;
    return withCount;
  })(types);
  return { results };
};

export default connect(mapStateToProps)(SearchGridList);
