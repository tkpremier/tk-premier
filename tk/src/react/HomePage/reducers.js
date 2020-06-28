const updateElements = (res, prevState) => {
  const carousels = prevState.carousels.map(prevCar => res.carouselId === prevCar.carouselId ? res : prevCar);
  return {
    ...prevState,
    carousels
  };
}

export const currentHeroIndex = (state = 0, { type, index }) => {
  let newState;
  switch (type) {
    case 'CHANGE_HERO_INDEX':
      newState = index;
      break;
    default:
      newState = state;
  }
  return newState;
};

export const editable = (state = false) => state;

export const elements = (state = {}, action) => {
  switch (action.type) {
    case 'ELEMENT_SAVE_SUCCESS':
      const { payload } = action;
      const elements = payload?.res.homePage || updateElements(payload.res, state);
      return elements;
    case 'SET_USER_CAROUSEL': {
      const { userCarousel } = action;
      return { ...state, userCarousel };
    }
    case 'REMOVE_USER_CAROUSEL': {
      return { ...state, userCarousel: null };
    }
    default:
      return state;
  }
};
