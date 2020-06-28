'use strict'

import * as types from '../actions/action-types'
import { catalogueSubscriptions as initialState } from '../initial-state'

export default function catalogueSubscriptions(state = initialState, action) {
  switch (action.type) {
    case types.GET_CATALOG_SUBSCRIPTIONS_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.GET_CATALOG_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        catalogueSubscriptions: action.payload.json
      }

    case types.GET_CATALOG_SUBSCRIPTIONS_ERROR:
      return {
        ...state
      }

    case types.UPDATE_CATALOG_SUBSCRIPTIONS_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.UPDATE_CATALOG_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state
      }

    case types.UPDATE_CATALOG_SUBSCRIPTIONS_ERROR:
      return {
        ...state
      }

    case types.REORDER_DEPARTMENTS_SUBMIT:
      return {
        ...state,
        errors: {}
      }

    case types.REORDER_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        catalogueSubscriptions: action.payload.json
      }

    case types.REORDER_DEPARTMENTS_ERROR:
      return {
        ...state
      }

    case types.EDIT_DEPARTMENT_LIST:
      return {
        ...state,
        catalogueSubscriptions: action.departments
      }

    case types.EDIT_CATALOGUE_LIST:
      return {
        ...state,
        selectedDepartment: action.catalogues
      }

    case types.EDIT_DEPARTMENT:
      return {
        ...state,
        selectedDepartment: action.department
      }

    case types.EDIT_CATALOGUE:
      return {
        ...state,
        selectedCatalogue: {
          ...action.selectedCatalogue,
          [action.editedField]: action.edit
        }
      }

    case types.SET_SELECTED_DEPARTMENT:
      return {
        ...state,
        selectedDepartment: action.department
      }

    case types.CLEAR_SELECTED_DEPARTMENT:
      return {
        ...state,
        selectedDepartment: {}
      }

    case types.SET_SELECTED_CATALOGUE:
      return {
        ...state,
        selectedCatalogue: {
          ...action.catalogue,
          newCatalogue: false
        }
      }

    case types.CLEAR_SELECTED_CATALOGUE:
      return {
        ...state,
        selectedCatalogue: {
          id: 0,
          order: 0,
          description: '',
          code: '',
          price: 0,
          newCatalogue: true
        }
      }

    default:
      return state

  }
}
