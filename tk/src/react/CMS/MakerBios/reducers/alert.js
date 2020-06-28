import * as types from '../actions/action-types'
import * as C from '../constants'
import { alert as initialState } from '../initial-state'

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MAKER_BIOS_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.MAKER_BIOS_LOAD_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPDATE_MAKER_BIO_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.SAVING_MAKER_BIO
      }

    case types.UPDATE_MAKER_BIO_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.MAKER_BIO_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPDATE_MAKER_BIO_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.payload.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    // case types.DELETE_MAKER_BIO_ERROR:
    //   return {
    //     ...state,
    //     type: C.ALERT_TYPES.ERROR,
    //     message: C.ALERT_MESSAGES.MAKER_BIO_DELETE_ERROR,
    //     snackbarOpen: true,
    //     snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
    //   }
    //
    // case types.DELETE_MAKER_BIO_SUCCESS:
    //   return {
    //     ...state,
    //     type: C.ALERT_TYPES.SUCCESS,
    //     message: C.ALERT_MESSAGES.MAKER_BIO_DELETED,
    //     snackbarOpen: true,
    //     snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
    //   }

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
