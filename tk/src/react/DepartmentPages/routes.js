const routesMap = {
  DEFAULT: '/:saleType/:saleNumber',
  FILTER: '/:saleType/:saleNumber/filter/:filterQuery',
  SORT: '/:saleType/:saleNumber/sort/:sortQuery',
  FILTERSORT: '/:saleType/:saleNumber/filter/:filterQuery/sort/:sortQuery'
};

export default routesMap;
