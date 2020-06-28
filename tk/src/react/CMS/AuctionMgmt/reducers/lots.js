'use strict'

import * as types from '../actions/action-types'
import { lots as initialState } from '../initial-state'

export default function lots(state = initialState, action) {
  switch (action.type) {
    case types.LOTS_GET_SUBMIT:
      return {
        ...state,
        errors: {},
        noLots: false
      }

    case types.LOTS_GET_SUCCESS:
      return {
        ...state,
        ...action.payload.json,
        noLots: action.payload.json.lots.length === 0 ? true : false
      }

    case types.LOTS_GET_ERROR:
      return {
        ...state
      }

    case types.EDIT_LOT_DISPLAY_LIST:
      console.log('Edit lots reducer: ', action);
      return {
        ...state,
        displayLots: action.lotList
      }

    default:
      return state

  }
}
