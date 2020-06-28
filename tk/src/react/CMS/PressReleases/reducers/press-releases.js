'use strict'

import * as types from '../actions/action-types'
import * as sharedTypes from '../../Shared/actions/action-types'
import { pressReleases as initialState } from '../initial-state'

export default function pressReleases(state = initialState, action) {
  switch (action.type) {
    case types.GET_PRESS_RELEASES_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.GET_PRESS_RELEASES_SUCCESS:
      return {
        ...state,
        pressReleases: action.payload.json
      }

    case types.GET_PRESS_RELEASES_ERROR:
      return {
        ...state
      }

    case types.GET_PRESS_RELEASE_ARTICLE_SUBMIT:
      return {
        ...state,
        errors: {},
        progressIndicator: true
      }

    case types.GET_PRESS_RELEASE_ARTICLE_SUCCESS:
      return {
        ...state,
        progressIndicator: false,
        selectedPressRelease: {
          ...action.payload.json
        }
      }

    case types.GET_PRESS_RELEASE_ARTICLE_ERROR:
      return {
        ...state,
        progressIndicator: false
      }


    case types.UPDATE_PRESS_RELEASE_ARTICLE_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      }

    case types.UPDATE_PRESS_RELEASE_ARTICLE_SUCCESS:
      console.log('UPDATE_PRESS_RELEASE_ARTICLE_SUCCESS',action);
      return {
        ...state,
        progressIndicator: false,
        selectedPressRelease: {
          ...action.payload.json
        }
      }

    case types.UPDATE_PRESS_RELEASE_ARTICLE_ERROR:
      return {
        ...state,
        progressIndicator: false
      }

    case types.DELETE_PRESS_RELEASE_ARTICLE_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      }

    case types.DELETE_PRESS_RELEASE_ARTICLE_SUCCESS:
      return {
        ...state,
        selectedPressRelease: {
          ...initialState.selectedPressRelease
        },
        progressIndicator: false

      }

    case types.DELETE_PRESS_RELEASE_ARTICLE_ERROR:
      return {
        ...state,
        progressIndicator: false
      }


    case types.UPLOAD_PRESS_RELEASE_PDF_SUBMIT:
      return {
        ...state,
        progressIndicator: true
      }

    case types.UPLOAD_PRESS_RELEASE_PDF_SUCCESS:
      return {
        ...state,
        pressReleaseEdited: false,
        progressIndicator: false,
        selectedPressRelease: {
          ...state.selectedPressRelease,
          pdfSource: action.payload.json.filePath
        }
      }

    case types.UPLOAD_PRESS_RELEASE_PDF_ERROR:
      return {
        ...state,
        progressIndicator: false
      }

    case sharedTypes.SET_UPLOAD_FILE:
      return {
        ...state,
        [action.fileLabel]: action.uploadFile
      }

    case sharedTypes.CLEAR_UPLOAD_FILE:
      return {
        ...state,
        [action.fileLabel]: { preview: '' }
      }

    case types.EDIT_PRESS_RELEASE:
      return {
        ...state,
        pressReleaseEdited: true,
        selectedPressRelease: {
          ...action.pressRelease,
          [action.editedField]: action.edit
        }
      }

    case types.EDIT_PRESS_RELEASE_LIST:
      return {
        ...state,
        pressReleases: action.pressReleaseList
      }

    case types.SET_LOCATION_INFO:
      return {
        ...state,
        pressReleaseEdited: true,
        selectedPressRelease: {
          ...action.pressRelease,
          locationName: action.locationName,
          locationId: action.locationId
        }
      }

    case types.SET_SELECTED_PRESS_RELEASE:
      return {
        ...state,
        selectedPressRelease: {
          ...initialState.selectedPressRelease,
          ...action.pressRelease
        }
      }

    case types.CLEAR_SELECTED_PRESS_RELEASE:
      return {
        ...state,
        selectedPressRelease: {
          ...initialState.selectedPressRelease
        }
      }

    case types.SET_DEPARTMENT_LIST:
      return {
        ...state,
        departmentList: action.departments
      }

    default:
      return state

  }
}
