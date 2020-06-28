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
  updateLotError,
  updateLotSuccess,
  cloudinaryLotUploadSuccess,
  cloudinaryLotUploadError
} from '../actions/update-lot'
import { lotsGetSubmit } from '../actions/lots'
import {
  createErrorMsg,
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  getBaseUrlState,
  getSelectedLotState,
  getSelectedAuctionSaleNumber,
  getSelectedLotLotNumber
} from '../selectors'

// === Watchers ===
export const updateLotWatchers = createSagaWatchers({
  [types.UPDATE_LOT_SUBMIT]: updateLotWorker,
})

export const cloudinaryLotUploadWatchers = createSagaWatchers({
  [types.CLOUDINARY_LOT_UPLOAD_SUBMIT]: cloudinaryLotUploadWorker,
})


// === Workers ===
export function* updateLotWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedLot = yield select(getSelectedLotState)
  const response = yield call(Api.lotUpdate, baseUrl, selectedLot)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(updateLotError(json))
    return
  }

  yield put(updateLotSuccess(json))
  yield put(lotsGetSubmit())
}

export function* cloudinaryLotUploadWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)
  const selectedLotLotNumber = yield select(getSelectedLotLotNumber)
  const response = yield call(Api.uploadLotToCloudinary, baseUrl, selectedSaleNumber, selectedLotLotNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(cloudinaryLotUploadError(json))
    return
  }

  yield put(cloudinaryLotUploadSuccess(json))
}
