/**
 *
 * @param {string} url url string to parse;
 *
 * @typedef imageData
 * @type {object}
 * @property {string} publicId - original public Id before transform
 * @property {number} cloudinaryVersion - number of current version
 * @property {string} transform - transformation name
 *
 * @return {imageData} - returns the imageData
 */
const domain = 'https://assets.phillips.com/image/upload/';

const getCloudinaryImageData = (url = '') => {
  try {
    const transformation = url.split(domain)[1].split('/')[0];
    const cloudinaryVersion = url.split(`${transformation}/`)[1].split('/')[0];
    const publicId = url.split(`${cloudinaryVersion}`)[1];
    return {
      cloudinaryVersion,
      publicId,
      transformation
    };
  } catch (e) {
    console.log('There was an error getting image data.  Make sure URL is cloudinary, phillips, and correct: ', e);
    return {
      cloudinaryVersion: '1',
      publicId: '/',
      transformation: 'Error'
    };
  }
};

export default getCloudinaryImageData;
