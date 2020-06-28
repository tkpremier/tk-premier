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
  uploadImageError,
  uploadImageSuccess,
  uploadiOSMobileBannerSuccess,
  uploadiOSMobileBannerError,
  uploadiOSDesktopBannerSuccess,
  uploadiOSDesktopBannerError,
  uploadCatalogCoverSuccess,
  uploadCatalogCoverError
} from '../actions/upload-image'
import {
  uploadAuctionBannerError,
  uploadAuctionBannerSuccess
} from '../actions/update-auction'
import { auctionsRequested } from '../actions/auctions'
import {
  createErrorMsg,
  createSagaWatchers,
  forEachGen
} from '../../Shared/lib/util'
import {
  // getState,
  getBaseUrlState,
  getUploadImage,
  getiOSBannerMobileImage,
  getiOSBannerDesktopImage,
  getCatalogCoverImage,
  getAuctionBannerImage,
  getSelectedAuctionSaleNumber
} from '../selectors'

// === Watchers ===
export const uploadImageWatchers = createSagaWatchers({
  [types.UPLOAD_IMAGE_SUBMIT]: uploadImageWorker
})

export const uploadiOSDesktopBannerWatchers = createSagaWatchers({
  [types.UPLOAD_IOSDESKTOPBANNER_SUBMIT]: uploadiOSDesktopBannerWorker
})

export const uploadiOSMobileBannerWatchers = createSagaWatchers({
  [types.UPLOAD_IOSMOBILEBANNER_SUBMIT]: uploadiOSMobileBannerWorker
})

export const uploadCatalogCoverWatchers = createSagaWatchers({
  [types.UPLOAD_CATALOG_COVER_SUBMIT]: uploadCatalogCoverWorker
})

export const uploadAuctionBannerWatchers = createSagaWatchers({
  [types.UPLOAD_AUCTION_BANNER_SUBMIT]: uploadAuctionBannerWorker,
})

// === Workers ===
export function* uploadImageWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const image = yield select(getUploadImage)
  console.log('Upload Image Worker: ', image)
  const response = yield call(Api.imageUpload, baseUrl, image)
  console.log('Response: ', response)
  const { hasError, json } = response

  if (hasError) {
    yield put(uploadiOSDesktopBannerError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(uploadImageSuccess(json))
  yield put(auctionsRequested())
}

export function* uploadiOSDesktopBannerWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const image = yield select(getiOSBannerDesktopImage)

  const response = yield call(Api.imageUpload, baseUrl, image)
  const { hasError, json } = response

  if (hasError) {
    yield put(uploadImageError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(uploadiOSDesktopBannerSuccess(json))
}

export function* uploadiOSMobileBannerWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const image = yield select(getiOSBannerMobileImage)

  const response = yield call(Api.imageUpload, baseUrl, image)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(uploadiOSMobileBannerError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(uploadiOSMobileBannerSuccess(json))
}

export function* uploadCatalogCoverWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const image = yield select(getCatalogCoverImage)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)

  const response = yield call(Api.uploadPrintCatalogCover, baseUrl, image, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(uploadCatalogCoverError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(uploadCatalogCoverSuccess(json))
}

export function* uploadAuctionBannerWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const image = yield select(getAuctionBannerImage)
  const selectedSaleNumber = yield select(getSelectedAuctionSaleNumber)

  const response = yield call(Api.uploadAuctionBanner, baseUrl, image, selectedSaleNumber)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(uploadAuctionBannerError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(uploadAuctionBannerSuccess(json))
}
