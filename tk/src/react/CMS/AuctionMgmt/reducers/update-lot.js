'use strict'

import * as types from '../actions/action-types'
import { updateState as initialState } from '../initial-state'

export default function updateLot(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.UPDATE_LOT_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.UPDATE_LOT_SUCCESS:
      return {
        ...state,
        selectedLot: payload.json,
        saveDialogOpen: false
      }

    case types.UPDATE_AUCTION_DIALOG_OPEN:
      return {
        ...state,
        ...payload
      }

    case types.CLOUDINARY_LOT_UPLOAD_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.CLOUDINARY_LOT_UPLOAD_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        saveDialogOpen: false
      }

    default:
      return state

  }
}
