import { editingState } from './setInitialState';

const editingComponent = (state = editingState(12), action) => {
  switch (action.type) {
    case 'EDITING_BUYNOWCAROUSEL':
    case 'EDITING_HERO':
    case 'EDITING_CAROUSEL':
    case 'EDITING_CAROUSELITEM':
    case 'EDITING_CANCEL':
      return { ...state, ...action.payload };
    case 'SAVE_REQUEST_HERO':
    case 'SAVE_REQUEST_BUYNOWCAROUSEL':
    case 'SAVE_REQUEST_CAROUSEL':
    case 'SAVE_REQUEST_CAROUSELITEM':
      return { ...state, ...action.payload };
    case 'SAVE_ERROR_BUYNOWCAROUSEL':
    case 'SAVE_ERROR_HERO':
    case 'SAVE_ERROR_CAROUSEL':
    case 'SAVE_ERROR_CAROUSELITEM':
      return { ...state, ...action.payload };
    case 'SAVE_SUCCESS_BUYNOWCAROUSEL':
      return { ...editingState(12), saved: true, componentType: action.payload.componentType };
    case 'SAVE_SUCCESS_HERO':
    case 'SAVE_SUCCESS_CAROUSEL':
    case 'SAVE_SUCCESS_CAROUSELITEM':
      return {
        ...editingState(12),
        saved: true,
        componentType: action.payload.componentType,
        isCarouselItem: false
      };
    default:
      return state;
  }
};

export {
  editingComponent
}