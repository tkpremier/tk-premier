'use strict'

const logger = store => next => action => {
  console.log('%c' + 'action:', 'color: blue', action)
  const result = next(action)
  console.log('%c' + 'next state:', 'color: red', store.getState())
  return result
}

export default logger
