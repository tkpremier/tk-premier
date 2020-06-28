const getUrlQueries = (location) => {
  const urlSplits = location.split('/');
  const filter = urlSplits.indexOf('filter') > -1
    ? urlSplits[urlSplits.indexOf('filter') + 1]
    : '';
  const sort = urlSplits.indexOf('sort') > -1
    ? urlSplits[urlSplits.indexOf('sort') + 1]
    : '';
  return {
    filter,
    sort
  };
};

export default getUrlQueries;
