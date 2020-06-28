import mapValues from 'lodash/mapValues';
import filter from 'lodash/fp/filter';
import isString from 'lodash/isString';
import 'fetch-ponyfill';
import handleResponse from '../utils/handleResponse';

const getUrl = ({
  elementType = 'default',
  id = '0',
  method = 'POST'
}) => {
  // const idArray = id.indexOf('-') ? id.split('-') : [id];
  let url = `/api/websitehomepage/${elementType}`;
  if (elementType === 'carousel' || elementType === 'lot' || elementType === 'maker') {
    url = elementType === 'lot' || elementType === 'maker'
      ? '/api/carousel/carouselItem'
      : `/api/carousel/${elementType}`;
  }
  if (method === 'DELETE') {
    url = `${url}/${id}`;
  }
  return url;
}

const uploadImage = ({ imageType, files }, url = '/api/websitehomepage/image') => {
  const data = new FormData();
  const filesArray = Array.from(files);
  data.append('imageType', imageType);
  filesArray.forEach((file, i) => data.append(`file-${i}`, file));
  const options = {
    method: 'POST',
    contentType: 'multipart/form-data',
    body: data,
    headers: {
      'Authorization': 'Bearer Ph!l1!p$'
    }
  };
  return fetch(url, options).then(handleResponse);
}

const deleteImage = (imagePath) => {
  const requestBody = {
    imageType: 'HomePage',
    fileName: imagePath
  };
  const request = {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(requestBody)
  };
  return fetch('/api/websitehomepage/image', request);
};

const uploadHomePageImages = (images, data, url = '/api/websitehomepage/image') => {
  const element = data.modifiedItem;
  return Promise.all(images.map((image) => {
    const requestBody = new FormData();
    requestBody.append('imageType', 'HomePage');
    requestBody.append('imageUrl', element[image.key]);
    requestBody.append('file', image.file[0]);
    const options = {
      method: 'POST',
      contentType: 'multipart/form-data',
      body: requestBody
    };
    return fetch(url, options);
  }))
    .then(() => data, (err) => err);
};

const deleteElement = (elementType, { id, element }) => {
  const request = {
    method: 'DELETE'
  };
  const images = filter((val) => isString(val) && val.includes('rackcdn'))(JSON.parse(element));
  const imagePromises = images.map(imgPath => deleteImage(imgPath));
  const url = getUrl({
    elementType,
    id,
    method: 'DELETE'
  });
  return Promise
    .all(imagePromises)
    .then(() => fetch(url, request))
    .then(handleResponse);
};

const saveElement = (elementType, data) => {
  const images = [];
  const requestBody = mapValues(data, (value, key) => {
    let newValue = value;
    if (value instanceof FileList) {
      images.push({ file: value, key: key });
      newValue = value[0].name;
    }
    return newValue;
  });
  const request = {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(requestBody)
  };
  if (parseInt(data.id, 10) === 0) {
    request.method = 'POST';
  }
  const url = getUrl({
    elementType,
    method: request.METHOD
  });
  return fetch(url, request)
    .then(handleResponse)
    .then(jsonResponse => uploadHomePageImages(images, jsonResponse));
};

const getUserCarousel = (userData) => {
  const auth = `${userData.authToken.token_type} ${userData.authToken.access_token}`;
  const requestConfig = {
    headers: { 'Authorization': auth }
  };
  return fetch(`${userData.url}${userData.id}/makerlotsdetailed`, requestConfig)
    .then(handleResponse);
};

export { deleteElement, saveElement, getUserCarousel, uploadImage };
