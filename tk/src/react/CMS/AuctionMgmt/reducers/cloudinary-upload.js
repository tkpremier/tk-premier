import * as types from '../actions/action-types'
import { cloudinaryUpload as initialState } from '../initial-state'

export default function cloudinaryUpload(state = initialState, action) {
  switch (action.type) {
    case types.CLOUDINARY_UPLOAD_TRIGGER:
      return {
        ...state
      }

    case types.CLOUDINARY_UPLOAD_FINISHED:
      return {
        ...state,
        ...action.payload.json
      }

    case types.CLOUDINARY_UPLOAD_ERROR:
      return {
        ...state,
        ...action.payload.json
      }

    case types.CLOUDINARY_GET_UPLOAD_STATUS:
      return {
        ...state
      }

    case types.CLOUDINARY_GET_UPLOAD_STATUS_SUCCESS:
      return {
        ...state,
        ...action.payload.json
      }

    case types.CLOUDINARY_DIALOG_OPEN:
      return {
        ...state,
        ...action.payload
      }

    case types.CLOUDINARY_LOT_UPLOAD_SUCCESS:
      return {
        ...state,
        cloudinaryDialogOpen: false
      }

    case types.CLOUDINARY_LOT_UPLOAD_ERROR:
      return {
        ...state,        
        cloudinaryDialogOpen: false,
      }

    case types.THUMBNAIL_UPDATE:
      return {
        ...state
      }

    case types.THUMBNAIL_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload.json
      }

    case types.THUMBNAIL_UPDATE_ERROR:
      return {
        ...state
      }

    case types.THUMBNAIL_DIALOG_OPEN:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state

  }
}
