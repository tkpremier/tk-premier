'use strict'

import * as types from '../actions/action-types'
import { stickies as initialState } from '../initial-state'

const stickies = (state = initialState, action) => {
  switch (action.type) {
    case types.STICKY_REQUEST_SUCCESS:
    case types.STICKY_UPDATE_SUCCESS:
      return action.stickies
    default:
      return state
  }
}

export default stickies