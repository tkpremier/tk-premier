'use strict'

import * as types from '../actions/action-types'
import { tags as initialState } from '../initial-state'

export default function tags(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.TAGS_GET_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.TAGS_GET_SUCCESS:
      return {
        ...state,
        tags: payload.json
      }

    case types.TAGS_GET_ERROR:
      return {
        ...state
      }

    default:
      return state

  }
}
