'use strict'

import * as types from '../actions/action-types'
import { selectedCacheEndpoint as initialState } from '../initial-state'

const selectedCacheEndpoint = (state = initialState, action) => {
  switch (action.type) {    
    case types.SET_SELECTED_CACHE_ENDPOINT:
      return {
        ...state,
        ...action.endpoint
      }
    default:
      return state
  }
}

export default selectedCacheEndpoint