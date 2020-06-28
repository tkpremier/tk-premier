import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function updateAuctionSuccess(json) {
  return createAction(types.UPDATE_AUCTION_SUCCESS, { json });
}

export function updateAuctionError(errorMsg) {
  return createAction(types.UPDATE_AUCTION_ERROR, errorMsg);
}

export function updateAuctionSubmit() {
  return createAction(types.UPDATE_AUCTION_SUBMIT);
}

export function saveDialogOpen(value) {
  return createAction(types.UPDATE_AUCTION_DIALOG_OPEN, value);
}

export function uploadAuctionBannerSuccess(json) {
  return createAction(types.UPLOAD_AUCTION_BANNER_SUCCESS, { json });
}

export function uploadAuctionBannerError(errorMsg) {
  return createAction(types.UPLOAD_AUCTION_BANNER_ERROR, errorMsg);
}

export function uploadAuctionBannerSubmit() {
  return createAction(types.UPLOAD_AUCTION_BANNER_SUBMIT);
}
