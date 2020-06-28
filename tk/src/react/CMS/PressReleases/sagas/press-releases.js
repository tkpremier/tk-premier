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
  pressReleasesRequested,
  pressReleasesSuccess,
  pressReleasesError,
  pressReleaseArticleSuccess,
  pressReleaseArticleError,
  pressReleaseArticleUpdateSuccess,
  pressReleaseArticleUpdateError,
  pressReleaseArticleDeleteSuccess,
  pressReleaseArticleDeleteError,
  uploadPressReleasePDFSuccess,
  uploadPressReleasePDFError
} from '../actions/press-releases'
import {
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  getBaseUrlState,
  getSelectedPressRelease,
  getSelectedPressReleaseId,
  getSelectedPressReleaseTitle,
  getPressReleasePDF
} from '../selectors'


// === Watchers ===
export const getPressReleasesWatchers = createSagaWatchers({
  [types.GET_PRESS_RELEASES_SUBMIT]: getPressReleasesWorker
})

export const getPressReleaseArticleWatchers = createSagaWatchers({
  [types.GET_PRESS_RELEASE_ARTICLE_SUBMIT]: getPressReleaseArticleWorker
})

export const updatePressReleaseArticleWatchers = createSagaWatchers({
  [types.UPDATE_PRESS_RELEASE_ARTICLE_SUBMIT]: updatePressReleaseArticleWorker
})

export const deletePressReleaseArticleWatchers = createSagaWatchers({
  [types.DELETE_PRESS_RELEASE_ARTICLE_SUBMIT]: deletePressReleaseArticleWorker
})

export const uploadPressReleasePDFWatchers = createSagaWatchers({
  [types.UPLOAD_PRESS_RELEASE_PDF_SUBMIT]: uploadPressReleasePDFWorker
})

// === Workers ===
export function* getPressReleasesWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const response = yield call(Api.pressReleases, baseUrl)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(pressReleasesError(json))
    return
  }

  yield put(pressReleasesSuccess(json))
}

export function* getPressReleaseArticleWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const pressReleaseId = yield select(getSelectedPressReleaseId)
  const response = yield call(Api.pressReleaseArticle, baseUrl, pressReleaseId)
  const { hasError, json, statusCode } = response

  console.log('Get press releases: ', response)


  if (hasError || statusCode !== 200) {
    yield put(pressReleaseArticleError(json))
    return
  }

  yield put(pressReleaseArticleSuccess(json))
}

export function* updatePressReleaseArticleWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedPressRelease = yield select(getSelectedPressRelease)

  const response = yield call(
    Api.updatePressRelease,
    baseUrl,
    selectedPressRelease
  )
  const { hasError, json, statusCode } = response

  console.log('update press release: ', selectedPressRelease, response)

  if (hasError || statusCode !== 200) {
    yield put(pressReleaseArticleUpdateError(json))
    return
  }

  yield put(pressReleaseArticleUpdateSuccess(json))
  yield put(pressReleasesRequested())
}

export function* deletePressReleaseArticleWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const pressReleaseId = yield select(getSelectedPressReleaseId)
  const response = yield call(Api.deletePressRelease, baseUrl, pressReleaseId)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(pressReleaseArticleDeleteError(json))
    return
  }

  yield put(pressReleaseArticleDeleteSuccess(json))
  yield put(pressReleasesRequested())
}

export function* uploadPressReleasePDFWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const pressReleasePDF = yield select(getPressReleasePDF)
  const title = yield select(getSelectedPressReleaseTitle)

  const response = yield call(
    Api.uploadPressReleasePDF,
    baseUrl,
    pressReleasePDF,
    title
  )
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(uploadPressReleasePDFError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(uploadPressReleasePDFSuccess(json))
  yield put(pressReleasesRequested())
}
