import { connect } from 'react-redux';
import { getAuctionFilterItemData } from './selectors';
import SaleOffersFilter from './SaleOffersFilter';

const getFilterItemData = getAuctionFilterItemData();

const mapStateToProps = (state, ownProps) => ({
  ...getFilterItemData(state, ownProps)
});

export default connect(mapStateToProps)(SaleOffersFilter);
