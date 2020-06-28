import { createSelector } from 'reselect';
import PhillipsLot from '../PhillipsLot/PhillipsLot';

const buyNowCarouselSelector = state => state.buyNowCarousel;
const carouselSelector = state => state.carousel;
const heroSelector = state => state.hero;
const lotsSelector = state => state.carousel.lots;
const editingComponentSelector = state => state.editingComponent;
const getEditingComponentType = (state, componentType) => componentType;

const makeEditingData = () => createSelector(
  heroSelector,
  editingComponentSelector,
  getEditingComponentType,
  (
    hero,
    editingComponent,
    componentType
  ) => {
    const {
      data,
      editing,
      error,
      itemUniqueId,
      isCarouselItem = false,
      method,
      saving,
      saved
    } = editingComponent;
    const editingComponentType = editingComponent.componentType;
    const enableEdit = componentType === editingComponentType && editing;
    const mainEditingData = {
      editingComponentType,
      deleting: enableEdit && method === 'DELETE',
      departmentLotId: enableEdit
        ? data.departmentLotId
        : data.id,
      editing: enableEdit,
      erred: enableEdit && error instanceof (Error),
      error: enableEdit && error instanceof (Error)
        ? error.message
        : '',
      pending: enableEdit && saving,
      saved: componentType === editingComponentType && saved
    };
    switch (componentType) {
      case 'hero':
        return {
          ...mainEditingData,
          ...(enableEdit && { ...hero, ...data }),
          ...(!enableEdit && { ...hero })
        };
      case 'buyNowCarousel':
      case 'carousel':
        return {
          ...mainEditingData,
          carouselId: editingComponent.carouselId,
          ...((isCarouselItem && enableEdit && !saved)
            && {
            departmentLotId: data.departmentLotId || 0,
            editingLotNumber: data.lotNumber,
            editingSaleNumber: data.saleNumber,
            editingDisplayOrder: data.displayOrder,
            itemUniqueId
          }
          ),
          isCarouselItem
        };
      default:
        return mainEditingData;
    }
  }
);

/**
  * @function getEditingData
  * @typedef {object} editingState shows edit/save/delete state
  * @property {boolean} editing - form editing state
  * @property {boolean} erred - form returned error
  * @property {string} error - form error message
  * @property {string} editingComponentType - component type string
  * @property {boolean} deleting - form deleting state
  * @property {number} departmentLotId - unique identifier for lot, departmentLotId or lotNumber
  * @property {boolean} saved - form saved
  * @property {boolean} saving - form saving
  * @return {editingState} state
*/
const getEditingData = makeEditingData();

const getCarouselChildren = () => createSelector(
  [lotsSelector, buyNowCarouselSelector, getEditingComponentType],
  (lots, buyNowCarousel, componentType) => {
    const data = (componentType === 'buyNowCarousel')
      ? buyNowCarousel[0].carouselItems
      : lots;
    return data.map(item => (
      <PhillipsLot
        {...item}
        imageTransformation="HomePageCarousel"
        lotListDisabled
        showLotNumber={false}
        toggleEstHammer
      />
    ));
  }
);

const carouselChildren = getCarouselChildren();

const createDisplayOrderList = (length) => {
  const list = [];
  for (let i = 0; i < length + 1; i++) {
    list.push(i + 1);
  }

  return list;
};

export {
  createDisplayOrderList,
  carouselChildren,
  getEditingData,
  makeEditingData
};
