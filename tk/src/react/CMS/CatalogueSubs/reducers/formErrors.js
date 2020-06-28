'use strict'

import * as types from '../actions/action-types'
import { formErrors as initialState } from '../initial-state'

const formErrors = (state = initialState, action) => {
  switch (action.type) {    
    case types.GET_ERRORS:
      return state
      case types.SET_ERRORS:
      return {
        ...state,
        ...action.formErrors
      }
    default:
      return state
  }
}

export default formErrors