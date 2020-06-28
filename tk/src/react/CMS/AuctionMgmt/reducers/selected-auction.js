'use strict'

import * as types from '../actions/action-types'
import { globalState as initialState } from '../initial-state'

const selectedAuction = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_SELECTED_AUCTION_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.LOAD_SELECTED_AUCTION_SUCCESS:
      console.log('Load Auction reducer: ', action);
      return {
        ...state,
        ...action.payload.json
      };

    case types.LOAD_SELECTED_AUCTION_ERROR:
      return {
        ...state
      };

    case types.AUCTION_SELECTED:
      return {
        ...state,
        ...action,
        auctionEdited: false,
        auctionSelected: true
      }

    case types.EDIT_AUCTION_FIELD:
      return {
        ...state,
        [action.editedField]: action.edit,
        auctionEdited: true
      }

    case types.SET_UPLOAD_IMAGE:
      return {
        ...state,
        auctionEdited: true
      }

    case types.UPLOAD_IOSDESKTOPBANNER_SUCCESS:
      return {
        ...state,
        iosBannerDesktop: action.payload.json.imagePath
      }

    case types.UPLOAD_IOSMOBILEBANNER_SUCCESS:
      return {
        ...state,
        iosBannerMobile: action.payload.json.imagePath
      }

    case types.UPLOAD_CATALOG_COVER_SUCCESS:
      return {
        ...state,
        catalogueCoverImage: action.payload.json.imagePath
      }

    case types.UPLOAD_SALE_RESULTS_SUCCESS:
      return {
        ...state,
        auctionResultsFile: action.payload.json.filePath,
        auctionEdited: true
      }

    case types.UPLOAD_AUCTION_BANNER_SUCCESS:
      return {
        ...state,
        cloudinaryBannerVersion: action.payload.json.cloudinaryVersion,
        auctionEdited: true
      }

    case types.UPLOAD_WINNER_BID_EMAIL_SUCCESS:
    case types.GET_WINNER_BID_EMAIL_STATUS_SUCCESS:
      return {
        ...state,
        winnerBidEmailSendResults: action.payload.json,
        winnerBidEmailSent: true
      }

    case types.SET_DEPARTMENT_LIST:
      return {
        ...state,
        departmentList: action.departments
      }

    default:
      return state
  }
}

export default selectedAuction
