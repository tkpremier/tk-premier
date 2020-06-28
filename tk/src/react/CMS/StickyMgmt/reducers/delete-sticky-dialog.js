'use strict'

import * as types from '../actions/action-types'
import { deleteStickyDialog as initialState } from '../initial-state'

const deleteStickyDialog = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_DELETE_DIALOG:
            return {
                ...state,
                open: true
            }
        case types.STICKY_DELETE_CANCEL:
            return {
                ...state,
                open: false
            }
        case types.STICKY_UPDATE_SUCCESS:
            return {
                ...state,
                open: false
            }
        default:
            return state
    }
}

export default deleteStickyDialog