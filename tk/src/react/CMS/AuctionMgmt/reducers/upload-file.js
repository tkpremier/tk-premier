'use strict'

import * as types from '../actions/action-types'
import * as sharedTypes from '../../Shared/actions/action-types'
import { uploadImage as initialState } from '../initial-state'

export default function uploadFile(state = initialState, action) {
  switch (action.type) {
    case types.UPLOAD_SALE_RESULTS_SUBMIT:
    case types.UPLOAD_WINNER_BID_EMAIL_SUBMIT:
      return {
        ...state
      }

    case types.UPLOAD_SALE_RESULTS_SUCCESS:
      return {
        ...state,
        auctionResultsFile: action.payload,
        auctionEdited: false
      }

    case sharedTypes.SET_UPLOAD_FILE:
      return {
        ...state,
        [action.fileLabel]: action.uploadFile
      }

    case sharedTypes.CLEAR_UPLOAD_FILE:
      return {
        ...state,
        [action.fileLabel]: { preview: '' }
      }

    case types.UPLOAD_WINNER_BID_EMAIL_SUCCESS:
      return {
        ...state,
        winnerBidEmailFile: { name:'', preview: '' }
      }

    default:
      return state

  }
}
