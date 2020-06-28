/* eslint-disable import/prefer-default-export */
import 'fetch-ponyfill';
import handleResponse from '../utils/handleresponse';

const baseUrl = '/api/editorial';
export const getFlocklerEditorials = () => fetch(baseUrl).then(handleResponse);

export const getEditorialById = id => fetch(`${baseUrl}/${id}`).then(handleResponse);

export const updateEditorial = (data) => {
  const options = {
    'method': 'PUT',
    headers: {
      'Authorization': 'Bearer Ph!l1!p$',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(`${baseUrl}/${data.flocklerId}`, options)
    .then(handleResponse);
};
