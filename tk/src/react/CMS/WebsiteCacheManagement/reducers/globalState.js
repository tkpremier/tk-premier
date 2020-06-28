'use strict'

import * as types from '../actions/action-types'
import { globalState as initialState } from '../initial-state'

const globalState = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default globalState