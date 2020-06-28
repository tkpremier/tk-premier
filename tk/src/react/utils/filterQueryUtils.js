import { isArray, isUndefined, reject, omit } from 'lodash/fp';


// returns object
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

const encodeFilterQueryUpcoming = ({ filter = '' }, tag, split = '!') => {
  let filteredArray = filter.length > 0 ? filter.split(split) : [];
  const tagExists = filteredArray.indexOf(tag.tagName) > -1;
  if (tagExists) {
    filteredArray = filteredArray.filter(str => str !== tag.tagName);
  } else {
    filteredArray.push(tag.tagName);
  }
  return filteredArray.join(split);
};

// returns string
const encodeFilterQuery = (filterQueries = {}) => Object.keys(filterQueries).reduce(
  (result, filterParameter) => {
    let newResult = result.length > 0 ? `${result}~` : result;
    const filterValues = filterQueries[filterParameter];
    if (isArray(filterValues) && filterValues.length > 0) {
      newResult = `${newResult}${filterParameter}=${filterValues.join('!')}`;
    } else if (typeof filterValues === 'boolean') {
      newResult = filterValues ? `${newResult}${filterParameter}=${filterValues}` : newResult;
    } else if (!isUndefined(filterValues)) {
      newResult = `${newResult}${filterParameter}=${filterValues}`;
    }
    return newResult;
  }, ''
);

const generateFilterPayload = (selected = false, currentFilterValues = [], filterQuery = {}, parameter = '', value = '') => {
    let filterPayload = '';
    let nextFilterValues = [];
    if (selected) {
      // remove filter selection
      nextFilterValues = reject(filterValue => filterValue === value)(currentFilterValues);
      filterPayload = nextFilterValues.length > 0 ?
        encodeFilterQuery({ ...filterQuery, [`${parameter}`]: nextFilterValues }) :
        encodeFilterQuery(omit(parameter)(filterQuery));
    } else {
      // add filter selection
      nextFilterValues = [...currentFilterValues, value];
      filterPayload = encodeFilterQuery({ ...filterQuery, [`${parameter}`]: nextFilterValues });
    }
    return filterPayload;
  };

export {
  encodeFilterQuery,
  encodeFilterQueryUpcoming,
  generateFilterPayload,
  parseFilterQuery
};
