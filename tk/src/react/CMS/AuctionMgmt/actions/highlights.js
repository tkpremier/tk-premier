import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function highlightsGetSubmit() {
  return createAction(types.HIGHLIGHTS_GET_SUBMIT);
}

export function highlightsGetSuccess(json) {
  return createAction(types.HIGHLIGHTS_GET_SUCCESS, { json });
}

export function highlightGetError(errorMsg) {
  return createAction(types.HIGHLIGHTS_GET_ERROR, errorMsg);
}

export function highlightsSaveSubmit() {
  return createAction(types.HIGHLIGHTS_SAVE_SUBMIT);
}

export function highlightsSaveSuccess(json) {
  return createAction(types.HIGHLIGHTS_SAVE_SUCCESS, { json });
}

export function highlightsSaveError(errorMsg) {
  return createAction(types.HIGHLIGHTS_SAVE_ERROR, errorMsg);
}

export function highlightsDeleteSubmit() {
  return createAction(types.HIGHLIGHTS_DELETE_SUBMIT);
}

export function highlightsDeleteSuccess(json) {
  return createAction(types.HIGHLIGHTS_DELETE_SUCCESS, { json });
}

export function highlightsDeleteError(errorMsg) {
  return createAction(types.HIGHLIGHTS_DELETE_ERROR, errorMsg);
}

export function highlightsImageUploadSubmit() {
  return createAction(types.HIGHLIGHTS_IMAGE_UPLOAD_SUBMIT);
}

export function highlightsImageUploadSuccess(json) {
  return createAction(types.HIGHLIGHTS_IMAGE_UPLOAD_SUCCESS, { json });
}

export function highlightsImageUploadError(errorMsg) {
  return createAction(types.HIGHLIGHTS_IMAGE_UPLOAD_ERROR, errorMsg);
}

export function highlightsPushToProdSubmit() {
  return createAction(types.HIGHLIGHTS_PUSH_TO_PROD_SUBMIT);
}

export function highlightsPushToProdSuccess(json) {
  return createAction(types.HIGHLIGHTS_PUSH_TO_PROD_SUCCESS, { json });
}

export function highlightsPushToProdError(errorMsg) {
  return createAction(types.HIGHLIGHTS_PUSH_TO_PROD_ERROR, errorMsg);
}

export function highlightsPushToProdDialog(value) {
  return createAction(types.HIGHLIGHTS_PUSH_TO_PROD_DIALOG, value);
}

export function highlightsMigratePreviewtoProductionSubmit() {
  return createAction(types.HIGHLIGHTS_MIGRATE_FROM_PREVIEW_TO_PROD_SUBMIT);
}

export function highlightsMigratePreviewtoProductionSuccess(json) {
  return createAction(types.HIGHLIGHTS_MIGRATE_FROM_PREVIEW_TO_PROD_SUCCESS, { json });
}

export function highlightsMigratePreviewtoProductionError(errorMsg) {
  return {
    type: types.HIGHLIGHTS_MIGRATE_FROM_PREVIEW_TO_PROD_ERROR,
    message: errorMsg
  };
};

export function highlightsMigratePreviewtoProductionDialog(value) {
  return createAction(types.HIGHLIGHTS_MIGRATE_FROM_PREVIEW_TO_PROD_DIALOG, value);
}

export const highlightsSetUploadImage = (imageLabel, uploadImage) => {
  return {
    type: types.HIGHLIGHTS_UPLOAD_IMAGE_SET,
    imageLabel,
    uploadImage
  };
};

export const highlightsClearUploadImage = (imageLabel) => {
  return {
    type: types.HIGHLIGHTS_UPLOAD_IMAGE_CLEAR,
    imageLabel
  };
};

export const editHighlight = (highlight) => {
  return {
    type: types.EDIT_HIGHLIGHT,
    highlight
  };
};

export const editHighlightsList = (highlights) => {
  return {
    type: types.EDIT_HIGHLIGHTS_LIST,
    highlights
  };
};

export const setSelectedHighlight = (highlight) => {
  return {
    type: types.SET_SELECTED_HIGHLIGHT,
    highlight
  };
};

export const clearSelectedHighlight = () => {
  return {
    type: types.CLEAR_SELECTED_HIGHLIGHT
  };
};
