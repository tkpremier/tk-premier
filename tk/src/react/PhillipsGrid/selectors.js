import { createSelector } from 'reselect';
import isNull from 'lodash/isNull';
import Container from '../CuratedView/CuratedAuctionContainers';
import filterLots from '../PhillipsFilter/utils/getFilteredLots';
import { parseFilterQuery } from '../utils/filterQueryUtils';


const lotsSelector = state => state.sale.lots;
const editorialsSelector = state => state.sale.flocklerBanners;
const urlQueriesSelector = state => state.urlQueries;
const filterDimensionsSelector = ({ filterData }) => filterData.filterDimensions;
const listViewTypeSelector = ({ listViewType }) => listViewType;

const getCuratedItems = (items) => {
  let container = null;
  return items.reduce((gridItems, item) => {
    if (item.auctionLotDisplayTypeName.indexOf('container') > -1) {
      if (isNull(container) || container.isFilled()) {
        container = new Container({
          auctionLotDisplayTypeName: item.auctionLotDisplayTypeName
        });
      }
      container.addLot(item);
      if (container.isFilled()) {
        gridItems.push(container);
      }
      return gridItems;
    }
    gridItems.push({ ...item, componentType: 'PhillipsLot' });
    return gridItems;
  }, [])
};

const getGridItems = (editorials, filterDimensions, listViewType, lots, urlQueries) => {
  const { sort, filter } = urlQueries;
  const showCurated = listViewType === 'catalogue' && filter.length === 0 && sort.length === 0;
  const filterObject = parseFilterQuery(urlQueries.filter);
  const filteredLots = filterLots(filterObject, filterDimensions, lots).map(lot => ({
    ...lot, componentType: 'PhillipsLot'
  }));
  if (showCurated) {
    return getCuratedItems(lots);
  }
  if (filter.length === 0 && sort.length === 0 && editorials.length > 0) {
    const bannerIndices = [];
    let count = 0;
    const totalItems = filteredLots.length + editorials.length;
    for (let i = 0; i <= totalItems; i++) {
      count++;
      if (count % 6 === 0 && count !== 0) {
        bannerIndices.push(i);
        count = 0;
      }
      if (bannerIndices.length === editorials.length) {
        break;
      }
    }
    editorials.forEach((editorial, i) => {
      const bannerIndex = bannerIndices[i];
      filteredLots.splice(bannerIndex + (i + 1), 0, { ...editorial, componentType: 'Flockler' });
    });
  }

  const [type, dir] = urlQueries.sort.length > 0 ? urlQueries.sort.split('-') : ['', ''];
  return urlQueries.sort.length > 0
    ? filteredLots.sort((a, b) => {
      const desc = dir === 'desc';
      const prop = a.hasOwnProperty(type)
        ? type
        : type === 'maker'
          ? 'makerName'
          : type === 'price'
            ? a['hammerPlusBP'] > 0
              ? 'hammerPlusBP'
              : 'lowEstimate'
            : 'lotNumber';
      const noEstimateA = a.lowEstimate === 0;
      const noEstimateB = b.lowEstimate === 0;
      // no estimate = inquiry only
      if (type === 'price') {
        if (noEstimateA && noEstimateB) {
          return 0;
        }
        if (noEstimateA) {
          return 1;
        }
        if (noEstimateB) {
          return -1;
        }
      }
      if (desc) {
        if (a[prop] < b[prop]) {
          return 1;
        }
        if (a[prop] > b[prop]) {
          return -1;
        }
      } else {
        //asc
        if (a[prop] < b[prop]) {
          return -1;
        }
        if (a[prop] > b[prop]) {
          return 1;
        }
      }
      return 0;
    })
    : filteredLots;
};

const gridItemsSelector = createSelector(
  [
    editorialsSelector,
    filterDimensionsSelector,
    listViewTypeSelector,
    lotsSelector,
    urlQueriesSelector
  ],
  getGridItems
);

export default gridItemsSelector;
