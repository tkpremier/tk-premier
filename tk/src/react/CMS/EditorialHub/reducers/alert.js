import * as types from '../actions/action-types'
import * as C from '../constants'
import { alert as initialState } from '../initial-state'

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EDITORIALS_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.EDITORIALS_LOAD_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPDATE_EDITORIAL_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.SAVING_EDITORIAL
      }

    case types.UPDATE_EDITORIAL_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.EDITORIAL_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPDATE_EDITORIAL_ARTICLES_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.SAVING_EDITORIAL
      }

    case types.UPDATE_EDITORIAL_ARTICLES_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.EDITORIAL_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.DELETE_EDITORIAL_ARTICLE_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.EDITORIAL_DELETE_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.DELETE_EDITORIAL_ARTICLE_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.EDITORIAL_DELETED,
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
