import {
  call,
  put,
  select
} from 'redux-saga/effects';
import * as C from '../constants';
import * as types from '../actions/action-types';
import * as Api from '../../Shared/lib/api';
import {
  getAMSaleSuccess,
  getAMSaleError,
  updateAMSaleSubmit,
  updateAMSaleSuccess,
  updateAMSaleError,
  unlockAMSaleSuccess,
  unlockAMSaleError
} from '../actions/auction-mobility';
import {
  createSagaWatchers
} from '../../Shared/lib/util';
import {
  getBaseUrlState,
  getSelectedAuctionSaleNumber,
  getAMSaleCalendarId,
  getAMSaleIncludeAuctionImage,
  getAMSaleIncludeLotImages,
  getAMSaleIncludeLots,
  getAMSalePublicationStatus,
  getAMSaleDuration,
  getAMSaleBidThreshold
} from '../selectors';


// === Watchers ===
export const getAMSaleWatchers = createSagaWatchers({
  [types.GET_AUCTION_MOBILITY_SALE_SUBMIT]: getAMSaleWorker
});

export const updateAMSaleWatchers = createSagaWatchers({
  [types.UPDATE_AUCTION_MOBILITY_SALE_SUBMIT]: updateAMSaleWorker
});

export const unlockAMSaleWatchers = createSagaWatchers({
  [types.UNLOCK_AUCTION_MOBILITY_SALE_SUBMIT]: unlockAMSaleWorker
});

// === Workers ===
export function* getAMSaleWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const selectedAMSaleNumber = yield select(getSelectedAuctionSaleNumber);

  const response = yield call(Api.getAuctionMobilitySale, baseUrl, selectedAMSaleNumber);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(getAMSaleError(json));
    return;
  }

  yield put(getAMSaleSuccess(json));
}

export function* updateAMSaleWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber);

  const saleCalendarId = yield select(getAMSaleCalendarId);
  const saleIncludeAuctionImage = yield select(getAMSaleIncludeAuctionImage);
  const saleIncludeLotImages = yield select(getAMSaleIncludeLotImages);
  const saleIncludeLots = yield select(getAMSaleIncludeLots);
  const salePublicationStatus = yield select(getAMSalePublicationStatus);
  const saleDuration = yield select(getAMSaleDuration);
  const saleBidThreshold = yield select(getAMSaleBidThreshold);

  const response = yield call(
    Api.getUpsertAuction,
    baseUrl,
    selectedSaleNumber,
    saleCalendarId,
    saleIncludeAuctionImage,
    saleIncludeLotImages,
    saleIncludeLots,
    salePublicationStatus,
    saleDuration,
    saleBidThreshold
  );

  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(updateAMSaleError(json));
    return;
  }

  yield put(updateAMSaleSuccess(json));
}

export function* unlockAMSaleWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber);

  const response = yield call(Api.putResetAuctionMobilityStatus, baseUrl, selectedSaleNumber);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(unlockAMSaleError(json));
    return;
  }

  yield put(unlockAMSaleSuccess(json));
  yield put(updateAMSaleSubmit());
}
