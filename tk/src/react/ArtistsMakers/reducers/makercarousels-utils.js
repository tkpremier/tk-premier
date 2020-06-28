import find from 'lodash/fp/find';
import { defaultMakerCarouselState, defaultMakerCarouselItem } from '../default-state-slices/makercarousels';

const getCarousel = (carouselList, id) => find(car => car.id === id)(carouselList);

const setCarouselItemKeyId = (carousel) => {
  return carousel.makerCarouselItems.map((item) => {
    return { ...item, keyId: item.makerId };
  });
};

export const addNewCarousel = (state = {
  data: defaultMakerCarouselState,
  isFetching: false
}, action) => {
  let newData = [];
  const hasCarousel = getCarousel(state.data, action.id);
  if (!hasCarousel) {
    newData.push(defaultMakerCarouselState[0]);
  }
  newData.push(...state.data);
  return { ...state, data: newData, isFetching: false };
}

export const updateCarouselPending = (state = {
  data: defaultMakerCarouselState
}, action) => {
  return { ...state, editorResponse: action.editorResponse };
}

export const updateCarouselError = (
  state = { data: defaultMakerCarouselState, isFetching: false },
  action) => {
  return { ...state, editorResponse: action.editorResponse };
};

export const updateCarouselDataSuccess = (state = {
  data: defaultMakerCarouselState,
  serverData: defaultMakerCarouselState,
  isFetching: false
}, { updatedCarousels, modifiedId, editorResponse }) => {
  const newData = updatedCarousels.map((car) => {
    return {
      ...car,
      makerCarouselItems: setCarouselItemKeyId(car),
      itemCount: car.makerCarouselItems.length
    };
  });
  return {
    ...state,
    modifiedId: modifiedId,
    data: newData,
    serverData: newData,
    editorResponse: editorResponse };
}

export const receiveCarouselData = (state = {
  data: defaultMakerCarouselState,
  isFetching: false
}, action) => {
  console.log('receiveCarouselData: ', action);
  const newData = action.data.makerCarousels.data.map((car) => {
    return {
      ...car,
      makerCarouselItems: setCarouselItemKeyId(car),
      itemCount: car.makerCarouselItems.length
    };
  });
  return { ...state, data: newData, editorResponse: action.editorResponse };
}


export const addNewMaker = (state = {}, action) => {
  let newCarousel;
  const selectedCarousel = action.carouselId === 0 ? getCarousel(state.data, action.carouselId) : getCarousel(state.serverData, action.carouselId);
  let newCarouselItems = [...selectedCarousel.makerCarouselItems];
  const newData = state.data.map((car) => {
    newCarousel = car;
    if (newCarousel.id === action.carouselId) {
      const newItem = {
        ...defaultMakerCarouselItem,
        displayOrder: newCarouselItems.length + 1,
        keyId: Math.ceil(Math.random() * 100)
      };
      newCarouselItems.push(newItem);
      newCarousel.makerCarouselItems = newCarouselItems;
      newCarousel.itemCount = newCarouselItems.length;
    }
    return newCarousel;
  });
  return { ...state, data: newData };
}

export const saveMaker = (state, action) => {
  let newCarousel = getCarousel(state.data, action.carouselId);
  const newMaker = {
    ...find(maker => maker.keyId === action.keyId)(newCarousel.makerCarouselItems),
    ...action.data
  };

  const newItems = newCarousel.makerCarouselItems.map((maker) => {
    return maker.keyId === newMaker.keyId ?
      newMaker :
      maker;
  });
  newCarousel.makerCarouselItems = newItems;
  const newData = state.data.map(car => (car.id === newCarousel.id) ?
    newCarousel :
    car
  );
  return { ...state, data: newData };
}
