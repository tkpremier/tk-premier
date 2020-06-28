/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { compareAsc, compareDesc } from 'date-fns';
import includes from 'lodash/fp/includes';
import { makeBaseData } from '../../../PhillipsFilter/selectors';
import setStatus from '../../../PhillipsFilter/setStatus';
import { parseFilterQuery } from '../../../utils/filterQueryUtils';
import getContentTypeDesc from '../getContentTypeDesc';

const getAllData = ({ data }) => data;
const getUrlQueries = ({ urlQueries }) => urlQueries;
const getUrlSortQuery = createSelector([getUrlQueries], ({ sort }) => sort);
const getFilterObject = createSelector(
  [getUrlQueries],
  urlQueries => parseFilterQuery(urlQueries.filter)
);
const filterData = createSelector([
  getAllData,
  getFilterObject
], (data, filterObject) => {
  const activeFilters = Object.keys(filterObject);
  try {
    const validateActiveFilters = item => activeFilters.reduce((passes, key) => {
      if (passes) {
        switch (key) {
          case 'contentType':
            return includes(getContentTypeDesc(item[key]))(filterObject[key]);
          case 'departmentName':
          default:
            return includes(item[key])(filterObject[key]);
        }
      }
      return passes;
    }, true);
    return activeFilters.length > 0
      ? data.filter(item => validateActiveFilters(item))
      : data;
  } catch (e) {
    console.log('getListData error: ', e);
    return data;
  }
});

const sortData = createSelector([
  filterData,
  getUrlSortQuery
], (filteredData, sort) => {
  switch (sort.trim()) {
    case 'date-asc':
      filteredData.sort(({ date: dateA }, { date: dateB }) => compareAsc(new Date(dateA), new Date(dateB)));
      break;
    case 'date-desc':
    default:
      filteredData.sort(({ date: dateA }, { date: dateB }) => compareDesc(new Date(dateA), new Date(dateB)));
      break;
  }
  return [...filteredData];
});
// Filtered and Sorted List Selectors

export const getListData = createSelector(
  [sortData],
  data => ({ data })
);

// Filter Item Selectors
const filterItemBase = makeBaseData();


export const getFilterItemData = () => createSelector(
  [getListData, filterItemBase, getUrlQueries],
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
