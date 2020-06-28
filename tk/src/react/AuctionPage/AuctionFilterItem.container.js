import { connect } from 'react-redux';
import FilterItem from '../PhillipsFilter/FilterItem';
import { getAuctionFilterItemData } from './selectors';

const getFilterItemData = getAuctionFilterItemData();

const mapStateToProps = (state, ownProps) => ({
  ...getFilterItemData(state, ownProps)
});

export default connect(mapStateToProps)(FilterItem);
