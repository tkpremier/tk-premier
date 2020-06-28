import * as types from './action-types'
import { createAction } from '../../Shared/lib/util'

// === Action Creators ===
export function catalogueSubscriptionsRequested() {
  return createAction(types.GET_CATALOG_SUBSCRIPTIONS_SUBMIT)
}

export function catalogueSubscriptionsSuccess(json) {
  return createAction(types.GET_CATALOG_SUBSCRIPTIONS_SUCCESS, { json })
}

export function catalogueSubscriptionsError(errorMsg) {
  return createAction(types.GET_CATALOG_SUBSCRIPTIONS_ERROR, errorMsg)
}

export function catalogueSubUpdateSubmit() {
  return createAction(types.UPDATE_CATALOG_SUBSCRIPTIONS_SUBMIT)
}

export function catalogueSubUpdateSuccess(json) {
  return createAction(types.UPDATE_CATALOG_SUBSCRIPTIONS_SUCCESS, { json })
}

export function catalogueSubUpdateError(errorMsg) {
  return createAction(types.UPDATE_CATALOG_SUBSCRIPTIONS_ERROR, errorMsg)
}

export function reorderDepartmentsSubmit() {
  return createAction(types.REORDER_DEPARTMENTS_SUBMIT)
}

export function reorderDepartmentsSuccess(json) {
  return createAction(types.REORDER_DEPARTMENTS_SUCCESS, { json })
}

export function reorderDepartmentsError(errorMsg) {
  return createAction(types.REORDER_DEPARTMENTS_ERROR, errorMsg)
}

export const editDepartmentList = (departments) => {
  return {
    type: types.EDIT_DEPARTMENT_LIST,
    departments
  }
}

export const editDepartment = (department) => {
  return {
    type: types.EDIT_CATALOGUE,
    department
  }
}

export const editCatalogueList = (catalogues) => {
  return {
    type: types.EDIT_CATALOGUE_LIST,
    catalogues
  }
}

export const editCatalogue = (selectedCatalogue, editedField, edit) => {
  return {
    type: types.EDIT_CATALOGUE,
    selectedCatalogue,
    editedField,
    edit
  }
}

export const setSelectedDepartment = (department) => {
  return {
    type: types.SET_SELECTED_DEPARTMENT,
    department
  }
}

export const clearSelectedDepartment = () => {
  return {
    type: types.CLEAR_SELECTED_DEPARTMENT
  }
}

export const setSelectedCatalogue = (catalogue) => {
  return {
    type: types.SET_SELECTED_CATALOGUE,
    catalogue
  }
}

export const clearSelectedCatalogue = () => {
  return {
    type: types.CLEAR_SELECTED_CATALOGUE
  }
}

export const updateBaseUrl = (url) => {
  return {
    type: types.APP_BASE_URL,
    baseUrl: url
  }
}
