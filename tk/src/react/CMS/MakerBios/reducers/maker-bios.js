'use strict'

import * as types from '../actions/action-types'
import * as sharedTypes from '../../Shared/actions/action-types'
import { makerBios as initialState } from '../initial-state'

export default function makerBios(state = initialState, action) {
  switch (action.type) {
    case types.GET_MAKER_BIOS_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.GET_MAKER_BIOS_SUCCESS:
      return {
        ...state,
        makerBios: action.payload.json
      }

    case types.GET_MAKER_BIOS_ERROR:
      return {
        ...state
      }

    case types.UPDATE_MAKER_BIO_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      }

    case types.UPDATE_MAKER_BIO_SUCCESS:
      return {
        ...state,
        progressIndicator: false,
        selectedMakerBio: {
          ...action.payload.json
        }
      }

    case types.UPDATE_MAKER_BIO_ERROR:
      return {
        ...state,
        progressIndicator: false
      }

    // case types.DELETE_MAKER_BIO_SUBMIT:
    //   return {
    //     ...state,
    //     progressIndicator: true,
    //     errors: {}
    //   }
    //
    // case types.DELETE_MAKER_BIO_SUCCESS:
    //   return {
    //     ...state,
    //     selectedMakerBio: {
    //       ...initialState.selectedMakerBio
    //     },
    //     progressIndicator: false
    //
    //   }
    //
    // case types.DELETE_MAKER_BIO_ERROR:
    //   return {
    //     ...state,
    //     progressIndicator: false
    //   }

    case types.EDIT_MAKER_BIO:
      return {
        ...state,
        makerBioEdited: true,
        selectedMakerBio: {
          ...action.makerBio,
          [action.editedField]: action.edit
        }
      }

    case types.EDIT_MAKER_BIO_LIST:
      return {
        ...state,
        makerBios: action.makerBioList
      }

    case types.SET_SELECTED_MAKER_BIO:
      return {
        ...state,
        selectedMakerBio: {
          ...initialState.selectedMakerBio,
          ...action.makerBio
        }
      }

    case types.CLEAR_SELECTED_MAKER_BIO:
      return {
        ...state,
        selectedMakerBio: {
          ...initialState.selectedMakerBio
        }
      }

    default:
      return state

  }
}
