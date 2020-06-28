import { connect } from 'react-redux';
import LotGrid from './LotGrid';
import gridItemsSelector from './selectors';

const mapStateToProps = state => ({
  gridItems: gridItemsSelector(state),
  listViewType: state.listViewType
});

export default connect(mapStateToProps)(LotGrid);
