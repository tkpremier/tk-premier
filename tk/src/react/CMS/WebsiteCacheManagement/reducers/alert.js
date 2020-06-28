'use strict'

import * as types from '../actions/action-types'
import * as C from '../constants'
import { alert as initialState } from '../initial-state'

const alert = (state = initialState, action) => {
  switch (action.type) {    
    case types.CACHE_PURGE_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.CACHE_PURGING,
      }
    case types.CACHE_PURGE_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }
    case types.CACHE_PURGE_SUCCESS:
      return {
        ...state,
        message: action.message,        
        type: C.ALERT_TYPES.SUCCESS,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }
    case types.CLEAR_ALERTS:
      return {
        ...state,
        message: '',
        snackbarOpen: false,
        type: ''
      }
    default:
      return state
  }
}

export default alert