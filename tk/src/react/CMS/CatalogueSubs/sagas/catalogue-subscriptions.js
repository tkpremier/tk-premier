'use strict'

import {
  call,
  put,
  select
} from 'redux-saga/effects'
import * as C from '../constants'
import * as types from '../actions/action-types'
import * as Api from '../../Shared/lib/api'
import {
  catalogueSubscriptionsRequested,
  catalogueSubscriptionsSuccess,
  catalogueSubscriptionsError,
  catalogueSubUpdateSuccess,
  catalogueSubUpdateError,
  reorderDepartmentsSuccess,
  reorderDepartmentsError,
} from '../actions/catalogue-subscriptions'
import {
  createErrorMsg,
  createSagaWatchers
} from '../../Shared/lib/util'
import {
  getBaseUrlState,
  getReorderedDepartments,
  getSelectedDepartment
} from '../selectors'


// === Watchers ===
export const getCatalogueSubsWatchers = createSagaWatchers({
  [types.GET_CATALOG_SUBSCRIPTIONS_SUBMIT]: getCatalogueSubsWorker
})

export const updateCatalogueSubsWatchers = createSagaWatchers({
  [types.UPDATE_CATALOG_SUBSCRIPTIONS_SUBMIT]: updateCatalogueSubsWorker
})

export const reorderDepartmentsWatchers = createSagaWatchers({
  [types.REORDER_DEPARTMENTS_SUBMIT]: reorderDepartmentsWorker
})

// === Workers ===
export function* getCatalogueSubsWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const response = yield call(Api.catalogueSubs, baseUrl)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(catalogueSubscriptionsError(json))
    return
  }

  yield put(catalogueSubscriptionsSuccess(json))
}

export function* updateCatalogueSubsWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const updatedDepartment = yield select(getSelectedDepartment)

  const response = yield call(
    Api.catalogueSubsUpdate,
    baseUrl,
    updatedDepartment.catalogueSubscriptions,
    updatedDepartment.departmentID
  )
  const { hasError, json, statusCode } = response

  console.log('update catalog subs: ', updatedDepartment, response)

  if (hasError || statusCode !== 200) {
    yield put(catalogueSubUpdateError(json))
    return
  }

  yield put(catalogueSubUpdateSuccess(json))
  yield put(catalogueSubscriptionsRequested())
}

export function* reorderDepartmentsWorker() {
  const baseUrl = yield select(getBaseUrlState)
  const reorderedDepartments = yield select(getReorderedDepartments)

  const response = yield call(Api.departmentOrderUpdate, baseUrl, reorderedDepartments)
  const { hasError, json, statusCode } = response

  if (hasError || statusCode !== 200) {
    yield put(reorderDepartmentsError(json))
    return
  }

  yield put(reorderDepartmentsSuccess(json))
}
