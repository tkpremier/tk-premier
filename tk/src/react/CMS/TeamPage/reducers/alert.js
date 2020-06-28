import * as types from '../actions/action-types'
import * as C from '../constants'
import { alert as initialState } from '../initial-state'

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TEAM_MEMBERS_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.TEAM_MEMBERS_LOAD_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPDATE_TEAM_MEMBER_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.SAVING_TEAM_MEMBER
      }

    case types.UPDATE_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.TEAM_MEMBER_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.DELETE_TEAM_MEMBER_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.TEAM_MEMBER_DELETE_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.DELETE_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.TEAM_MEMBER_DELETED,
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
