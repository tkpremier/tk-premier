export const getUrlBasePath = (location = 'http://localhost/', origin = 'http://localhost') => {
  const [blank, pathName] = location.split(origin);
  const [blankSplit, baseName, ...queries] = pathName.split('/');
  return baseName;
};

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
