'use strict'

import * as types from '../actions/action-types'
import { stickyImage as initialState } from '../initial-state'

const stickyImage = (state = initialState, action) => {
  switch (action.type) {
    case types.STICKY_IMAGE_SUMBIT:
      return {
        ...state,
        ...action.image,
      }
    
    default:
      return state
  }
}

export default stickyImage