import isError from 'lodash/isError'

import Conf from '../../conf'
import { RESPONSE, ERROR } from '../constants'
import { assert, andLog } from './util'
import { logException } from './log-exception'

const bool = thing => !!thing

export function parsedFetch(name, errorType, ...args) {
  return fetch(...args)
    .then(response => parseResponse(response, name))
    .catch(error => handleNetworkError(error, errorType))
}


export function handleNetworkError(errorObj, name) {
  assert(
    isError(errorObj),
    `handleNetworkError expects an error object! Received: ${errorObj} name: ${name}`
  )
  return andLog({
    [RESPONSE.NAME]: name,
    [RESPONSE.HAS_ERROR]: true,
    [RESPONSE.STATUS_CODE]: 'No Status',
    [RESPONSE.JSON]: _jsonOrParsedError(errorObj)
  }, `name ${name}`, 'errorObj:', errorObj)
}

function _jsonOrParsedError(jsonObj, message) {
  assert(!message || typeof message === 'string', 'Message must be undefined or a string')
  assert(jsonObj && typeof jsonObj === 'object', 'jsonObj must be an object')

  if (isError(jsonObj)) {
    return { form_error: { message: message || jsonObj.message }}
  }

  return message
    ? { form_error: { message: message }}
    : jsonObj
}

export function parseResponse(response, reqName) {
  // Return object format:
  // {
  //   requestName: String, // For debugging purposes
  //   hasError: true,
  //   statusCode: response.status,
  //   json: <json response>,
  // }
  //
  // `hasError` is a hint if there is any type of error
  // then you have to look for details in
  // `response.form_error` or `response.validation_errors`

  // 400, 401, 402..  handled on server with more details
  // already in the expected response format
  if (Conf.loggingMiddleware) {
    console.info("response >>>>", response, reqName)
  }
  const requestName = reqName || 'Unnamed Fetch'

  // handle some error response codes
  const errorMessages = {
    500: ERROR.SERVER_ERROR,
    410: ERROR.EXPIRED,
    409: ERROR.DUPLICATE,
    404: ERROR.NOT_FOUND,
    403: ERROR.UNAUTHORIZED,
    // 401: ERROR.UNAUTHORIZED, // Go with what server provides.
  }

  // const validationErrorMessages = {
  //   402: ERROR.VALIDATION,
  //   400: ERROR.VALIDATION,
  // }

  const errorMessage = errorMessages[response.status]
  // const validationErrorMessage = validationErrorMessages[response.status]
  const contentType = response.headers.get("content-type")
  const isJson = contentType && contentType.includes("application/json")
  const isRaw = contentType && contentType.includes("application/octet-stream")

  switch (true) {
    case bool(errorMessage):
      return andLog({
        [RESPONSE.NAME]: requestName,
        [RESPONSE.HAS_ERROR]: true,
        [RESPONSE.STATUS_CODE]: response.status,
        [RESPONSE.JSON]: _jsonOrParsedError({}, errorMessage)
      }, `${reqName} error msg`, `contentType: ${contentType}`)

    // case bool(validationErrorMessage):
    case bool(isJson):
      return response.json().then(jsonObj => {
        return andLog({
          [RESPONSE.NAME]: requestName,
          [RESPONSE.HAS_ERROR]: bool(jsonObj.validation_errors || jsonObj.form_error),
          [RESPONSE.STATUS_CODE]: response.status,
          [RESPONSE.JSON]: _jsonOrParsedError(jsonObj)
        }, `${reqName} is json`, `contentType: ${contentType}`)
      })

    case bool(isRaw):
      return response.json().then(jsonObj => {
        return andLog({
          [RESPONSE.NAME]: requestName,
          [RESPONSE.HAS_ERROR]: false,
          [RESPONSE.STATUS_CODE]: response.status,
          [RESPONSE.JSON]: _jsonOrParsedError(jsonObj)
        }, `RAW data: ${reqName}`, `contentType: ${contentType}`)
      })

    default:
      // Handle non JSON ok response.
      if (Conf.loggingMiddleware) {
        console.info("not json, but OK! >>>")
        response.json && response.json().then(data => console.log(`${reqName} response: `, data))
      }
      logException(
        new Error('Unnable to parse response in parseResponse'),
        {
          requestName,
          response,
          status: response.status
        }
      )
      return andLog({
        [RESPONSE.NAME]: requestName,
        [RESPONSE.HAS_ERROR]: false,
        [RESPONSE.STATUS_CODE]: response.status,
        [RESPONSE.JSON]: {}
      }, `${reqName} content type "${contentType}" not found`)
  }
}
