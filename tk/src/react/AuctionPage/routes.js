const routesMap = {
  'ROUTES_DEFAULT': '/:saleType/:saleNumber',
  'ROUTES_PREVIEW_CURATED': '/:saleType/:saleNumber?previewCuratedAuction=true',
  'ROUTES_FILTER': '/:saleType/:saleNumber/filter/:filter',
  'ROUTES_SORT': '/:saleType/:saleNumber/sort/:sort',
  'ROUTES_FILTERSORT': '/:saleType/:saleNumber/filter/:filter/sort/:sort',
  'ROUTES_LANGUAGE': '/:saleType/:saleNumber/:language'
};

export default routesMap;
