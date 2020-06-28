'use strict'

import * as types from '../actions/action-types'
import { updateState as initialState } from '../initial-state'

export default function updateTag(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.UPDATE_TAG_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.UPDATE_TAG_SUCCESS:
      return {
        ...state,
        selectedLot: payload.json,
        saveDialogOpen: false
      }

    default:
      return state

  }
}
