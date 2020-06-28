import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function pressReleasesRequested() {
  return createAction(types.GET_PRESS_RELEASES_SUBMIT);
}

export function pressReleasesSuccess(json) {
  return createAction(types.GET_PRESS_RELEASES_SUCCESS, { json });
}

export function pressReleasesError(errorMsg) {
  return createAction(types.GET_PRESS_RELEASES_ERROR, errorMsg);
}

export function pressReleaseArticleRequested() {
  return createAction(types.GET_PRESS_RELEASE_ARTICLE_SUBMIT);
}

export function pressReleaseArticleSuccess(json) {
  return createAction(types.GET_PRESS_RELEASE_ARTICLE_SUCCESS, { json });
}

export function pressReleaseArticleError(errorMsg) {
  return createAction(types.GET_PRESS_RELEASE_ARTICLE_ERROR, errorMsg);
}

export function pressReleaseArticleUpdateSubmit() {
  return createAction(types.UPDATE_PRESS_RELEASE_ARTICLE_SUBMIT);
}

export function pressReleaseArticleUpdateSuccess(json) {
  return createAction(types.UPDATE_PRESS_RELEASE_ARTICLE_SUCCESS, { json });
}

export function pressReleaseArticleUpdateError(errorMsg) {
  return createAction(types.UPDATE_PRESS_RELEASE_ARTICLE_ERROR, errorMsg);
}

export function pressReleaseArticleDeleteSubmit() {
  return createAction(types.DELETE_PRESS_RELEASE_ARTICLE_SUBMIT);
}

export function pressReleaseArticleDeleteSuccess(json) {
  return createAction(types.DELETE_PRESS_RELEASE_ARTICLE_SUCCESS, { json });
}

export function pressReleaseArticleDeleteError(errorMsg) {
  return createAction(types.DELETE_PRESS_RELEASE_ARTICLE_ERROR, errorMsg);
}

export function uploadPressReleasePDFSuccess(json) {
  return createAction(types.UPLOAD_PRESS_RELEASE_PDF_SUCCESS, { json });
}

export function uploadPressReleasePDFError(errorMsg) {
  return createAction(types.UPLOAD_PRESS_RELEASE_PDF_ERROR, errorMsg);
}

export function uploadPressReleasePDFSubmit() {
  return createAction(types.UPLOAD_PRESS_RELEASE_PDF_SUBMIT);
}

export const editPressReleaseList = (pressReleaseList) => {
  return {
    type: types.EDIT_PRESS_RELEASE_LIST,
    pressReleaseList
  };
};

export const editPressRelease = (pressRelease, editedField, edit) => {
  return {
    type: types.EDIT_PRESS_RELEASE,
    pressRelease,
    editedField,
    edit
  };
};

export const setSelectedPressRelease = (pressRelease) => {
  return {
    type: types.SET_SELECTED_PRESS_RELEASE,
    pressRelease
  };
};

export const setDepartmentList = (departments) => {
  return {
    type: types.SET_DEPARTMENT_LIST,
    departments
  };
};

export const setLocationInfo = (pressRelease, locationName, locationId) => {
  return {
    type: types.SET_LOCATION_INFO,
    pressRelease,
    locationName,
    locationId
  };
};

export const clearSelectedPressRelease = () => {
  return {
    type: types.CLEAR_SELECTED_PRESS_RELEASE
  };
};

export const updateBaseUrl = (url) => {
  return {
    type: types.APP_BASE_URL,
    baseUrl: url
  };
};
