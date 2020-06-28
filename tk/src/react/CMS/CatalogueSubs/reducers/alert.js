import * as types from '../actions/action-types'
import * as C from '../constants'
import { alert as initialState } from '../initial-state'

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATALOG_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.CATALOGUE_SUBSCRIPTIONS_LOAD_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPDATE_CATALOG_SUBSCRIPTIONS_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.SAVING_CATALOGUE
      }

    case types.UPDATE_CATALOG_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.CATALOGUE_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.REORDER_DEPARTMENTS_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.REORDERING_DEPARTMENT
      }

    case types.REORDER_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.DEPARTMENTS_REORDERED,
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
