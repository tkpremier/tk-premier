import some from 'lodash/fp/some';
import checkEnabled from '../PhillipsFilter/utils/checkEnabled';
import { getMakersList, getPriceRanges } from '../PhillipsFilter/utils/getItems';
import createInitialUserState from '../PhillipsUser/createInitialUserState';
import getUrlQueries from '../../utils/getUrlQueries';

const getFilterDimensions = (lots = [], filterParameter) => {
  const dimensions = [];
  const hasPrice = some(lot => parseInt(lot.lowEstimate, 10) > 0)(lots);
  const hasNoReserve = some(lot => lot.isNoReserve)(lots);
  const hasPostSale = some(lot => lot.showSaleOffers)(lots);
  if (hasPostSale) {
    const count = lots.filter(lot => lot.showSaleOffers && !lot.isNoLot).length;
    dimensions.push({
      count,
      dimension: 'showSaleOffers',
      enabled: checkEnabled('showSaleOffers'),
      items: [
        {
          label: `Show Offerings \u2022 ${count} Lots`,
          status: 'inactive',
          filterBy: 'showSaleOffers',
          valueType: 'boolean'
        }
      ]
    });
  }
  dimensions.push({
    dimension: 'makers',
    enabled: checkEnabled('makers'),
    items: getMakersList(lots, filterParameter),
    filterBy: ['makerName']
  });
  if (hasPrice) {
    dimensions.push({
      dimension: 'price',
      enabled: checkEnabled('price'),
      items: getPriceRanges(lots, hasNoReserve),
      filterBy: ['priceRangeSelector', 'isNoReserve']
    });
  }
  if (hasNoReserve) {
    dimensions.push({
      dimension: 'isNoReserve',
      enabled: checkEnabled('isNoReserve') || checkEnabled('price'),
      items: [
        {
          label: 'No Reserve',
          status: 'inactive',
          filterBy: 'isNoReserve',
          valueType: 'boolean'
        }
      ]
    });
  }
  return dimensions;
};
const setInitialState = (
  {
    auction,
    isExhibitionLanding,
    location,
    previewCuratedAuction,
    recommendedLots,
    userJSON
  }) => {
  const language = location.split('/').slice(-1)[0] === 'ch' ? 'ch' : 'en';
  const userState = createInitialUserState({
    ...JSON.parse(userJSON),
    recommendedLots: JSON.parse(recommendedLots)
  });
  const listViewType = (previewCuratedAuction || auction.enableCuratedAuction) ? 'catalogue' : 'grid';
  const urlQueries = getUrlQueries(location);
  const filterData = {
    filterDimensions: getFilterDimensions(auction.lots, urlQueries.filter),
    filterDataSelector: 'auctionGrid',
    relevantProps: [
      'currencySign',
      'hammerPlusBP',
      'isNoReserve',
      'lotNumberFull',
      'lowEstimate',
      'makerName'
    ]
  };
  const deviceInfo = {
    deviceTypes: [
      "mobile",
      "tablet",
      "desktop"
    ],
    isDesktop: true,
    isMobile: false,
    isTablet: true
  };
  return {
    ...userState,
    auction,
    deviceInfo,
    filterData,
    fetchLotRowIds: [],
    fetchedLotRowIds: [],
    isExhibitionLanding,
    listViewType,
    language,
    modal: {
      show: false,
      type: ''
    },
    urlQueries
  };
};

export default setInitialState;
