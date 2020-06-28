import * as types from '../actions/action-types';
import * as C from '../constants';
import { alert as initialState } from '../initial-state';

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LOT_COMPONENTS_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.LOT_COMPONENTS_LOAD_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      };

    case types.UPDATE_LOT_COMPONENT_SUBMIT:
      return {
        ...state,
        type: C.ALERT_TYPES.SAVING_LOT_COMPONENT
      };

    case types.UPDATE_LOT_COMPONENT_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.LOT_COMPONENT_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      };

    case types.UPDATE_LOT_COMPONENT_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.payload.message,
        snackbarOpen: true, // action.payload.message.includes('The Active field is required') ? false :
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      };

    case types.DELETE_LOT_COMPONENT_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERT_MESSAGES.LOT_COMPONENT_DELETE_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      };

    case types.DELETE_LOT_COMPONENT_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERT_MESSAGES.LOT_COMPONENT_DELETED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      };

    case types.CLEAR_ALERTS:
      return {
        ...state,
        message: '',
        snackbarOpen: false,
        type: ''
      };

    default:
      return state;
  }
};

export default alert;
