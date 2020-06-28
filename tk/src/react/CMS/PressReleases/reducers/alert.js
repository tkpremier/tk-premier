import * as types from '../actions/action-types'
import * as C from '../constants'
import { alert as initialState } from '../initial-state'

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRESS_RELEASES_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.PRESS_RELEASES_LOAD_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.GET_PRESS_RELEASE_ARTICLE_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.PRESS_RELEASE_LOAD_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPDATE_PRESS_RELEASE_ARTICLE_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.SAVING_PRESS_RELEASE
      }

    case types.UPDATE_PRESS_RELEASE_ARTICLE_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.PRESS_RELEASE_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPDATE_PRESS_RELEASE_ARTICLE_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.payload.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }      

    case types.DELETE_PRESS_RELEASE_ARTICLE_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.PRESS_RELEASE_DELETE_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.DELETE_PRESS_RELEASE_ARTICLE_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.PRESS_RELEASE_DELETED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPLOAD_PRESS_RELEASE_PDF_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.PRESS_RELEASE_PDF_UPLOAD_SUCCESS,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPLOAD_PRESS_RELEASE_PDF_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.payload.message,
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
