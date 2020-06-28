'use strict'

import Conf from '../../conf'

export function logException(error, context) {
  console.log('>>> logException', error, context, Conf.__DEV__ ? 'devMode' : 'prodMode')
}

export function genErrorHandler(worker) {
  // wraps a generator (usually a worker)
  // to send error to Sentry
  return function* (action) {
    try {
      yield* worker(action)
    }
    catch (e) {
      // send to Sentry
      logException(e, { workerName: worker.name })
    }
  }
}
