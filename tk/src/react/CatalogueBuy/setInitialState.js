import { createFilters } from './functions/functionIndex';
import getUrlQueries from '../utils/getUrlQueries';

const setInitialState = (data, storeForm, location) => {
  const urlQueries = getUrlQueries(location);
  const filterData = {
    filterDims: createFilters(data),
    filterValues: []
  };
  return (
    {
      data, storeForm, urlQueries, filterData
    }
  );
};

// const setInitialState = (
//   {
//     auction,
//     isExhibitionLanding,
//     location,
//     previewCuratedAuction,
//     recommendedLots,
//     userJSON
//   }) => {
//   const userState = createInitialUserState({
//     ...JSON.parse(userJSON),
//     recommendedLots: JSON.parse(recommendedLots)
//   });
//   const showCuratedView = (previewCuratedAuction || auction.enableCuratedAuction);
//   const urlQueries = getUrlQueries(location);
//   const filterData = {
//     filterDimensions: getFilterDimensions(auction.lots, urlQueries.filter),
//     filterDataSelector: 'auctionGrid',
//     relevantProps: [
//       'currencySign',
//       'hammerPlusBP',
//       'isNoReserve',
//       'lotNumberFull',
//       'lowEstimate',
//       'makerName'
//     ]
//   };
//   const deviceInfo = {
//     deviceTypes: [
//       "mobile",
//       "tablet",
//       "desktop"
//     ],
//     isDesktop: true,
//     isMobile: false,
//     isTablet: true
//   };
//   return {
//     ...userState,
//     auction,
//     deviceInfo,
//     filterData,
//     fetchLotRowIds: [],
//     fetchedLotRowIds: [],
//     isExhibitionLanding,
//     showCuratedView,
//     urlQueries
//   };
// };

export default setInitialState;
