import * as types from './action-types'

export const clearAlerts = () => ({
  type: types.CLEAR_ALERTS
})

export const updateBaseUrl = (url) => {
  return {
    type: types.APP_BASE_URL,
    baseUrl: url
  }
}

export const updateApiUrl = (apiUrl) => {
  return {
    type: types.API_BASE_URL,
    apiUrl: apiUrl
  }
}

export const setUploadFile = (fileLabel, uploadFile) => {
  return {
    type: types.SET_UPLOAD_FILE,
    fileLabel,
    uploadFile
  }
}

export const clearUploadFile = (fileLabel) => {
  return {
    type: types.CLEAR_UPLOAD_FILE,
    fileLabel
  }
}
