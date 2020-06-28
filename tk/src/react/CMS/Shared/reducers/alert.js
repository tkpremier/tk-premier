'use strict'

import * as types from '../actions/action-types'
import * as C from '../constants'
import { alert as initialState } from '../initial-state'

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.STICKY_DELETE_SUMBIT:
        return {
          ...state,
          type: C.ALERT_TYPES.DELETING_STICKY
        }
    case types.STICKY_UPDATE_SUMBIT:
      return {
        ...state,
        type: C.ALERT_TYPES.SAVING_STICKY
      }
    case types.STICKY_IMAGE_SUMBIT:
      return {   
        ...state,     
        type: C.ALERT_TYPES.SAVING_STICKY_IMAGE
      }
    case types.STICKY_UPDATE_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }
    case types.STICKY_IMAGE_SUCCESS:
      return {
        ...state,
        message: C.ALERT_MESSAGES.STICKY_IMAGE_UPDATED,        
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