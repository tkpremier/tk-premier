'use strict'

import * as types from '../actions/action-types'
import { stickyReorder as initialState } from '../initial-state'

const stickyImage = (state = initialState, action) => {
  switch (action.type) {
    case types.STICKY_REORDER_SUBMIT:
      return {
        ...state,
        ...action.stickyReorder,
      }
    
    default:
      return state
  }
}

export default stickyImage