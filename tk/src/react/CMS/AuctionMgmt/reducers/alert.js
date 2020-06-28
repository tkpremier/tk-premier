'use strict'

import * as types from '../actions/action-types'
import * as C from '../constants'
import { alert as initialState } from '../initial-state'

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_ALERTS:
      return {
        ...state,
        message: '',
        snackbarOpen: false,
        type: ''
      }

    case types.LOAD_SELECTED_AUCTION_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERTS.LOAD_SELECTED_AUCTION_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPDATE_AUCTION_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ERROR.AUCTION_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPDATE_AUCTION_SUCCESS_ALERT:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPDATE_LOT_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.LOT_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPDATE_LOT_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ERROR.LOT_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPLOAD_IOSDESKTOPBANNER_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPLOAD_IOSMOBILEBANNER_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPLOAD_CATALOG_COVER_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.UPLOAD_IOSDESKTOPBANNER_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.IMAGE_UPLOADED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPLOAD_IOSMOBILEBANNER_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.IMAGE_UPLOADED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPLOAD_CATALOG_COVER_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.IMAGE_UPLOADED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPLOAD_SALE_RESULTS_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.FILE_UPLOADED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPLOAD_SALE_RESULTS_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.payload.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.CLOUDINARY_UPLOAD_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.payload.json.message !== undefined ? action.payload.json.message : C.ERROR.UNKNOWN,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.CLOUDINARY_UPLOAD_FINISHED:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.CLOUDINARY_FINISHED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.THUMBNAIL_UPDATE_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.payload.json.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.THUMBNAIL_UPDATE_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.THUMBNAILS_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.LOTS_GET_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.payload.form_error.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.CLOUDINARY_LOT_UPLOAD_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.CLOUDINARY_FINISHED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.CLOUDINARY_LOT_UPLOAD_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.payload.json.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.MIGRATE_PREVIEW_TO_STAGING_SUCCESS_ALERT:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.HIGHLIGHTS_MIGRATE_FROM_PREVIEW_TO_PROD_SUCCESS_ALERT:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.HIGHLIGHTS_MIGRATE_FROM_PREVIEW_TO_PROD_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: action.message,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.HIGHLIGHTS_GET_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERTS.HIGHLIGHTS_GET_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.HIGHLIGHTS_SAVE_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERTS.HIGHLIGHTS_SAVE_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    case types.HIGHLIGHTS_SAVE_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.HIGHLIGHT_UPDATED,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPLOAD_WINNER_BID_EMAIL_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.WINNER_BID_EMAIL_SENT,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPLOAD_WINNER_BID_EMAIL_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERTS.WINNER_BID_EMAIL_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    // case types.GET_AUCTION_MOBILITY_SALE_ERROR:
    //   return {
    //     ...state,
    //     type: C.ALERT_TYPES.ERROR,
    //     message: C.ALERTS.GET_AUCTION_MOBILITY_SALE_ERROR,
    //     snackbarOpen: true,
    //     snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
    //   }

    case types.UPDATE_AUCTION_MOBILITY_SALE_SUCCESS:
      return {
        ...state,
        type: C.ALERT_TYPES.SUCCESS,
        message: C.ALERTS.UPDATE_AUCTION_MOBILITY_SALE_SUCCESS,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.SUCCESS
      }

    case types.UPDATE_AUCTION_MOBILITY_SALE_ERROR:
      return {
        ...state,
        type: C.ALERT_TYPES.ERROR,
        message: C.ALERTS.UPDATE_AUCTION_MOBILITY_SALE_ERROR,
        snackbarOpen: true,
        snackbarStatus: C.SNACKBAR_ALERT_STATUS.ERROR
      }

    default:
      return state
  }
}

export default alert
