import { connect } from 'react-redux';
import AuctionPage from './AuctionPage';
import { toggleModal, setDeviceType, fetchLotWidgetData, setLanguage } from './actions';
import {
  auctionGridLotsSelector
} from './selectors';
import { setRecommendedLots, fetchRecommendedLots } from '../PhillipsUser/actions';
import { parseFilterQuery } from '../utils/filterQueryUtils';


const mapStateToProps = (state, { amApiUrl }) => ({
  amApiUrl,
  auctionGridLots: auctionGridLotsSelector(state),
  deviceInfo: state.deviceInfo,
  fetchedLotRowIds: state.fetchedLotRowIds,
  fetchLotRowIds: state.fetchLotRowIds,
  filterData: state.filterData,
  filterObject: parseFilterQuery(state.urlQueries.filter),
  isExhibitionLanding: state.isExhibitionLanding,
  language: state.language,
  listViewType: state.listViewType,
  location: state.location,
  modal: state.modal,
  recommendedLots: state.recommendedLots,
  saleRegistrations: state.saleRegistrations,
  sortQuery: state.sortQuery,
  urlQueries: state.urlQueries,
  user: state.user,
  ...state.auction
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearRecommendedLots: () => dispatch(setRecommendedLots([])),
    fetchLotWidgetData: amLotRowId => dispatch(fetchLotWidgetData(amLotRowId)),
    fetchRecommendedLots: (userId, saleNumber) => dispatch(fetchRecommendedLots(userId, saleNumber)),
    setDeviceType: isDesktop => dispatch(setDeviceType(isDesktop)),
    setLanguage: language => dispatch(setLanguage(language)),
    toggleModal: payload => dispatch(toggleModal(payload)),
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionPage);
