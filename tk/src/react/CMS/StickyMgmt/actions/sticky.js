'use strict'

import * as types from './action-types'

export const clearAlerts = () => ({
  type: types.CLEAR_ALERTS
})

export const cancelDelete = () => ({
  type: types.STICKY_DELETE_CANCEL
})

export const deleteSticky = () => ({
  type: types.STICKY_DELETE_SUMBIT
})

export const deleteDialog = () => ({
  type: types.SHOW_DELETE_DIALOG
})

export const editSticky = (editedField, edit) => ({
  type: types.STICKY_PROPERTY_CHANGED,
  editedField,
  edit
})

export const getStickies = () => ({
  type: types.STICKY_REQUEST
})

export const getStickySuccess = (stickies) => ({
  type: types.STICKY_REQUEST_SUCCESS,
  stickies
})

export const reorderSticky = (stickyReorder) => ({
  type: types.STICKY_REORDER_SUBMIT,
  stickyReorder
})

export const saveStickySuccess = (stickies, message) => ({
  type: types.STICKY_UPDATE_SUCCESS,
  stickies,
  message
})

export const saveSticky = () => ({
  type: types.STICKY_UPDATE_SUMBIT
})

export const saveStickyImage = (image) => ({
  type: types.STICKY_IMAGE_SUMBIT,
  image
})

export const setSelectedSticky = (selectedSticky) => ({
  type: types.STICKY_SELECTED,
  selectedSticky
})

export const showNewStickyForm = () => ({
  type: types.STICKY_SHOW_NEW_FORM,
})

export const stickyError = (message) => ({
  type: types.STICKY_REQUEST_ERROR,
  message
})

export const stickyImageSuccess = () => ({
  type: types.STICKY_IMAGE_SUCCESS
})

export const updateBaseUrl = (url) => ({
  type: types.APP_BASE_URL,
  baseUrl: url
})