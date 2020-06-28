'use strict'

import * as types from '../actions/action-types'
import { updateState as initialState } from '../initial-state'

export default function migratePreviewToStaging(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.MIGRATE_PREVIEW_TO_STAGING_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.MIGRATE_PREVIEW_TO_STAGING_SUCCESS:
      return {
        ...state,
        saveDialogOpen: false
      }

    case types.MIGRATE_PREVIEW_TO_STAGING_DIALOG_OPEN:
      return {
        ...state,
        ...payload
      }

    case types.MIGRATE_PREVIEW_TO_STAGING_ERROR:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}
