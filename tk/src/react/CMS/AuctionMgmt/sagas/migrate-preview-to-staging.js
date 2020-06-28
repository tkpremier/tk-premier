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
  migratePreviewToStagingSuccess,
  migratePreviewToStagingError
} from '../actions/migrate-preview-to-staging'
import { auctionsRequested } from '../actions/auctions'
import { migratePreviewToStagingAlert } from '../actions/alerts'
import {
  createErrorMsg,
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  // getState,
  getBaseUrlState,
  getSelectedAuctionState,
  getSaleNumberToMigrate
} from '../selectors'

// === Watchers ===
export const migratePreviewToStagingWatchers = createSagaWatchers({
  [types.MIGRATE_PREVIEW_TO_STAGING_SUBMIT]: migratePreviewToStagingWorker,
})


// === Workers ===
export function* migratePreviewToStagingWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const selectedAuction = yield select(getSaleNumberToMigrate)
  const response = yield call(Api.migratePreviewToStaging, baseUrl, selectedAuction)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(migratePreviewToStagingError())
    return
  }

  yield put(migratePreviewToStagingSuccess(json))
  yield put(migratePreviewToStagingAlert(C.ALERTS.MIGRATE_PREVIEW_TO_STAGING_FINISHED))
  yield put(auctionsRequested())
}
