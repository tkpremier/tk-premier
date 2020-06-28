import getUrlQueries from '../utils/getUrlQueries';
import { createFilters } from './functions/functionIndex';

const setInitialState = (data, location) => {
  const urlQueries = getUrlQueries(location);
  const filterData = createFilters(data);
  // const filterDims = getFilterDimensions(data);
  return (
    {
      data, urlQueries, filterData
    }
  );
};

export default setInitialState;
