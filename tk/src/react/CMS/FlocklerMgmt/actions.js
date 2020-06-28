/* eslint-disable import/prefer-default-export */
import { updateEditorial, getEditorialById } from '../../../services/FlocklerService';
import { createCarousel, addCarouselItem, editCarouselItem, deleteCarouselItem } from '../../../services/CarouselService';

const updateItemError = payload => ({
  type: 'UPDATE_ITEM_ERROR',
  payload
});
const updateItemPending = payload => ({
  type: 'UPDATE_ITEM_PENDING',
  payload
});
const updateItemSuccess = payload => ({
  type: 'UPDATE_ITEM_SUCCESS',
  payload
});


export const updateItem = data => (dispatch) => {
  dispatch(updateItemPending(data));
  return updateEditorial(data)
    .then((res) => {
      dispatch(updateItemSuccess(res));
    })
    .catch(err => dispatch(updateItemError(err)));
}

const selectItemError = payload => (
  {
    type: 'SELECT_ITEM_SUCCESS',
    payload
  }
);
const selectItemSuccess = payload => (
  {
    type: 'SELECT_ITEM_SUCCESS',
    payload
  }
);
const selectItemPending = payload => ({
  type: 'SELECT_ITEM_PENDING',
  payload
});

export const selectItem = item => (dispatch) => {
  dispatch(selectItemPending(item));
  return getEditorialById(item.flocklerId)
    .then(res => dispatch(selectItemSuccess(res)))
    .catch(err => dispatch(selectItemError(err)));
};
export const editorialCarouselSuccess = payload => ({
  type: 'EDITORIAL_CAROUSEL_SUCCESS',
  payload
});

export const editorialCarouselError = payload => ({
  type: 'EDITORIAL_CAROUSEL_ERROR',
  payload
});
export const editorialCarousel = payload => dispatch => createCarousel(payload)
  .then(res => dispatch(editorialCarouselSuccess(res)))
  .catch(err => dispatch(editorialCarouselError(err)));

const getCarouselItemService = (method = 'POST') => {
  switch (method) {
    case 'PUT':
      return editCarouselItem;
    case 'DELETE':
      return deleteCarouselItem;
    case 'POST':
    default:
      return addCarouselItem;
  }
};

export const handleCarouselItem = (carouselItem, method = 'POST') => dispatch => getCarouselItemService(method)(carouselItem).then(res => dispatch(editorialCarouselSuccess(res)))
  .catch(err => dispatch(editorialCarouselError(err)));
