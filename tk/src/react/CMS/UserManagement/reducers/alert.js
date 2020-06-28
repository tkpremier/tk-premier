import * as types from '../actions/action-types'
import * as C from '../constants'
import { alert as initialState } from '../initial-state'

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.BIDS_LOGIN_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.BIDS_LOGIN_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    // case types.GET_USERS_ERROR:
    //   return {
    //     ...state,
    //     type: C.ALERT_TYPES.ERROR,
    //     message: C.ALERT_MESSAGES.USERS_LOAD_ERROR,
    //     snackbarOpen: true,
    //     snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
    //   }

    case types.UPDATE_USER_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.SAVING_USER
      }

    case types.GET_USER_DETAILS_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.USER_LOAD_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.USER_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.USER_SAVE_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.GET_COUNTRIES_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.GET_COUNTRIES_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.GET_STATES_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.GET_STATES_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
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
