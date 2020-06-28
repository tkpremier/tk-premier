import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function auctionsSuccess(json) {
  return createAction(types.AUCTIONS_REQUEST_SUCCESS, { json });
}

export function auctionsError(errorMsg) {
  return createAction(types.AUCTIONS_REQUEST_ERROR, errorMsg);
}

export function auctionsRequested() {
  return createAction(types.AUCTIONS_REQUESTED);
}

export function auctionLotsSuccess(json) {
  return createAction(types.AUCTION_LOTS_REQUEST_SUCCESS, { json });
}

export function auctionLotsError(errorMsg) {
  return createAction(types.AUCTION_LOTS_REQUEST_ERROR, errorMsg);
}

export function auctionLotsRequested() {
  return createAction(types.AUCTION_LOTS_REQUESTED);
}

export function lotComponentsRequested() {
  return createAction(types.GET_LOT_COMPONENTS_SUBMIT);
}

export function lotComponentsSuccess(json) {
  return createAction(types.GET_LOT_COMPONENTS_SUCCESS, { json });
}

export function lotComponentsError(errorMsg) {
  return createAction(types.GET_LOT_COMPONENTS_ERROR, errorMsg);
}

export function lotComponentUpdateSubmit() {
  return createAction(types.UPDATE_LOT_COMPONENT_SUBMIT);
}

export function lotComponentUpdateSuccess(json) {
  return createAction(types.UPDATE_LOT_COMPONENT_SUCCESS, { json });
}

export function lotComponentUpdateError(errorMsg) {
  return createAction(types.UPDATE_LOT_COMPONENT_ERROR, errorMsg);
}

export function lotComponentDeleteSubmit() {
  return createAction(types.DELETE_LOT_COMPONENT_SUBMIT);
}

export function lotComponentDeleteSuccess(json) {
  return createAction(types.DELETE_LOT_COMPONENT_SUCCESS, { json });
}

export function lotComponentDeleteError(errorMsg) {
  return createAction(types.DELETE_LOT_COMPONENT_ERROR, errorMsg);
}

export function lotComponentImageUploadSubmit() {
  return createAction(types.UPLOAD_LOT_COMPONENT_IMAGE_SUBMIT);
}

export function lotComponentImageUploadSuccess(selectedComponent, json) {
  return createAction(types.UPLOAD_LOT_COMPONENT_IMAGE_SUCCESS, { selectedComponent, json });
}

export function lotComponentImageUploadError(errorMsg) {
  return createAction(types.UPLOAD_LOT_COMPONENT_IMAGE_ERROR, errorMsg);
}

export const editAuctionsDisplayList = auctionsList => ({
  type: types.EDIT_AUCTIONS_DISPLAY_LIST,
  auctionsList
});

export const selectAuction = selectedAuction => ({
  type: types.AUCTION_SELECTED,
  selectedAuction
});

export const selectLot = selectedLot => ({
  type: types.LOT_SELECTED,
  selectedLot
});

export const editLotComponent = (
  component,
  lotComponentIndex,
  editedField,
  edit
) => {
  return {
    type: types.EDIT_LOT_COMPONENT,
    component,
    lotComponentIndex,
    editedField,
    edit
  };
};

export const editLotComponentData = (
  component,
  lotComponentIndex,
  componentIndex,
  editedField,
  edit
) => {
  return {
    type: types.EDIT_LOT_COMPONENTDATA,
    component,
    lotComponentIndex,
    componentIndex,
    editedField,
    edit
  };
};

export const editLotComponentDataImage = (lotComponent, editedField, edit) => {
  return {
    type: types.EDIT_LOT_COMPONENTDATA_IMAGE,
    lotComponent,
    editedField,
    edit
  };
};

export const editLotComponentList = (lotComponentList) => {
  return {
    type: types.EDIT_LOT_COMPONENT_LIST,
    lotComponentList
  };
};

export const setSelectedLotComponent = (lotComponent) => {
  return {
    type: types.SET_SELECTED_LOT_COMPONENT,
    lotComponent
  };
};

export const clearSelectedLotComponent = () => {
  return {
    type: types.CLEAR_SELECTED_LOT_COMPONENT
  };
};

export const setSelectedLotComponentData = (lotComponentData) => {
  return {
    type: types.SET_SELECTED_LOT_COMPONENT_DATA,
    lotComponentData
  };
};

export const setNewLotComponentType = (lotComponentType) => {
  return {
    type: types.SET_NEW_LOT_COMPONENT_TYPE,
    lotComponentType
  };
};

export const dropNewLotComponent = (dropped) => {
  return {
    type: types.LOT_COMPONENT_DROPPED,
    dropped
  };
};

export const lotComponentSetUploadImage = (imageLabel, uploadImage) => {
  return {
    type: types.LOT_COMPONENT_UPLOAD_IMAGE_SET,
    imageLabel,
    uploadImage
  };
};

export const lotComponentClearUploadImage = (imageLabel) => {
  return {
    type: types.LOT_COMPONENT_UPLOAD_IMAGE_CLEAR,
    imageLabel
  };
};

export const setPreviouslySelectedComponentId = (selectedLotComponent) => {
  return {
    type: types.SET_PREVIOUSLY_SELECTED_COMPONENTID,
    selectedLotComponent
  };
};

export const updateBaseUrl = (url) => {
  return {
    type: types.APP_BASE_URL,
    baseUrl: url
  };
};
