import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function makerBiosRequested() {
  return createAction(types.GET_MAKER_BIOS_SUBMIT);
}

export function makerBiosSuccess(json) {
  return createAction(types.GET_MAKER_BIOS_SUCCESS, { json });
}

export function makerBiosError(errorMsg) {
  return createAction(types.GET_MAKER_BIOS_ERROR, errorMsg);
}

export function makerBioUpdateSubmit() {
  return createAction(types.UPDATE_MAKER_BIO_SUBMIT);
}

export function makerBioUpdateSuccess(json) {
  return createAction(types.UPDATE_MAKER_BIO_SUCCESS, { json });
}

export function makerBioUpdateError(errorMsg) {
  return createAction(types.UPDATE_MAKER_BIO_ERROR, errorMsg);
}

// export function makerBioDeleteSubmit() {
//   return createAction(types.DELETE_MAKER_BIO_SUBMIT);
// }
//
// export function makerBioDeleteSuccess(json) {
//   return createAction(types.DELETE_MAKER_BIO_SUCCESS, { json });
// }
//
// export function makerBioDeleteError(errorMsg) {
//   return createAction(types.DELETE_MAKER_BIO_ERROR, errorMsg);
// }

export const editMakerBio = (makerBio, editedField, edit) => {
  return {
    type: types.EDIT_MAKER_BIO,
    makerBio,
    editedField,
    edit
  };
};

export const editMakerBioList = (makerBioList) => {
  return {
    type: types.EDIT_MAKER_BIO_LIST,
    makerBioList
  };
};

export const setSelectedMakerBio = (makerBio) => {
  return {
    type: types.SET_SELECTED_MAKER_BIO,
    makerBio
  };
};

export const clearSelectedMakerBio = () => {
  return {
    type: types.CLEAR_SELECTED_MAKER_BIO
  };
};

export const updateBaseUrl = (url) => {
  return {
    type: types.APP_BASE_URL,
    baseUrl: url
  };
};
