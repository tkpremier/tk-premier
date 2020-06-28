export const filterSort = (filter, sort, saleNumber, saleType = 'auction') => {
  let action = null;
  if (filter.length > 0 && sort.length > 0) {
    action = {
      type: 'ROUTES_FILTERSORT',
      payload: {
        filter, sort, saleNumber, saleType
      }
    };
  } else if (filter.length > 0 && sort.length <= 0) {
    action = { type: 'ROUTES_FILTER', payload: { filter, saleNumber, saleType } };
  } else if (filter.length <= 0 && sort.length > 0) {
    action = { type: 'ROUTES_SORT', payload: { sort, saleNumber, saleType } };
  } else {
    action = { type: 'ROUTES_DEFAULT', payload: { sort, saleNumber, saleType } };
  }
  return action;
};
