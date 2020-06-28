import * as types from './action-types';

// === Action Creators ===
export const resetAlert = (alert) => {
  return {
    type: types.RESET_ALERT,
    alert
  };
};

export const updateAuctionSuccessAlert = (message) => {
  return {
    type: types.UPDATE_AUCTION_SUCCESS_ALERT,
    message
  };
};

export const highlightsSaveSuccessAlert = (message) => {
  return {
    type: types.HIGHLIGHTS_SAVE_SUCCESS_ALERT,
    message
  };
};

export const highlightsSaveErrorAlert = (message) => {
  return {
    type: types.HIGHLIGHTS_SAVE_ERROR_ALERT,
    message
  };
};

export const highlightsDeleteSuccessAlert = (message) => {
  return {
    type: types.HIGHLIGHTS_DELETE_SUCCESS_ALERT,
    message
  };
};

export const highlightsDeleteErrorAlert = (message) => {
  return {
    type: types.HIGHLIGHTS_DELETE_ERROR_ALERT,
    message
  };
};

export const highlightsImageUploadSuccessAlert = (message) => {
  return {
    type: types.HIGHLIGHTS_IMAGE_UPLOAD_SUCCESS_ALERT,
    message
  };
};

export const highlightsImageUploadErrorAlert = (message) => {
  return {
    type: types.HIGHLIGHTS_IMAGE_UPLOAD_ERROR_ALERT,
    message
  };
};

export const cloudinaryErrorAlert = (message) => {
  return {
    type: types.CLOUDINARY_UPLOAD_ERROR,
    message
  };
};

export const migratePreviewToStagingAlert = (message) => {
  return {
    type: types.MIGRATE_PREVIEW_TO_STAGING_SUCCESS_ALERT,
    message
  };
};

export const highlightsMigratePreviewToStagingAlert = (message) => {
  return {
    type: types.HIGHLIGHTS_MIGRATE_FROM_PREVIEW_TO_PROD_SUCCESS_ALERT,
    message
  };
};
