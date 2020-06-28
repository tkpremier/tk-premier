import 'fetch-ponyfill';
import { isUndefined } from 'lodash/fp';
import ElasticService from '../services/ElasticService';
import { fetchResultsSuccess, fetchResultsError } from './actions';

const fetchResults = (dispatch, getState) => {
  const { query, searchType } = getState().location.payload;
  const { currentType } = getState();
  if (!isUndefined(searchType)) {
    if (searchType !== currentType) {
      return ElasticService.fetchResults({ query, searchType })
        .then((json) => {
          const data = {};
          console.log('json data: ', json);
          data[`${searchType}s`] = json;
          dispatch(fetchResultsSuccess({ ...data, currentType: searchType }));
        })
        .catch(err => dispatch(fetchResultsError(err)));
    }
  } else {
    if (currentType !== 'all') {
      return ElasticService.fetchResults({ query, searchType })
        .then(json => dispatch(fetchResultsSuccess({ ...json, currentType: 'all' })))
        .catch(err => dispatch(fetchResultsError(err)));
    }
    return dispatch(fetchResultsSuccess({ ...getState() }));
  }
};

export default {
  ALL_RESULTS_PENDING: {
    path: '/es/:query',
    thunk: fetchResults
  },
  TYPE_SPECIFIC_PENDING: {
    path: '/es/:query/:searchType',
    thunk: fetchResults
  }
};
