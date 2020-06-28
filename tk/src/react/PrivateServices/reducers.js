
const sale = (state = {}) => state;
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
    default:
      return state;
  }
};
const urlQueries = (state = { filter: '', sort: '' }, { type, payload }) => {
  switch (type) {
    case 'ROUTES_DEFAULT':
      return { filter: '', sort: '' };
    case 'ROUTES_FILTERSORT':
    case 'ROUTES_FILTER':
    case 'ROUTES_SORT':
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

export {
  filterData,
  sale,
  urlQueries
};
