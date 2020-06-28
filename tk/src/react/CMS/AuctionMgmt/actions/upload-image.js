import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function uploadImageSuccess(json) {
  return createAction(types.UPLOAD_IMAGE_SUCCESS, { json });
}

export function uploadImageError(errorMsg) {
  return createAction(types.UPLOAD_IMAGE_ERROR, errorMsg);
}

export function uploadImage() {
  return createAction(types.UPLOAD_IMAGE_SUBMIT);
}

export function uploadiOSMobileBannerSuccess(json) {
  return createAction(types.UPLOAD_IOSMOBILEBANNER_SUCCESS, { json });
}

export function uploadiOSMobileBannerError(errorMsg) {
  return createAction(types.UPLOAD_IOSMOBILEBANNER_ERROR, errorMsg);
}

export function uploadiOSMobileBannerSubmit() {
  return createAction(types.UPLOAD_IOSMOBILEBANNER_SUBMIT);
}

export function uploadiOSDesktopBannerSuccess(json) {
  return createAction(types.UPLOAD_IOSDESKTOPBANNER_SUCCESS, { json });
}

export function uploadiOSDesktopBannerError(errorMsg) {
  return createAction(types.UPLOAD_IOSDESKTOPBANNER_ERROR, errorMsg);
}

export function uploadiOSDesktopBannerSubmit() {
  return createAction(types.UPLOAD_IOSDESKTOPBANNER_SUBMIT);
}

export function uploadCatalogCoverSuccess(json) {
  return createAction(types.UPLOAD_CATALOG_COVER_SUCCESS, { json });
}

export function uploadCatalogCoverError(errorMsg) {
  return createAction(types.UPLOAD_CATALOG_COVER_ERROR, errorMsg);
}

export function uploadCatalogCoverSubmit() {
  return createAction(types.UPLOAD_CATALOG_COVER_SUBMIT);
}

export const setUploadImage = (imageLabel, uploadImage) => {
  return {
    type: types.SET_UPLOAD_IMAGE,
    imageLabel,
    uploadImage
  };
};

export const clearUploadImage = (imageLabel) => {
  return {
    type: types.CLEAR_UPLOAD_IMAGE,
    imageLabel
  };
};
