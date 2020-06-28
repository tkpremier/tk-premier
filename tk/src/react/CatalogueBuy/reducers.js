export const data = (state = [], { type }) => state;

export const storeForm = (state = '', { type }) => state;

export const urlQueries = (state = { filter: '', sort: '' }, { type, payload }) => {
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

export const filterData = (state = [], { type }) => state;

export const addFilter = (state = [], { type }) => state;
