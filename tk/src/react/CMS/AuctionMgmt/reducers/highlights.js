import * as types from '../actions/action-types'
import { highlights as initialState } from '../initial-state'

export default function highlights(state = initialState, action) {
  switch (action.type) {
    case types.HIGHLIGHTS_GET_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.HIGHLIGHTS_GET_SUCCESS:
      return {
        ...state,
        auctionHighlights: action.payload.json
      }

    case types.HIGHLIGHTS_GET_ERROR:
      return {
        ...state
      }

    case types.HIGHLIGHTS_SAVE_SUBMIT:
      return {
        ...state,
        errors: {},
        progressIndicator: true
      }

    case types.HIGHLIGHTS_SAVE_SUCCESS:
      return {
        ...state,
        auctionHighlights: action.payload.json,
        progressIndicator: false
      }

    case types.HIGHLIGHTS_SAVE_ERROR:
      return {
        ...state,
        progressIndicator: false
      }

    case types.HIGHLIGHTS_DELETE_SUBMIT:
      return {
        ...state,
        errors: {},
        progressIndicator: true
      }

    case types.HIGHLIGHTS_DELETE_SUCCESS:
      return {
        ...state,
        progressIndicator: false
      }

    case types.HIGHLIGHTS_DELETE_ERROR:
      return {
        ...state,
        progressIndicator: false
      }

    case types.HIGHLIGHTS_IMAGE_UPLOAD_SUBMIT:
      return {
        ...state,
        errors: {},
        progressIndicator: true
      }

    case types.HIGHLIGHTS_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        selectedHighlight: {
          ...state.selectedHighlight,
          imagePath: action.payload.json.imagePath.split('/').splice(-1).toString(),
          cloudinaryVersion: action.payload.json.cloudinaryVersion,
          progressIndicator: false
        }
      }

    case types.HIGHLIGHTS_IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        progressIndicator: false
      }

    case types.HIGHLIGHTS_UPLOAD_IMAGE_SET:
      return {
        ...state,
        [action.imageLabel]: action.uploadImage
      }

    case types.HIGHLIGHTS_UPLOAD_IMAGE_CLEAR:
      return {
        ...state,
        [action.imageLabel]: { preview: '' }
      }

    case types.EDIT_HIGHLIGHTS_LIST:
      return {
        ...state,
        auctionHighlights: action.highlights
      }

    case types.EDIT_HIGHLIGHT:
      return {
        ...state,
        [action.editedField]: action.value
      }

    case types.SET_SELECTED_HIGHLIGHT:
      return {
        ...state,
        selectedHighlight: action.highlight
      }

    case types.CLEAR_SELECTED_HIGHLIGHT:
      return {
        ...state,
        selectedHighlight: {}
      }

    case types.HIGHLIGHTS_PUSH_TO_PROD_DIALOG:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state

  }
}
