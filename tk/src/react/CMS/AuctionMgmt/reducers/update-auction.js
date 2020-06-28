import * as types from '../actions/action-types';
import { updateState as initialState } from '../initial-state';

export default function updateAuction(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.UPDATE_AUCTION_SUBMIT:
    case types.UPLOAD_WINNER_BID_EMAIL_SUBMIT:
      return {
        ...state,
        errors: {},
        saveDialogOpen: true,
        success: false,
        error: false
      };

    case types.UPDATE_AUCTION_SUCCESS:
      return {
        ...state,
        selectedAuction: payload.json,
        saveDialogOpen: false,
        error: false
      };

    case types.UPDATE_AUCTION_ERROR:
      return {
        ...state,
        saveDialogOpen: false,
        error: false
      };

    case types.UPDATE_AUCTION_DIALOG_OPEN:
      return {
        ...state,
        ...payload
      };

    case types.UPLOAD_WINNER_BID_EMAIL_SUCCESS:
    case types.UPLOAD_WINNER_BID_EMAIL_ERROR:
      return {
        ...state,
        saveDialogOpen: false,
        error: false
      };

    default:
      return state;
  }
}
