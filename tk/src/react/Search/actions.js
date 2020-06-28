export const fetchResultsSuccess = (payload) => {
  return {
    type: 'FETCH_RESULTS_SUCCESS',
    payload
  };
};

export const fetchResultsError = (payload) => {
  return {
    type: 'FETCH_RESULTS_ERROR',
    payload
  };
};

export const allResultsPending = (payload) => {
  return {
    type: 'ALL_RESULTS_PENDING',
    payload
  };
};

export const typeSpecificPending = (payload) => {
  return {
    type: 'TYPE_SPECIFIC_PENDING',
    payload
  };
}
