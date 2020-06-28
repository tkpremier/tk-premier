import * as types from '../actions/action-types';
import { auctions as initialState } from '../initial-state';

export default function auctions(state = initialState, action) {
  switch (action.type) {
    case types.AUCTIONS_REQUESTED:
      return {
        ...state,
        errors: {}
      };

    case types.AUCTIONS_REQUEST_SUCCESS:
      return {
        ...state,
        auctions: action.payload.json
      };

    case types.AUCTIONS_REQUEST_ERROR:
      return {
        ...state
      };

    case types.EDIT_AUCTIONS_DISPLAY_LIST:
      return {
        ...state,
        displayAuctions: action.auctionsList
      };

    default:
      return state;
  }
}
