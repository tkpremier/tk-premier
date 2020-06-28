import {
  call,
  put,
  select
} from 'redux-saga/effects';
import * as C from '../constants';
import * as types from '../actions/action-types';
import * as Api from '../../Shared/lib/api';
import {
  updateAuctionError,
  updateAuctionSuccess
} from '../actions/update-auction';
import { auctionsRequested } from '../actions/auctions';
import { updateAuctionSuccessAlert } from '../actions/alerts';
import {
  createSagaWatchers
} from '../../Shared/lib/util';
import {
  // getState,
  getBaseUrlState,
  getSelectedAuctionState
} from '../selectors';

// === Watchers ===
export const updateAuctionWatchers = createSagaWatchers({
  [types.UPDATE_AUCTION_SUBMIT]: updateAuctionWorker
});

// === Workers ===
export function* updateAuctionWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const selectedAuction = yield select(getSelectedAuctionState);
  const response = yield call(Api.auctionUpdate, baseUrl, selectedAuction);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(updateAuctionError());
    return;
  }

  yield put(updateAuctionSuccess(json));
  yield put(updateAuctionSuccessAlert(C.ALERTS.AUCTION_UPDATED));
  yield put(auctionsRequested());
}
