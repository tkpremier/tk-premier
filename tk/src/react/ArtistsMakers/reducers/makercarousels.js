import {
  saveMaker,
  addNewCarousel,
  receiveCarouselData,
  updateCarouselDataSuccess,
  updateCarouselPending,
  updateCarouselError,
  addNewMaker
} from './makercarousels-utils';
import { defaultMakerCarouselState } from '../default-state-slices/makercarousels';

const makerCarousels = (state = { data: defaultMakerCarouselState }, action) => {
  switch (action.type) {
    case 'ADD_NEW_MAKER':
      return addNewMaker(state, action);
    case 'SAVE_MAKER':
      return saveMaker(state, action);
    case 'ADD_CAROUSEL':
      return addNewCarousel(state, action);
    case 'UPDATE_CAROUSEL_PENDING':
      return updateCarouselPending(state, action);
    case 'UPDATE_CAROUSEL_SUCCESS':
      return updateCarouselDataSuccess(state, action);
    case 'UPDATE_CAROUSEL_ERROR':
      return updateCarouselError(state, action);
    case 'RECEIVE_POSTS':
      return receiveCarouselData(state, action);
    case 'EDIT_CAROUSEL':
    case 'RECEIVE_MAKERS_ERROR':
    default:
      return state
  }
}

export default makerCarousels;
