import {
  call,
  put,
  select
} from 'redux-saga/effects';
import * as C from '../constants';
import * as types from '../actions/action-types';
import * as Api from '../../Shared/lib/api';
import {
  auctionsError,
  auctionsSuccess
} from '../actions/auctions';
import {
  loadSelectedAuctionError,
  loadSelectedAuctionSuccess,
  getLastWinnigBidEmailStatusSuccess,
  getLastWinnigBidEmailStatusError
} from '../actions/auction';
import {
  createSagaWatchers
} from '../../Shared/lib/util';
import {
  getBaseUrlState,
  getSelectedAuctionSaleNumber
} from '../selectors';


// === Watchers ===
export const auctionsWatchers = createSagaWatchers({
  [types.AUCTIONS_REQUESTED]: auctionsWorker,
  [types.GET_WINNER_BID_EMAIL_STATUS_SUBMIT]: getLastWinnigBidEmailStatusWorker
});

export const loadAuctionWatchers = createSagaWatchers({
  [types.LOAD_SELECTED_AUCTION_SUBMIT]: loadAuctionWorker
});

// === Workers ===
export function* auctionsWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const response = yield call(Api.auctions, baseUrl);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(auctionsError(json));
    return;
  }

  yield put(auctionsSuccess(json));
}

export function* loadAuctionWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const saleNumber = yield select(getSelectedAuctionSaleNumber);

  const response = yield call(Api.getAuction, baseUrl, saleNumber);
  const { hasError, json, statusCode } = response;

  // console.log('Response: ', json);
  if (hasError || statusCode !== 200) {
    yield put(loadSelectedAuctionError(json));
    return;
  }

  yield put(loadSelectedAuctionSuccess(json));
}

export function* getLastWinnigBidEmailStatusWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber);
  const response = yield call(Api.getLastWinnigBidEmailStatus, baseUrl, selectedSaleNumber);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(getLastWinnigBidEmailStatusError(json));
    return;
  }

  yield put(getLastWinnigBidEmailStatusSuccess(json));
}
