import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function cloudinaryUploadTrigger() {
  return createAction(types.CLOUDINARY_UPLOAD_TRIGGER);
}

export function cloudinaryUploadSuccess(json) {
  return createAction(types.CLOUDINARY_UPLOAD_FINISHED, { json });
}

export function cloudinaryUploadError(json) {
  return createAction(types.CLOUDINARY_UPLOAD_ERROR, { json });
}

export function cloudinaryGetUploadStatus() {
  return createAction(types.CLOUDINARY_GET_UPLOAD_STATUS);
}

export function cloudinaryGetUploadStatusSuccess(json) {
  return createAction(types.CLOUDINARY_GET_UPLOAD_STATUS_SUCCESS, { json });
}

export function cloudinaryGetUploadStatusError(errorMsg) {
  return createAction(types.CLOUDINARY_GET_UPLOAD_STATUS_ERROR, errorMsg);
}

export function cloudinaryDialogOpen(value) {
  return createAction(types.CLOUDINARY_DIALOG_OPEN, value);
}

export function thumbnailUpdate() {
  return createAction(types.THUMBNAIL_UPDATE);
}

export function thumbnailUpdateSuccess(json) {
  return createAction(types.THUMBNAIL_UPDATE_SUCCESS, { json });
}

export function thumbnailUpdateError(errorMsg) {
  return createAction(types.THUMBNAIL_UPDATE_ERROR, errorMsg);
}

export function thumbnailDialogOpen(value) {
  return createAction(types.THUMBNAIL_DIALOG_OPEN, value);
}
