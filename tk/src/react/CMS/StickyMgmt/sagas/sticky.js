'use strict'

import {
  call,
  put,
  select
} from 'redux-saga/effects'
import * as types from '../actions/action-types'
import * as Api from '../../Shared/lib/api'
import {
  editSticky,
  stickyError,
  saveStickySuccess,
  setSelectedSticky,
  stickyImageSuccess
} from '../actions/sticky'
import {
  createErrorMsg,
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  getBaseUrlState,
  getSelectedSticky,
  getStickyIdToDelete,
  getStickyImageToUpload,
  getStickyToReorder
} from '../selectors.js'

import * as C from '../constants'

// === Watchers ===
export const stickyWatchers = createSagaWatchers({
  [types.STICKY_DELETE_SUMBIT]: stickyDeleteWorker,
  [types.STICKY_IMAGE_SUMBIT]: stickyImageUploadWorker,
  [types.STICKY_REORDER_SUBMIT]: stickyReorderWorker,
  [types.STICKY_REQUEST]: stickyRequestWorker,
  [types.STICKY_UPDATE_SUMBIT]: stickyUpdateWorker
})

// === Workers ===
export function* stickyDeleteWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const id = yield select(getStickyIdToDelete)
  const response = yield call(Api.deleteSticky, baseUrl, id)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(stickyError(json))
    return
  }

  yield put(saveStickySuccess(json, C.ALERT_MESSAGES.STICKY_DELETED))
}
export function* stickyImageUploadWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedStickyImage = yield select(getStickyImageToUpload)
  const response = yield call(Api.styckyImageUpdate, baseUrl, selectedStickyImage)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(stickyError(json))
    return
  }
    yield put(editSticky('source', json.imagePath))

  yield put(stickyImageSuccess())
}

export function* stickyReorderWorker(){
  const baseUrl = yield select(getBaseUrlState)
  const stickyToReorder = yield select(getStickyToReorder)
  const response = yield call(Api.styckyPositionUpdate, baseUrl, stickyToReorder)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(stickyError(C.ALERT_MESSAGES.STICKY_POSITION_UPDATE_ERROR))
    return
  }

  yield put(saveStickySuccess(json, C.ALERT_MESSAGES.STICKY_POSITION_UPDATED))
}

export function* stickyRequestWorker() {
  const baseUrl = yield select(getBaseUrlState)

  const response = yield call(Api.auctions, baseUrl)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(stickyError(json))
    return
  }

  yield put(getStickySuccess(json))
}
export function* stickyUpdateWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedSticky = yield select(getSelectedSticky)
  const response = yield call(Api.styckyUpdate, baseUrl, selectedSticky)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(stickyError(json))
    return
  }
  yield put(setSelectedSticky(json.modifiedSticky))

  yield put(saveStickySuccess(json.stickies, C.ALERT_MESSAGES.STICKY_SAVED))
}
