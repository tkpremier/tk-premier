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
  highlightsGetSubmit,
  highlightsGetSuccess,
  highlightGetError,
  highlightsSaveSubmit,
  highlightsSaveSuccess,
  highlightsSaveError,
  highlightsDeleteSuccess,
  highlightsDeleteError,
  highlightsImageUploadSuccess,
  highlightsImageUploadError,
  highlightsPushToProdSuccess,
  highlightsPushToProdError,
  highlightsMigratePreviewtoProductionSuccess,
  highlightsMigratePreviewtoProductionError
} from '../actions/highlights'
import { auctionsRequested } from '../actions/auctions'
import { highlightsMigratePreviewToStagingAlert } from '../actions/alerts'
import {
  createErrorMsg,
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  // getState,
  getBaseUrlState,
  getSelectedAuctionState,
  getSelectedAuctionSaleNumber,
  getSelectedHighlight,
  getSelectedHighlightId,
  getHighlightsImageUpload
} from '../selectors'

// === Watchers ===
export const getHighlightsWatchers = createSagaWatchers({
  [types.HIGHLIGHTS_GET_SUBMIT]: getHighlightsWorker,
})

export const saveHighlightsWatchers = createSagaWatchers({
  [types.HIGHLIGHTS_SAVE_SUBMIT]: saveHighlightsWorker,
})

export const deleteHighlightsWatchers = createSagaWatchers({
  [types.HIGHLIGHTS_DELETE_SUBMIT]: deleteHighlightsWorker,
})

export const imageUploadHighlightsWatchers = createSagaWatchers({
  [types.HIGHLIGHTS_IMAGE_UPLOAD_SUBMIT]: imageUploadHighlightsWorker,
})

export const highlightsPushToProdWatchers = createSagaWatchers({
  [types.HIGHLIGHTS_PUSH_TO_PROD_SUBMIT]: highlightsPushToProdWorker,
})

export const highlightsMigratePreviewToStagingWatchers = createSagaWatchers({
  [types.HIGHLIGHTS_MIGRATE_FROM_PREVIEW_TO_PROD_SUBMIT]: highlightsMigratePreviewToStagingWorker,
})


// === Workers ===
export function* getHighlightsWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)

  const response = yield call(Api.getAuctionHighlights, baseUrl, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(highlightGetError({ message: errorMsg }))
    return
  }

  yield put(highlightsGetSuccess(json))
}

export function* saveHighlightsWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedHighlight = yield select(getSelectedHighlight)

  const response = yield call(Api.saveAuctionHighlight, baseUrl, selectedHighlight)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(highlightsSaveError(json.message))
    return
  }

  yield put(highlightsSaveSuccess(json))
}

export function* deleteHighlightsWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedHighlightId = yield select(getSelectedHighlightId)

  const response = yield call(Api.deleteAuctionHighlights, baseUrl, selectedHighlightId)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(highlightsDeleteError(json.message))
    return
  }

  yield put(highlightsDeleteSuccess(json))
}

export function* imageUploadHighlightsWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)
  const image = yield select(getHighlightsImageUpload)

  const response = yield call(Api.uploadHighlightImage, baseUrl, image, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(highlightsImageUploadError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(highlightsImageUploadSuccess(json))
  yield put(highlightsSaveSubmit())
}

export function* highlightsPushToProdWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)

  const response = yield call(Api.pushHighlightsToProd, baseUrl, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(highlightsPushToProdError(json.message))
    return
  }

  yield put(highlightsPushToProdSuccess(json))
}

export function* highlightsMigratePreviewToStagingWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)

  const response = yield call(Api.highlightsMigratePreviewToStaging, baseUrl, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(highlightsMigratePreviewtoProductionError(json.form_error.message))
    return
  }

  yield put(highlightsMigratePreviewToStagingAlert(json.result))
  yield put(highlightsGetSubmit())
}
