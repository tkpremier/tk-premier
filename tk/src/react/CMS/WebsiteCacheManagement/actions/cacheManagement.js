'use strict'

import * as types from './action-types'

export const purgeCache = () => ({
  type: types.CACHE_PURGE_SUBMIT
})

export const purgeCacheSuccess = (message) => ({
  type: types.CACHE_PURGE_SUCCESS,
  message
})

export const purgeCacheError = (message) => ({
  type: types.CACHE_PURGE_ERROR,
  message
})

export const setSelectedCacheEndpoint = (item) => ({
    type: types.SET_SELECTED_CACHE_ENDPOINT,
    endpoint: item
})