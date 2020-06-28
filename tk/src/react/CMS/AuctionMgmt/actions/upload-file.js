import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function uploadSaleResultsSuccess(json) {
  return createAction(types.UPLOAD_SALE_RESULTS_SUCCESS, { json });
}

export function uploadSaleResultsError(errorMsg) {
  return createAction(types.UPLOAD_SALE_RESULTS_ERROR, errorMsg);
}

export function uploadSaleResultsSubmit() {
  return createAction(types.UPLOAD_SALE_RESULTS_SUBMIT);
}

export function uploadWinnerBidEmailSuccess(json) {
  return createAction(types.UPLOAD_WINNER_BID_EMAIL_SUCCESS, { json });
}

export function uploadWinnerBidEmailError(errorMsg) {
  return createAction(types.UPLOAD_WINNER_BID_EMAIL_ERROR, errorMsg);
}

export function handleSendWinnerBidEmail() {
  return createAction(types.UPLOAD_WINNER_BID_EMAIL_SUBMIT);
}