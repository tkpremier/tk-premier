import { encodeFilterQuery } from '../utils/filterQueryUtils';

const generateFilterSortUrl = (filterParameters = {}, sortParameter = '') => {
  let url = '';
  const filterQuery = encodeFilterQuery(filterParameters);

  if (filterQuery.length > 0) {
    url = `${url}/filter/${filterQuery}`;
  }
  if (sortParameter && sortParameter.length > 0) {
    url = `${url}/sort/${sortParameter}`;
  }
  return url;
};

export default generateFilterSortUrl;