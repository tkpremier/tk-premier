const filterData = (state = { 'filterDataSelector': '', 'filterDimensions': [], 'relevantProps': [] }, { type, payload }) => {
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

export default filterData;
