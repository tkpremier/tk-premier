import { createSelector } from 'reselect';
import { includes, sortBy, find, flatMap } from 'lodash/fp';
import has from 'lodash/has';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import Container from '../CuratedView/CuratedAuctionContainers';
import { parseFilterQuery } from '../utils/filterQueryUtils';
import { checkPriceRange } from '../utils/priceFilterUtils';
import { makeBaseData } from '../PhillipsFilter/selectors';
import setStatus from '../PhillipsFilter/setStatus';

const notInt = new RegExp(/\D/g);
const filterBySelectors = {
  'priceRangeSelector': checkPriceRange
};

const filterDimensionSelector = ({ filterData }) => filterData.filterDimensions;

const urlQueriesSelector = ({ urlQueries }) => urlQueries;

export const sortSelector = ({ sortQuery }) => sortQuery;

export const lotsSelector = ({ auction }) => auction.lots;

const listViewTypeSelector = ({ listViewType }) => listViewType;
export const lotsDropdownData = createSelector(
  lotsSelector,
  lots => lots.map(lot => ({
    lotNumberFull: lot.lotNumberFull,
    detailLink: lot.detailLink
  }))
);
export const hasNoReserveSelector = createSelector(
  lotsSelector,
  lots => isUndefined(find(lot => lot.isNoReserve === true)(lots))
);

export const saleOffers = createSelector(
  lotsSelector,
  lots => lots.filter(lot => lot.showSaleOffers && !lot.isNoLot).length
);


export const setPricefromArray = (array, type, bound) => {
  if (type === 'low') {
    if (bound === 'under') {
      return 0;
    }
    if (bound === 'over') {
      return parseInt(array[1].replace(notInt, ''), 10);
    }
  }
  if (type === 'high') {
    if (bound === 'under') {
      return parseInt(array[1].replace(notInt, ''), 10);
    }
    if (bound === 'over') {
      return Infinity;
    }
  }
  return false;
};

const setCuratedLots = (lots) => {
  const gridItems = [];
  let container = null;
  lots.forEach((lot) => {
    if (lot.auctionLotDisplayTypeName.indexOf('container') > -1) {
      if (isNull(container) || container.isFilled()) {
        container = new Container({
          auctionLotDisplayTypeName: lot.auctionLotDisplayTypeName
        });
      }
      container.addLot(lot);
      if (container.isFilled()) {
        gridItems.push(container);
      }
    } else {
      gridItems.push(lot);
    }
  });
  return gridItems;
};

export const getFilteredLots = createSelector(
  urlQueriesSelector,
  lotsSelector,
  filterDimensionSelector,
  (urlQueries, lots, filterDimensions) => {
    const filterObject = parseFilterQuery(urlQueries.filter);
    try {
      return lots.filter(lot => Object.keys(filterObject).reduce((passes, key, i) => {
        let bool = passes;
        if ((i > 0 && bool) || (i === 0)) {
          switch (key) {
            case 'price': {
              const priceFilters = filterObject[key];
              const price = lot.hammerPlusBP > 0
                ? parseInt(lot.hammerPlusBP, 10)
                : parseInt(lot.lowEstimate, 10);
              const dimension = find(({ dimension }) => dimension === key)(filterDimensions);
              bool = priceFilters.reduce((prevPasses, priceString) => {
                const filterItem = find(({ label }) => label === priceString)(dimension.items);
                const { filterBy: originalFilterBy, valueType, bounds } = filterItem;
                const useSelector = originalFilterBy.toUpperCase().indexOf('SELECTOR') > -1;
                const filterBy = useSelector
                  ? filterBySelectors[originalFilterBy]
                  : originalFilterBy;
                return prevPasses || useSelector ? filterBy(priceString, price, lot.currencySign, bounds) : valueType === 'boolean' ? lot[filterBy] : lot[filterBy] === priceString;
              }, false);
              break;
            }
            case 'showSaleOffers': {
              bool = (lot.showSaleOffers && !lot.isNoLot);
              break;
            }
            case 'isNoReserve': {
              bool = lot.isNoReserve;
              break;
            }
            case 'makers': {
              bool = includes(lot.makerName)(filterObject.makers);
              break;
            }
            default: {
              bool = includes(lot[key])(filterObject[key]);
            }
          }
        }
        return bool;
      }, true));
    } catch (e) {
      console.log('catch err: ', e);
      return lots;
    }
  }
);

export const getFilteredLotsCount = createSelector(
  getFilteredLots,
  filteredLots => filteredLots.length
);

export const auctionGridLotsSelector = createSelector(
  listViewTypeSelector,
  urlQueriesSelector,
  lotsSelector,
  getFilteredLots,
  (listViewType, { filter, sort }, lots, filteredLots) => {
    if (listViewType === 'catalogue' && filter.length === 0 && sort.length === 0) {
      return setCuratedLots(lots);
    }
    let gridItems = filteredLots;
    switch (sort) {
      case 'makerName': {
        gridItems = sortBy(lot => lot.makerName)(gridItems);
        break;
      }
      case 'estimate-ascending': {
        gridItems = gridItems.sort((lotA, lotB) => lotA.lowEstimate - lotB.lowEstimate);
        break;
      }
      case 'estimate-descending': {
        gridItems = gridItems.sort((lotA, lotB) => lotB.lowEstimate - lotA.lowEstimate);
        break;
      }
      case 'lotNumber': {
        gridItems = sortBy(lot => lot.lotNumber)(gridItems);
        break;
      }
      default: { /* do nothing */ }
    }
    return gridItems;
  }
);

// AM Row Id Selectors
const fetchedLotRowIds = state => state.fetchedLotRowIds;

export const auctionGridLotRowIds = createSelector(
  [auctionGridLotsSelector],
  (filteredLots) => {
    const lotsForRowIds = flatMap((item) => {
      return has(item, 'lots')
        ? item.lots
        : [item];
    })(filteredLots);
    return lotsForRowIds.map((lot) => {
      return has(lot, 'auctionMobilityLotRowId')
        ? lot.auctionMobilityLotRowId : '';
    });
  }
);


export const fetchedLotRowIdsSelector = createSelector(
  [fetchedLotRowIds, auctionGridLotRowIds],
  (fetchedIds, filteredRowIds) => {
    if (fetchedIds.length > 0) {
      return fetchedIds.reduce((arr, rowId) => {
        const index = filteredRowIds.indexOf(rowId);
        const isIncluded = arr.indexOf(rowId) > -1;
        return isIncluded
          ? arr
          : arr.concat(filteredRowIds.slice(index, index + 20));
      }, []);
    }
    return fetchedIds;
  }
);

const filterItemBase = makeBaseData();

export const getAuctionFilterItemData = () => createSelector(
  [auctionGridLotsSelector, filterItemBase, urlQueriesSelector],
  (gridItems, item, urlQueries) => {
    const { active } = item;
    const filterObject = parseFilterQuery(urlQueries.filter);
    const status = active ? 'active' : setStatus(gridItems, item, filterObject);
    return {
      ...item,
      status
    };
  }
);
