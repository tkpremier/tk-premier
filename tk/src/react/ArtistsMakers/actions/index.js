import 'fetch-ponyfill';

export const handleMql = (mql) => {
  return {
    type: 'HANDLE_MQL',
    mql
  };
};

export function manageCarousel(id, type) {
  return {
    isAdding: true,
    isEditing: false,
    isFetching: false,
    type,
    id
  };
}

export function setCarouselCount(carouselId, count, type) {
  return {
    carouselId,
    count,
    type
  };
}

export const setMaker = (maker) => {
  const id = maker.makerId;
  const name = maker.maker;
  return {
    type: 'SET_MAKER',
    id,
    name
  };
};

export const receiveMakersError = (data) => {
  console.error('Fetch Makers Error: ', data);
  return {
    type: 'RECEIVE_MAKERS_ERROR',
    data
  };
};

export function receiveMakersSuccess(data, letter, fetchedMore) {
  return {
    type: 'RECEIVE_MAKERS_SUCCESS',
    data,
    letter,
    fetchedMore
  };
}

export function fetchMakers(isCMS) {
  if (isCMS) {
    return dispatch => fetch(`${phillips.apiDomainUrl}lookup/makers`)
      .then(response => response.json())
      .then(json => dispatch(receiveMakersSuccess(json)))
      .catch(err => dispatch(receiveMakersError(err)));
  }
  return { type: 'RECEIVE_MAKERS_ERROR' };
}

