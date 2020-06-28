import 'fetch-ponyfill';
import handleResponse from '../../utils/handleResponse';
import { updateCarouselSuccess, updateCarouselPending, updateCarouselError } from '../actions/makercarousels';

export const saveMaker = (id, keyId, isNew, carouselId, saveOnServer, data) => {
  if (saveOnServer) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    return dispatch =>
      fetch(`${phillips.domainURL}/api/maker/carouselitem`, options)
        .then(handleResponse)
        .then(json => dispatch(updateCarouselSuccess(id, json.makerPage.makerCarousels)))
        .catch(err => dispatch(updateCarouselError(carouselId, err)));
  }
  return {
    type: 'SAVE_MAKER',
    id,
    keyId,
    carouselId,
    data
  };
};

export const manageMaker = (keyId, carouselId) => {
  return {
    type: 'EDIT_MAKER',
    keyId,
    carouselId
  };
};

export const openDelete = (keyId, carouselId) => {
  return {
    type: 'OPEN_DELETE',
    keyId,
    carouselId
  };
};

export const deleteMaker = (keyId, carouselId) => (dispatch) => {
  dispatch(updateCarouselPending(carouselId));
  return fetch(`${phillips.domainURL}/api/maker/carouselitem/${keyId}`, { method: 'DELETE' })
    .then(handleResponse)
    .then(json => dispatch(updateCarouselSuccess(carouselId, json.makerPage.makerCarousels)))
    .catch(err => dispatch(updateCarouselError(carouselId, err)));
}
