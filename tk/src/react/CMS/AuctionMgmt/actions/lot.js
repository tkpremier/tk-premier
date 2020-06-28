import * as types from './action-types';

export const selectLot = (selectedLot) => {
  return {
    type: types.LOT_SELECTED,
    ...selectedLot
  };
};

export const editLotDetails = (editedField, edit) => {
  return {
    type: types.EDIT_LOT_FIELD,
    editedField,
    edit
  };
};

export const lotEdited = (edited) => {
  return {
    type: types.LOT_EDITED,
    edited
  };
};

export const editLotImages = (lotImages) => {
  return {
    type: types.EDIT_LOT_IMAGES,
    lotImages
  };
};

export const editLotTagList = (lotTagList) => {
  return {
    type: types.EDIT_LOT_TAGS,
    lotTagList
  };
};

export const editLotDisplayList = (lotList) => {
  return {
    type: types.EDIT_LOT_DISPLAY_LIST,
    lotList
  };
};
