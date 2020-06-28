'use strict'

import {
  call,
  put,
  select
} from 'redux-saga/effects'
import * as types from '../actions/action-types'
import * as Api from '../../Shared/lib/api'
import {
  purgeCacheError,
  purgeCacheSuccess
} from '../actions/cacheManagement'
import {
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  getWebsiteUrl,
  getSelectedCacheEndpoint
} from '../selectors.js'

import * as C from '../constants'

// === Watchers ===
export const websiteCacheManagementWatchers = createSagaWatchers({  
  [types.CACHE_PURGE_SUBMIT]: websiteCachePurgeWorker
})

// === Workers ===
export function* websiteCachePurgeWorker() {
  const baseUrl = yield select(getWebsiteUrl)
  const selectedCacheEndpoint = yield select(getSelectedCacheEndpoint)
  const response = yield call(Api.websiteCachePurge, baseUrl, selectedCacheEndpoint)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200 || json.Error) {
    yield put(purgeCacheError(`${json.Detail} - ${json.DateTime}`))
    return
  }
  yield put(purgeCacheSuccess(`${json.Detail} - ${json.DateTime}`))
}
