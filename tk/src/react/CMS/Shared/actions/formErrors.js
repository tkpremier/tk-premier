'use strict'

import * as types from './action-types'

export const getFormErrors = () => ({
  type: types.GET_ERRORS
})

export const setFormErrors = (formErrors) => ({
  type: types.SET_ERRORS,
  formErrors
})