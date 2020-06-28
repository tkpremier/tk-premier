import 'fetch-ponyfill';
import { receiveMakersSuccess, receiveMakersError } from '../../ArtistsMakers/actions/';
import MakerService from '../../services/MakerService';

const updatePending = (letter, fetchedMore, page) => {
  return {
    type: 'UPDATE_PENDING',
    letter,
    fetchedMore,
    page
  }
}

export function fetchMakers(isCMS, letter) {
  if (isCMS) {
    return (dispatch) => {
      dispatch(updatePending(letter, false));
      MakerService.fetchByLetter(letter)
        .then(json => dispatch(receiveMakersSuccess(json, letter)))
        .catch(err => dispatch(receiveMakersError(err)));
    };
  }
  return {
    type: 'RECEIVE_MAKERS_ERROR'
  };
}

export function fetchMoreMakers(letter, page) {
  const fetchedMore = true;
  return (dispatch) => {
    dispatch(updatePending(letter, fetchedMore, page));
    MakerService.fetchMoreByLetter(letter, page)
      .then(json => dispatch(receiveMakersSuccess(json, letter, fetchedMore)))
      .catch(err => dispatch(receiveMakersError(err)));
  };
}

const searchMakerPending = (currentValue) => {
  return {
    type: 'SEARCH_MAKER_PENDING',
    currentValue
  };
}

const searchMakerSuccess = (makers, currentValue) => {
  return {
    type: 'SEARCH_MAKER_SUCCESS',
    makers,
    currentValue
  };
}

const searchMakerError = (err) => {
  // side effect
  console.error('SearchMakerError: ', err);
  return {
    type: 'SEARCH_MAKER_ERROR',
    err
  };
}

export function searchMaker(searchQuery) {
  return (dispatch) => {
    dispatch(searchMakerPending(searchQuery));
    MakerService.search(searchQuery)
      .then(json => dispatch(searchMakerSuccess(json.makers)))
      .catch(err => dispatch(searchMakerError(err)));
  };
}
