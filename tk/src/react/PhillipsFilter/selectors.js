import { createSelector } from 'reselect';
import { generateFilterPayload } from './utils/filterQueries';
import setStatus from './setStatus';
import { parseFilterQuery } from '../utils/filterQueryUtils';
import { checkPriceRange } from '../utils/priceFilterUtils';

export const filterBySelectors = {
  'priceRangeSelector': checkPriceRange
};

const filterDataPoolSelector = (state) => {
  return state.filterData.stateToFilter
    .reduce((obj, key) => {
      return obj && obj[key] !== 'undefined' ? obj[key] : undefined;
    }, state)
    .map(item => state.filterData.relevantProps.reduce((smallItem, prop) => {
      smallItem[prop] = item[prop];
      return smallItem;
    }, {}));
};
const filterSelector = ({ urlQueries }) => urlQueries.filter;
const sortSelector = ({ urlQueries }) => urlQueries.sort;
const filterItemSelector = (state, item) => (item);

const makeFilterItemDatas = () => createSelector(
  [
    filterDataPoolSelector,
    filterSelector,
    filterItemSelector,
    sortSelector
  ],
  (filteredGridItems, filterQueryString, item, sort) => {
    const { dimension, payload } = item;
    const { filterBy: filterByString, label } = payload;
    const filterBy = filterByString.toUpperCase().indexOf('SELECTOR') > -1
      ? filterBySelectors[filterByString]
      : filterByString;
    const filterObject = parseFilterQuery(filterQueryString);
    // ex: filterObject.makers
    const itemIndex = filterObject[dimension]
      ? filterObject[dimension].indexOf(label)
      : -1;
    // // is dimension active?
    const active = filterObject[dimension] ? itemIndex > -1 : false;
    const filterPayload = generateFilterPayload(active, filterObject, item);
    const sortAction = sort.length > 0 ? 'SORT' : '';
    const status = active ? 'active' : setStatus(filteredGridItems, { ...payload, dimension, filterBy }, filterObject);
    let type = sort.length > 0 ? 'ROUTES_SORT' : 'ROUTES_DEFAULT';
    if (active) {
      if (filterPayload.length > 0) {
        type = `ROUTES_FILTER${sortAction}`;
      }
    } else {
      type = `ROUTES_FILTER${sortAction}`;
    }
    return {
      filter: filterPayload,
      label,
      sort,
      status,
      type
    };
  }
);

const makeBaseData = () => createSelector(
  [
    filterSelector,
    filterItemSelector,
    sortSelector
  ],
  (filterQueryString, item, sort) => {
    const { dimension, payload } = item;
    const { filterBy: filterByString, label, valueType } = payload;
    const filterBy = filterByString.toUpperCase().indexOf('SELECTOR') > -1
      ? filterBySelectors[filterByString]
      : filterByString;
    const filterObject = parseFilterQuery(filterQueryString);
    const itemIndex = filterObject[dimension]
      ? filterObject[dimension].indexOf(label)
      : -1;
    // // is dimension active?
    const active = filterObject[dimension] ? itemIndex > -1 : false;
    const filterPayload = generateFilterPayload(active, filterObject, item);
    const sortAction = sort.length > 0 ? 'SORT' : '';

    let type = sort.length > 0 ? 'ROUTES_SORT' : 'ROUTES_DEFAULT';
    if (active) {
      if (filterPayload.length > 0) {
        type = `ROUTES_FILTER${sortAction}`;
      }
    } else {
      type = `ROUTES_FILTER${sortAction}`;
    }
    return {
      ...item,
      filterBy,
      filter: filterPayload,
      label,
      sort,
      type,
      valueType
    };
  }
);

const appendFilterItemStatus = () => {
  return {
    status: 'active'
  };
};

// const appendFilterItemStatus = () => {
//   return createSelector(
//     [auctionGridLotsSelector],
//     (itemData) => {
//       return {
//         ...itemData,
//         status: 'active'
//       };
//     }
//   );
// };

export {
  appendFilterItemStatus,
  makeBaseData,
  makeFilterItemDatas
};
