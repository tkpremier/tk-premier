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
  thumbnailUpdateSuccess,
  thumbnailUpdateError,
  cloudinaryUploadSuccess,
  cloudinaryUploadError,
  cloudinaryGetUploadStatusSuccess,
  cloudinaryGetUploadStatusError
} from '../actions/cloudinary-upload'
import {
  createErrorMsg,
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  getBaseUrlState,
  getSaleNumber
} from '../selectors'

// === Watchers ===
export const cloudinaryUploadTriggerWatchers = createSagaWatchers({
  [types.CLOUDINARY_UPLOAD_TRIGGER]: cloudinaryUploadTriggerWorker,
})

// export const cloudinaryGetUploadStatusWatchers = createSagaWatchers({
//   [types.CLOUDINARY_GET_UPLOAD_STATUS]: cloudinaryGetUploadStatusWorker,
// })

export const thumbnailUpdateWatchers = createSagaWatchers({
  [types.THUMBNAIL_UPDATE]: thumbnailUpdateWorker,
})


// === Workers ===
export function* cloudinaryUploadTriggerWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const saleNumber = yield select(getSaleNumber)

  const response = yield call(Api.cloudinaryUpload, baseUrl, saleNumber)
  const { json, statusCode, hasError } = response

  if (hasError || statusCode !== 200 || json.status === 'Error') {
    yield put(cloudinaryUploadError({ message: json.message, cloudinaryDialogOpen: false }))
    return
  }

  yield put(cloudinaryUploadSuccess({ cloudinaryDialogOpen: false }))
}

// export function* cloudinaryGetUploadStatusWorker() {
//   const baseUrl = yield select(getBaseUrlState)
//
//   const response = yield call(Api.getSaleUploadStatus, baseUrl)
//   const { hasError, json } = response
//   console.log('cloudinary get upload status: ', response)
//   if (hasError) {
//     const errorMsg = createErrorMsg(json, C.ERROR)
//     yield put(cloudinaryGetUploadStatusError({message: errorMsg}))
//     return
//   }
//
//   yield put(cloudinaryGetUploadStatusSuccess({ cloudinaryUploadQueue: false, ...json }))
// }

export function* thumbnailUpdateWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const saleNumber = yield select(getSaleNumber)

  const response = yield call(Api.thumbnailUpdate, baseUrl, saleNumber)
  const { hasError } = response

  if (hasError) {
    // This is the kludgy workaround until the endpoint can be fixed
    // it returns an error no matter what, but success arrives later.
    yield put(thumbnailUpdateSuccess({ thumbnailDialogOpen: false }))

    // send to Sentry
    // const errorMsg = createErrorMsg(json, C.ERROR)
    // yield put(thumbnailUpdateError({message: errorMsg}))
    // return
  }

  // yield put(thumbnailUpdateSuccess(json))
}
