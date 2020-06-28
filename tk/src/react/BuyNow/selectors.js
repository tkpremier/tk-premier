import { createSelector } from 'reselect';
import filterLots from '../PhillipsFilter/utils/getFilteredLots';
import setStatus from '../PhillipsFilter/setStatus';
import { parseFilterQuery } from '../utils/filterQueryUtils';
import { makeBaseData } from '../PhillipsFilter/selectors';

const lotsSelector = state => state.sale.lots;
const urlQueriesSelector = state => state.urlQueries;
const filterDimensionsSelector = ({ filterData }) => filterData.filterDimensions;
const getGridLots = (urlQueries, filterDimensions, lots) => {
  const filterObject = parseFilterQuery(urlQueries.filter);
  const filteredLots = filterLots(filterObject, filterDimensions, lots);
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

export const buyNowGridSelector = createSelector(
  [urlQueriesSelector, filterDimensionsSelector, lotsSelector],
  getGridLots
);

const filterItemBase = makeBaseData();

export const getBuyNowFilterItemData = () => createSelector(
  [buyNowGridSelector, filterItemBase, urlQueriesSelector],
  (gridItems, item, urlQueries) => {
    const { active, dimension, payload } = item;
    const filterObject = parseFilterQuery(urlQueries.filter);
    const status = active ? 'active' : setStatus(gridItems, item, filterObject);
    return {
      ...item,
      status
    };
  }
);
