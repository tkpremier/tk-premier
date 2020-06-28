import * as types from '../actions/action-types';
import { selectedLot as initialState } from '../initial-state';

const selectedLot = (state = initialState, action) => {
  switch (action.type) {
    case types.LOT_SELECTED:
      return {
        ...state,
        ...action,
        lotEdited: false,
        lotSelected: true
      };

    case types.AUCTION_SELECTED:
      return {
        ...state,
        lotSelected: false
      };

    case types.EDIT_LOT_FIELD:
      return {
        ...state,
        [action.editedField]: action.edit,
        lotEdited: true
      };

    case types.EDIT_LOT_IMAGES:
      return {
        ...state,
        lotEdited: true,
        lotImages: action.lotImages
      };

    case types.EDIT_LOT_TAGS:
      return {
        ...state,
        lotEdited: true,
        tags: action.lotTagList
      };

    default:
      return state;
  }
};

export default selectedLot;
