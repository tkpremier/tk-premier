import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function getAMSaleSubmit() {
  return createAction(types.GET_AUCTION_MOBILITY_SALE_SUBMIT);
}

export function getAMSaleSuccess(json) {
  return createAction(types.GET_AUCTION_MOBILITY_SALE_SUCCESS, { json });
}

export function getAMSaleError(errorMsg) {
  return createAction(types.GET_AUCTION_MOBILITY_SALE_ERROR, errorMsg);
}

export function updateAMSaleSubmit() {
  return createAction(types.UPDATE_AUCTION_MOBILITY_SALE_SUBMIT);
}

export function updateAMSaleSuccess(json) {
  return createAction(types.UPDATE_AUCTION_MOBILITY_SALE_SUCCESS, { json });
}

export function updateAMSaleError(errorMsg) {
  return createAction(types.UPDATE_AUCTION_MOBILITY_SALE_ERROR, errorMsg);
}

export function unlockAMSaleSubmit() {
  return createAction(types.UNLOCK_AUCTION_MOBILITY_SALE_SUBMIT);
}

export function unlockAMSaleSuccess(json) {
  return createAction(types.UNLOCK_AUCTION_MOBILITY_SALE_SUCCESS, { json });
}

export function unlockAMSaleError(errorMsg) {
  return createAction(types.UNLOCK_AUCTION_MOBILITY_SALE_ERROR, errorMsg);
}

export function setAMSale() {
  return createAction(types.SET_AUCTION_MOBILITY_SALE);
}

export const editAMDetails = (field, edit) => {
  return {
    type: types.EDIT_AM_DETAILS,
    field,
    edit
  };
};

export const unblockAMDialog = (dialog) => {
  return {
    type: types.UNLOCK_AUCTION_MOBILITY_SALE_DIALOG,
    dialog
  };
};
