const updateElements = (res, prevState) => {
  const carousels = prevState.carousels.map(prevCar => res.carouselId === prevCar.carouselId ? res : prevCar);
  return {
    ...prevState,
    carousels
  };
};

export default (state = {}, action) => {
  let newState;
  switch (action.type) {
    case 'ELEMENT_SAVE_SUCCESS':
      const { payload } = action;
      const elements = payload?.res.homePage || updateElements(payload.res, state);
      return elements;
    case 'SET_USER_CAROUSEL': {
      const userCarousel = action.userCarousel;
      newState = { ...state, userCarousel };
      break;
    }
    case 'REMOVE_USER_CAROUSEL': {
      const userCarousel = null;
      newState = { ...state, userCarousel };
      break;
    }
    default:
      newState = state;
  }
  return newState;
};
