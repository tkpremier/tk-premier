import handleResponse from '../utils/handleresponse';

/**
 * Carousel GET
 *  ${cmsDomain}/api/carousel/carousels/?carouselArea=4&carouselType=1'
 * @param {number} carouselAreaId - Carousel location options
 *  HomePage = 1,
 *  Department = 2,
 *  Maker = 3,
 *  Editorial = 4
 * @param {number} carouselTypeId - Type options
 *  Lot = 1
 *  Maker = 2
 * @param {object} options - Optional object that contains area-specific data
 *  departmentId - number
 *  flocklerId - number
 *  onlyActiveItems - boolean
 */
export const getCarousel = (carouselAreaId, carouselTypeId, options) => fetch(`/api/carousel/carousels/?carouselArea=${carouselAreaId}&carouselType=${carouselTypeId}&flocklerId=${options.flocklerId}&onlyActiveItems=${false}`).then(handleResponse);

export const createCarousel = (carouselData) => {
  const options = {
    method: carouselData.method || 'POST',
    headers: {
      'Authorization': 'Bearer Ph!l1!p$',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carouselData)
  };
  return fetch('/api/carousel/carousel', options)
    .then(handleResponse);
};
/**
 * @typedef carouselItem
 * @type {object}
 *  @property {number} carouselItemId
    @property {number} carouselId
    @property {string} saleNumber
    @property {string} lotNumber
    @property {number} makerId
    @property {boolean} active
    @property {number} displayOrder
 * @param {carouselItem} carouselItem
 */
export const addCarouselItem = (carouselItem) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer Ph!l1!p$',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carouselItem)
  };
  return fetch('/api/carousel/carouselItem', options)
    .then(handleResponse);
};

export const editCarouselItem = (carouselItem) => {
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer Ph!l1!p$',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carouselItem)
  };
  return fetch('/api/carousel/carouselItem', options)
    .then(handleResponse);
}

export const deleteCarouselItem = ({ carouselItemId, carouselId }) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer Ph!l1!p$',
      'Content-Type': 'application/json'
    }
  };
  return fetch(`/api/carousel/carouselItem/${carouselId}-${carouselItemId}`, options)
    .then(handleResponse);
}