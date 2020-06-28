import reject from 'lodash/fp/reject';
import omit from 'lodash/fp/omit';
import isUndefined from 'lodash/isUndefined';

export const filterByYear = (data, filterParam) => data.filter(item => item.startDate.slice(0, 4) === filterParam);

export const filterByDepartment = (data, filterParam) => data.filter(item => item.departmentName === filterParam);

export const filterByLocation = (data, filterParam) => data.filter(item => item.locationName.toLowerCase() === filterParam.toLowerCase());

export const selectedFilterParams = (filter, filterArray) => {
  if (Object.keys(filterArray).includes(filter.filterCategory)) {
    filterArray[filter.filtervalue].push(filter.filterValue);
  } else {
    filterArray.push({});
  }
  return filterArray;
};

export const createFilteredItems = (data, filterQuery = {}) => {
  const catalogueArray = data;
  let newCatalogueArray = [];

  const filterKeys = Object.keys(filterQuery);
  filterKeys.forEach((filter) => {
    if (filter === 'Year') {
      let filteredByYear = [];
      if (newCatalogueArray.length > 0) {
        const filterValues = filterQuery[filter];
        filterValues.forEach((value) => {
          filteredByYear = filteredByYear.concat(filterByYear(newCatalogueArray, value));
        });
      } else {
        const filterValues = filterQuery[filter];
        filterValues.forEach((value) => {
          filteredByYear = filteredByYear.concat(filterByYear(catalogueArray, value));
        });
      }
      newCatalogueArray = filteredByYear;
    }
    if (filter === 'Department') {
      let filteredByDepartment = [];
      if (newCatalogueArray.length > 0) {
        const filterValues = filterQuery[filter];
        filterValues.forEach((value) => {
          filteredByDepartment = filteredByDepartment.concat(filterByDepartment(newCatalogueArray, value));
        });
      } else {
        const filterValues = filterQuery[filter];
        filterValues.forEach((value) => {
          filteredByDepartment = newCatalogueArray.concat(filterByDepartment(catalogueArray, value));
        });
      }
      newCatalogueArray = filteredByDepartment;
    }
    if (filter === 'Location') {
      let filteredByLocation = [];
      if (newCatalogueArray.length > 0) {
        const filterValues = filterQuery[filter];
        filterValues.forEach((value) => {
          filteredByLocation = filteredByLocation.concat(filterByLocation(newCatalogueArray, value));
        });
      } else {
        const filterValues = filterQuery[filter];
        filterValues.forEach((value) => {
          filteredByLocation = filteredByLocation.concat(filterByLocation(catalogueArray, value));
        });
      }
      newCatalogueArray = filteredByLocation;
    }
  });
  return newCatalogueArray;
};
export const encodeFilterQuery = (filterQueries = {}) => Object.keys(filterQueries).reduce(
  (result, filterParameter) => {
    let newResult = result.length > 0 ? `${result}%26` : result;
    const filterValues = filterQueries[filterParameter];
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
export const generateFilterPayload = (selected = false, currentFilterValues = [], filterQuery = {}, parameter = '', value = '') => {
  let filterPayload = '';
  let nextFilterValues = [];
  if (selected) {
    // remove filter selection
    nextFilterValues = reject(filterValue => filterValue === value)(currentFilterValues);
    filterPayload = nextFilterValues.length > 0
      ? encodeFilterQuery({ ...filterQuery, [`${parameter}`]: nextFilterValues })
      : encodeFilterQuery(omit(parameter)(filterQuery));
  } else {
    // add filter selection
    nextFilterValues = [...currentFilterValues, value];
    filterPayload = encodeFilterQuery({ ...filterQuery, [`${parameter}`]: nextFilterValues });
  }
  return filterPayload;
};
export const parseFilterQuery = (filterQuery = '') => {
  const filterQueries = {};
  const queries = decodeURIComponent(filterQuery).split('&');
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
export const createFilters = (data) => {
  const years = Object.values(data.reduce((acc, obj) => {
    if (!acc[obj.startDate.slice(0, 4)]) acc[obj.startDate.slice(0, 4)] = obj.startDate.slice(0, 4);
    return acc;
  }, {})).sort((a, b) => b - a).map(filter => ({ filterValue: filter, isSelected: false }));

  const departments = Object.values(data.reduce((acc, obj) => {
    if (obj.departmentName) {
      if (!acc[obj.departmentName.toLowerCase()]) acc[obj.departmentName.toLowerCase()] = obj.departmentName;
    }
    return acc;
  }, {})).sort().map(filter => ({ filterValue: filter, isSelected: false }));

  const locations = Object.values(data.reduce((acc, obj) => {
    if (obj.locationName) {
      if (!acc[obj.locationName.toLowerCase()]) acc[obj.locationName.toLowerCase()] = obj.locationName;
    }
    return acc;
  }, {})).sort().map(filter => ({ filterValue: filter, isSelected: false }));

  return [
    { categoryName: 'Year', categoryValues: years },
    { categoryName: 'Department', categoryValues: departments },
    { categoryName: 'Location', categoryValues: locations }
  ];
};

const contains = (string, charArray) => {
  let value = 0;
  charArray.forEach((str) => {
    value += string.includes(str);
  });
  return (value > 0);
};

export const auctionDetailSanitizer = (detail) => {
  // accepts string and returns string without strange characters
  let newDetail = detail;
  const badCharsArray = ['<', '&', '>', ';', '/'];
  const replaceArray = ['<br />', '&nbsp;', '</p>', '<p>', '&amp', ';'];
  if (contains(detail, badCharsArray)) {
    replaceArray.forEach((str) => {
      newDetail = newDetail.replace(str, ' ');
    });
    return newDetail;
  }
  return newDetail;
};

export const queryDisabled = (filterPayload, catalogueArray) => {
  const other = parseFilterQuery(filterPayload.payload.filter);
  const value = createFilteredItems(catalogueArray, other);
  return (value.length < 1);
};

export const filterPastAuctions = (data, filterparam) => {
  if (filterparam) {
    const parsedPastAuctions = parseFilterQuery(filterparam);
    return createFilteredItems(data, parsedPastAuctions);
  }
  return data;
};
