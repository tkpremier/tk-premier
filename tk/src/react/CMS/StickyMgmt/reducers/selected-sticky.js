'use strict'

import * as types from '../actions/action-types'
import { selectedSticky as initialState } from '../initial-state'

const selectedSticky = (state = initialState, action) => {
  switch (action.type) {
    case types.STICKY_SELECTED:
      return {        
        ...state,
        ...action.selectedSticky,
        isNew: false,
        open: true,
      }
    case types.STICKY_PROPERTY_CHANGED:
      return {
        ...state,
        [action.editedField]: action.edit
      }
    case types.STICKY_SHOW_NEW_FORM:
      return {
        ...initialState,
        isNew: true,
        open: true
      }
    default:
      return state
  }
}

export default selectedSticky