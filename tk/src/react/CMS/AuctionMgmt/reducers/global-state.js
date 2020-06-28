'use strict'

import * as types from '../actions/action-types'
import { globalState as initialState } from '../initial-state'

const globalState = (state = initialState, action) => {
  switch (action.type) {
    case types.APP_INIT:
      return {
        ...state
      }

    case types.APP_BASE_URL:
      return {
        ...state,
        baseUrl: action.baseUrl
      }

    default:
      return state
  }
}

export default globalState
