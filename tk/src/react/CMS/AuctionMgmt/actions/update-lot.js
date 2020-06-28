import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function updateLotSubmit() {
  return createAction(types.UPDATE_LOT_SUBMIT);
}

export function updateLotSuccess(json) {
  return createAction(types.UPDATE_LOT_SUCCESS, { json });
}

export function updateLotError(errorMsg) {
  return createAction(types.UPDATE_LOT_ERROR, errorMsg);
}

export function saveDialogOpen(value) {
  return createAction(types.UPDATE_LOT_DIALOG_OPEN, value);
}

export function cloudinaryLotUploadSubmit() {
  return createAction(types.CLOUDINARY_LOT_UPLOAD_SUBMIT);
}

export function cloudinaryLotUploadSuccess(json) {
  return createAction(types.CLOUDINARY_LOT_UPLOAD_SUCCESS, { json });
}

export function cloudinaryLotUploadError(errorMsg) {
  return createAction(types.CLOUDINARY_LOT_UPLOAD_ERROR, errorMsg);
}
