'use strict'

import {
  call,
  put,
  select
} from 'redux-saga/effects'
import * as C from '../constants'
import * as types from '../actions/action-types'
import * as Api from '../../Shared/lib/api'
import {
  uploadSaleResultsSuccess,
  uploadSaleResultsError,
  uploadWinnerBidEmailSuccess,
  uploadWinnerBidEmailError
} from '../actions/upload-file'
import {
  createSagaWatchers,
} from '../../Shared/lib/util'
import {
  // getState,
  getBaseUrlState,
  getUploadFile,
  getSelectedAuctionSaleNumber
} from '../selectors'

// === Watchers ===
export const uploadSaleResultsWatchers = createSagaWatchers({
  [types.UPLOAD_SALE_RESULTS_SUBMIT]: uploadSaleResultsWorker
})
export const uploadWinnerEmailWatchers = createSagaWatchers({
  [types.UPLOAD_WINNER_BID_EMAIL_SUBMIT]: uploadWinnerBidEmailWorker
})
// === Workers ===
export function* uploadSaleResultsWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const { auctionResultsFile } = yield select(getUploadFile)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)

  const response = yield call(Api.uploadSalesResults, baseUrl, auctionResultsFile, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(uploadSaleResultsError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(uploadSaleResultsSuccess(json))
}

export function* uploadWinnerBidEmailWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const { winnerBidEmailFile } = yield select(getUploadFile)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)

  const response = yield call(Api.uploadWinnerBidEmailResults, baseUrl, winnerBidEmailFile, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(uploadWinnerBidEmailError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(uploadWinnerBidEmailSuccess(json))
}