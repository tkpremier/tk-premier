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

export const updateBaseUrl = (url) => {
  return {
    type: types.APP_BASE_URL,
    baseUrl: url
  };
};
