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
  tagsGetError,
  tagsGetSuccess,
} from '../actions/tags'
import {
  createErrorMsg,
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  getBaseUrlState,
  getSelectedAuctionSaleNumber
} from '../selectors'


// === Watchers ===
export const tagsGetWatchers = createSagaWatchers({
  [types.TAGS_GET_SUBMIT]: tagsGetWorker
})

// === Workers ===
export function* tagsGetWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)

  const response = yield call(Api.tagsGet, baseUrl, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(tagsGetError(json))
    return
  }

  yield put(tagsGetSuccess(json))
}
