
const sale = (state = {}) => state;
const filterData = (state = {}) => state;
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
