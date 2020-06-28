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
  lotsGetError,
  lotsGetSuccess,
} from '../actions/lots'
import {
  createErrorMsg,
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  getBaseUrlState,
  getSelectedAuctionSaleNumber
} from '../selectors'


// === Watchers ===
export const lotsGetWatchers = createSagaWatchers({
  [types.LOTS_GET_SUBMIT]: lotsGetWorker
})

// === Workers ===
export function* lotsGetWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)

  const response = yield call(Api.lotsGet, baseUrl, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(lotsGetError(json))
    return
  }

  yield put(lotsGetSuccess(json))
}
