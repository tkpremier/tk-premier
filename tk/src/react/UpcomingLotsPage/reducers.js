import { find, isUndefined } from 'lodash/fp';

const initialUrlQuery = {
  filter: '',
  saleNumber: '',
  saleNumbers: [],
  sort: ''
};
const initialAuctionState = {
  pageTitle: '',
  pageDescription: '',
  auctions: []
};

const auctions = (state = []) => state;

const filterData = (state = { 'stateToFilter': [], 'filterDimensions': [] }, { type, payload }) => {
  switch (type) {
    case 'ROUTES_DEFAULT':
    case 'ROUTES_SORT':
      const { filterDimensions } = state;
      return {
        ...state,
        filterDimensions: filterDimensions.map(filterDim => filterDim.enabled
          ? { ...filterDim, enabled: false }
          : filterDim)
      };
    case 'ROUTES_FILTERSORT':
    case 'ROUTES_FILTER':
      return state;
    default:
      return state;
  }
};

const hasFeaturedSale = (state = false) => state;

const lots = (state = []) => state;

const tags = (state = []) => state;

const upcomingLotsDesc = (state = null) => state;

const upcomingLotsTitle = (state = null) => state;

const urlQueries = (state = initialUrlQuery, { payload = initialUrlQuery, type }) => {
  switch (type) {
    case 'ROUTES_DEFAULT':
      return initialUrlQuery;
    case 'ROUTES_SORT': return { ...state, ...payload };
    case 'ROUTES_FILTERSORT': return { ...state, ...payload };
    case 'ROUTES_SALENUMBERFILTER':
    case 'ROUTES_SALENUMBERSORT':
    case 'ROUTES_SALENUMBERFILTERSORT':
    case 'ROUTES_SALENUMBER':
    case 'ROUTES_FILTER': return { ...state, ...payload };
    default: return state;
  }
};

export {
  auctions,
  filterData,
  hasFeaturedSale,
  lots,
  tags,
  upcomingLotsDesc,
  upcomingLotsTitle,
  urlQueries
};
