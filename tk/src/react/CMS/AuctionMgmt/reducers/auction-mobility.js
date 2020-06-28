import * as types from '../actions/action-types';
import { selectedAMSale as initialState } from '../initial-state';

export default function selectedAMSale(state = initialState, action) {
  switch (action.type) {
    case types.SET_AUCTION_MOBILITY_SALE:
      return {
        ...state,
        selectedAMSale: state.selectedAMSale
      };

    case types.GET_AUCTION_MOBILITY_SALE_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.GET_AUCTION_MOBILITY_SALE_SUCCESS:
      return {
        ...state,
        ...action.payload.json,
        saleEdited: false
      };

    case types.GET_AUCTION_MOBILITY_SALE_ERROR:
      return {
        ...initialState
      };

    case types.UPDATE_AUCTION_MOBILITY_SALE_SUBMIT:
      return {
        ...state,
        errors: {},
        auctionManagementProgress: true
      };

    case types.UPDATE_AUCTION_MOBILITY_SALE_SUCCESS:
      return {
        ...state,
        ...action.payload.json,
        auctionManagementProgress: false
      };

    case types.UPDATE_AUCTION_MOBILITY_SALE_ERROR:
      return {
        ...state,
        uploadStatus: 'Upsert',
        auctionManagementProgress: false
      };

    case types.UNLOCK_AUCTION_MOBILITY_SALE_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.UNLOCK_AUCTION_MOBILITY_SALE_SUCCESS:
      return {
        ...state,
        ...action.payload.json
      };

    case types.UNLOCK_AUCTION_MOBILITY_SALE_ERROR:
      return {
        ...state
      };

    case types.EDIT_AM_DETAILS:
      return {
        ...state,
        [action.field]: action.edit,
        saleEdited: true
      };

    default:
      return state;

  };
}
