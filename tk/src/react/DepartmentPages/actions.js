import omit from 'lodash/fp/omit';
import { uploadImage } from '../services/httpservice';
import { saveComponent, updateCarouselPosition } from '../services/deptservice';

const deptComponents = {
  'hero': 'HERO',
  'buyNowCarousel': 'BUYNOWCAROUSEL',
  'carousel': 'CAROUSEL',
  'carouselItem': 'CAROUSELITEM',
  '': 'CANCEL'
};

export const editComponent = (payload) => {
  const type = `EDITING_${deptComponents[payload.componentType]}`;
  return {
    type,
    payload
  };
};

const saveError = (payload) => {
  const type = `SAVE_ERROR_${deptComponents[payload.componentType]}`;
  return {
    type,
    payload
  };
};

const saveSuccess = (payload) => {
  const type = `SAVE_SUCCESS_${deptComponents[payload.componentType]}`;
  return {
    type,
    payload
  };
};

const saveRequest = (payload) => {
  const type = `SAVE_REQUEST_${deptComponents[payload.componentType]}`;
  return {
    type,
    payload
  };
};

export const updateComponent = (payload) => {
  let { data } = payload;
  const { departmentId } = payload;
  return (dispatch) => {
    dispatch(saveRequest(payload));
    if (data.hasOwnProperty('images')) {
      const { images } = data;
      uploadImage(images, `/api/departments/${departmentId}/image`)
        .then(({ imagePath }) => {
          // remove image files, imagePath, and component
          data = { ...omit('images')(data), imagePath, component: payload.componentType };
          const updatedPayload = { ...payload, data };
          saveComponent(updatedPayload)
            .then(resp => dispatch(saveSuccess({
              ...updatedPayload,
              resp,
              saved: true,
              saving: false,
              editing: false
            })));
        })
        .catch(err => dispatch(saveError(err)));
    } else {
      saveComponent(payload)
        .then(resp => dispatch(saveSuccess({
          ...payload,
          resp,
          saved: true,
          saving: false,
          editing: false
        })))
        .catch((error) => {
          console.error("Error: ", error);
          dispatch(saveError({
            ...payload,
            ...data,
            error,
            saved: false,
            saving: false,
            editing: false
          }))
        });
    }
  }
}

export const setInstaFeed = (instaFeed) => {
  return { type: 'SET_INSTAGRAM_FEED', instaFeed };
};

// Carousel Position:
export const updatePosition = (payload) => {
  return (dispatch) => {
    dispatch(saveRequest(payload));
    updateCarouselPosition(payload)
      .then(resp => dispatch(saveSuccess({
        ...payload,
        resp,
        saved: true,
        saving: false,
        editing: false
      })))
      .catch((error) => {
        console.error('Error: ', error);
        dispatch(saveError({
          ...payload,
          error,
          saved: false,
          saving: false,
          editing: false
        }));
      });
  };
};
