import { connect } from 'react-redux';
import AuctionPageSort from './AuctionPageSort';
import {
  getFilteredLotsCount,
  lotsDropdownData
} from './selectors';
import { filterSort, toggleCuratedView } from './actions';

const mapStateToProps = (state) => {
  const { auction, deviceType, listViewType, urlQueries } = state;
  const { enableCuratedAuction, saleTypeId } = auction;
  const { filter, sort } = urlQueries;
  const showCuratedViewToggle = (filter.length > 0 || sort.length > 0)
    ? false
    : enableCuratedAuction;
  return {
    deviceType,
    dropDownData: lotsDropdownData(state),
    filteredLotsCount: getFilteredLotsCount(state),
    filter,
    listViewType,
    saleTypeId: saleTypeId,
    showCuratedViewToggle,
    sort
  };
}

const mapDispatchToProps = {
  filterSort,
  toggleCuratedView
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPageSort);
