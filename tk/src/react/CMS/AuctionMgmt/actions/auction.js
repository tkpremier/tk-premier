import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

export function loadSelectedAuctionSuccess(json) {
  return createAction(types.LOAD_SELECTED_AUCTION_SUCCESS, { json });
}

export function loadSelectedAuctionError(errorMsg) {
  return createAction(types.LOAD_SELECTED_AUCTION_ERROR, errorMsg);
}

export function loadSelectedAuctionRequested() {
  return createAction(types.LOAD_SELECTED_AUCTION_SUBMIT);
}

export const selectAuction = selectedAuction => ({
  type: types.AUCTION_SELECTED,
  ...selectedAuction
});

export const editDetails = (editedField, edit) => ({
  type: types.EDIT_AUCTION_FIELD,
  editedField,
  edit
});

export const auctionEdited = edited => ({
  type: types.AUCTION_EDITED,
  edited
});

export const getLastWinnigBidEmailStatusSubmit = () => ({
  type: types.GET_WINNER_BID_EMAIL_STATUS_SUBMIT
});

export function getLastWinnigBidEmailStatusSuccess(json) {
  return createAction(types.GET_WINNER_BID_EMAIL_STATUS_SUCCESS, { json });
}

export const getLastWinnigBidEmailStatusError = () => ({
  type: types.GET_WINNER_BID_EMAIL_STATUS_ERROR
});


export const editAuctionsDisplayList = auctionsList => ({
  type: types.EDIT_AUCTIONS_DISPLAY_LIST,
  auctionsList
});

export const setDepartmentList = departments => ({
  type: types.SET_DEPARTMENT_LIST,
  departments
});
