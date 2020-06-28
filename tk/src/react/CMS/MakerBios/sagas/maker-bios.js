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
  makerBiosRequested,
  makerBiosSuccess,
  makerBiosError,
  makerBioUpdateSuccess,
  makerBioUpdateError,
  makerBioDeleteSuccess,
  makerBioDeleteError
} from '../actions/maker-bios'
import {
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  getBaseUrlState,
  getSelectedMakerBio,
  getSelectedMakerId
} from '../selectors'


// === Watchers ===
export const getMakerBiosWatchers = createSagaWatchers({
  [types.GET_MAKER_BIOS_SUBMIT]: getMakerBiosWorker
})

export const updateMakerBioWatchers = createSagaWatchers({
  [types.UPDATE_MAKER_BIO_SUBMIT]: updateMakerBioWorker
})

// export const deleteMakerBioWatchers = createSagaWatchers({
//   [types.DELETE_MAKER_BIO_SUBMIT]: deleteMakerBioWorker
// })

// === Workers ===
export function* getMakerBiosWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const response = yield call(Api.getMakerBios, baseUrl)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(makerBiosError(json))
    return
  }

  yield put(makerBiosSuccess(json))
}

export function* updateMakerBioWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedMakerBio = yield select(getSelectedMakerBio)
  const selectedMakerId = yield select(getSelectedMakerId)

  const response = yield call(
    Api.updateMakerBio,
    baseUrl,
    selectedMakerId,
    selectedMakerBio
  )
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(makerBioUpdateError(json))
    return
  }

  yield put(makerBioUpdateSuccess(json))
  yield put(makerBiosRequested())
}

// export function* deleteMakerBioWorker() {
//   const baseUrl = yield select(getBaseUrlState)
//   const makerId = yield select(getSelectedMakerId)
//   const response = yield call(Api.deleteMakerBio, baseUrl, makerId)
//   const { hasError, json, statusCode } = response
//
//   if (hasError || statusCode !== 200) {
//     yield put(makerBioDeleteError(json))
//     return
//   }
//
//   yield put(makerBioDeleteSuccess(json))
//   yield put(makerBiosRequested())
// }
