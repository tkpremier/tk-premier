import { filter, includes, find, toPairs } from 'lodash/fp';

/**
 * @param {object} filterParameters object that represents current filtered values: { dimension[string] : value[array[string]]}
 * @param {array[object]} filterDimensions filterDimensions from state.filterData that will be used to select current filter value
 * @param {array[object]} lots
 * @returns {array[object]} returns lots array that passed filter validation
 */

const filterLots = (filterParameters, filterDimensions, lots) => filter((lot) => {
  // convert object to 2-dimensional array with i[0] as key and i[1] as value for each item;
  // filterKeyValuePairs = [ ['makers', ['rolex', 'omega'] ], ['department', ['TCA', 'watches'] ] ]
  const filterKeyValuePairs = toPairs(filterParameters);
  return filterKeyValuePairs.reduce((passes, keyValArray) => {
    const key = keyValArray[0];
    const filterValuesArray = keyValArray[1];
    const { filterBy } = find(item => key === item.dimension)(filterDimensions);
    if (typeof filterBy === 'function') {
      return filterValuesArray.reduce((notFiltered, filterValue) => {
        return filterBy(lot, filterValue);
      }, true);
    }
    // return includes (lot.makerName)(['rolex', 'omeaga'])
    return includes(lot[filterBy])(filterValuesArray);
  }, true);
})(lots);

export default filterLots;
