import 'fetch-ponyfill';
import handleResponse from '../utils/handleResponse';

let options = {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer Ph!l1!p$',
    'Content-Type': 'application/json',
  }
};

export const updateCarouselPosition = (payload) => {
  const { url } = payload;
  return fetch(url, options)
    .then(handleResponse);
};

export const saveComponent = (payload) => {
  const { data, method, noBody, url } = payload;
  options = { ...options, method };
  if (!noBody) {
    options.body = JSON.stringify(data);
  }
  return fetch(url, options)
    .then(handleResponse);
};
