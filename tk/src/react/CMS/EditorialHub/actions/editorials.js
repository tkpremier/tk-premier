import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function editorialsRequested() {
  return createAction(types.GET_EDITORIALS_SUBMIT);
}

export function editorialsSuccess(json) {
  return createAction(types.GET_EDITORIALS_SUCCESS, { json });
}

export function editorialsError(errorMsg) {
  return createAction(types.GET_EDITORIALS_ERROR, errorMsg);
}

export function editorialUpdateSubmit() {
  return createAction(types.UPDATE_EDITORIAL_SUBMIT);
}

export function editorialUpdateSuccess(json) {
  return createAction(types.UPDATE_EDITORIAL_SUCCESS, { json });
}

export function editorialUpdateError(errorMsg) {
  return createAction(types.UPDATE_EDITORIAL_ERROR, errorMsg);
}

export function editorialArticlesUpdateSubmit() {
  return createAction(types.UPDATE_EDITORIAL_ARTICLES_SUBMIT);
}

export function editorialArticlesUpdateSuccess(json) {
  return createAction(types.UPDATE_EDITORIAL_ARTICLES_SUCCESS, { json });
}

export function editorialArticlesUpdateError(errorMsg) {
  return createAction(types.UPDATE_EDITORIAL_ARTICLES_ERROR, errorMsg);
}

export function editorialArticleDeleteSubmit() {
  return createAction(types.DELETE_EDITORIAL_ARTICLE_SUBMIT);
}

export function editorialArticleDeleteSuccess(json) {
  return createAction(types.DELETE_EDITORIAL_ARTICLE_SUCCESS, { json });
}

export function editorialArticleDeleteError(errorMsg) {
  return createAction(types.DELETE_EDITORIAL_ARTICLE_ERROR, errorMsg);
}

export function editorialImageUploadSubmit() {
  return createAction(types.UPLOAD_EDITORIAL_IMAGE_SUBMIT);
}

export function editorialImageUploadSuccess(selectedComponent, json) {
  return createAction(types.UPLOAD_EDITORIAL_IMAGE_SUCCESS, { selectedComponent, json });
}

export function editorialImageUploadError(errorMsg) {
  return createAction(types.UPLOAD_EDITORIAL_IMAGE_ERROR, errorMsg);
}

export const editorialsSetUploadImage = (imageLabel, uploadImage) => {
  return {
    type: types.EDITORIAL_UPLOAD_IMAGE_SET,
    imageLabel,
    uploadImage
  };
};

export const editorialsClearUploadImage = (imageLabel) => {
  return {
    type: types.EDITORIAL_UPLOAD_IMAGE_CLEAR,
    imageLabel
  };
};

export const editEditorialList = (editorialList) => {
  return {
    type: types.EDIT_EDITORIAL_LIST,
    editorialList
  };
};

export const editEditorialComponentList = (selectedEditorial, componentList) => {
  return {
    type: types.EDIT_EDITORIAL_COMPONENT_LIST,
    selectedEditorial,
    componentList
  };
};

export const editEditorial = (editorial, editedField, edit) => {
  return {
    type: types.EDIT_EDITORIAL,
    editorial,
    editedField,
    edit
  };
};

export const editComponent = (component, editorialIndex, componentIndex, editedField, edit) => {
  return {
    type: types.EDIT_COMPONENT,
    component,
    editorialIndex,
    componentIndex,
    editedField,
    edit
  };
};

export const setSelectedEditorial = (editorial) => {
  return {
    type: types.SET_SELECTED_EDITORIAL,
    editorial
  };
};

export const clearSelectedEditorial = () => {
  return {
    type: types.CLEAR_SELECTED_EDITORIAL
  };
};

export const setSelectedComponent = (component) => {
  return {
    type: types.SET_SELECTED_COMPONENT,
    component
  };
};

export const clearSelectedComponent = () => {
  return {
    type: types.CLEAR_SELECTED_COMPONENT
  };
};

export const setNewEditorialType = (editorialType) => {
  return {
    type: types.SET_NEW_EDITORIAL_TYPE,
    editorialType
  };
};

export const dropNewEditorial = (dropped) => {
  return {
    type: types.EDITORIAL_DROPPED,
    dropped
  };
};

export const updateBaseUrl = (url) => {
  return {
    type: types.APP_BASE_URL,
    baseUrl: url
  };
};
