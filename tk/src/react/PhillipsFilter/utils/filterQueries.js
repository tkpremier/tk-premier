import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';

const parseFilterQuery = (filterQuery = '') => {
  const filterQueries = {};
  const queries = decodeURIComponent(filterQuery).split('~');
  queries.forEach((query) => {
    const keyValuePair = query.split('=');
    if (keyValuePair.length === 2) {
      if (keyValuePair[1] === 'true') {
        filterQueries[keyValuePair[0]] = true;
      } else if (keyValuePair[1] === 'false') {
        filterQueries[keyValuePair[0]] = false;
      } else {
        filterQueries[keyValuePair[0]] = keyValuePair[1].split('!');
      }
    }
  });
  return filterQueries;
};

/**
 *
 * @param {object} filterQueryObject { [dimension] : new potential filter values}
 * @return {string} New filter query string to be used on url
 */
const encodeFilterQuery = (filterQueryObject = {}) => Object.keys(filterQueryObject).reduce(
  (result, filterParameter) => {
    // check to see if adding next dim or starting
    let newResult = result.length > 0 ? `${result}~` : result;
    const filterValues = filterQueryObject[filterParameter];
    if (Array.isArray(filterValues) && filterValues.length > 0) {
      newResult = `${newResult}${filterParameter}=${filterValues.join('!')}`;
    } else if (typeof filterValues === 'boolean') {
      newResult = filterValues ? `${newResult}${filterParameter}=${filterValues}` : newResult;
    } else if (!isUndefined(filterValues)) {
      newResult = `${newResult}${filterParameter}=${filterValues}`;
    }
    return newResult;
  }, ''
);

/**
 * A filterItem
 * @typedef {Object} FilterItem
 * @property {string} dimension - The dimension of item
 * @property {string} label - The label of filter item
 * Old params
 * @param {boolean} active check if value exists in filter string
 * @param {string[]} currentFilterValues array of values already in current filter parameter
 * @param {object} filterObject object with dimensions as key and and string array of values in dimension
 * @param {FilterItem} filterItem - The {@link FilterItem} to be evaluated
 * @return {string} filter payload to be used in Link action
 */

const generateFilterPayload = (active = false, filterObject = {}, filterItem = { dimension: '', payload: { label: '' } }) => {
  let filterPayload = '';
  const { dimension, payload } = filterItem;
  const { label } = payload;
  const filterValues = filterObject[dimension] || [];
  const nextFilterValues = active
    ? filterValues.filter(v => v !== label)
    : [...filterValues, label];
  // console.log('currentFilterValues: ', currentFilterValues);
  if (active) {
    // const i = filterValues.indexOf(label);
    // if (filterValues.length > 0) {

    // }
    // remove filter selection
    filterPayload = nextFilterValues.length > 0
      ? encodeFilterQuery({ ...filterObject, [`${dimension}`]: nextFilterValues })
      : encodeFilterQuery(omit(filterObject, dimension));
  } else {
    // add filter selection
    filterPayload = encodeFilterQuery({ ...filterObject, [`${dimension}`]: nextFilterValues });
  }
  return filterPayload;
};

export {
  generateFilterPayload,
  parseFilterQuery
};
