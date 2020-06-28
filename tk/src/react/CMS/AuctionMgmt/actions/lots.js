import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function lotsGetSubmit() {
  return createAction(types.LOTS_GET_SUBMIT);
}

export function lotsGetSuccess(json) {
  return createAction(types.LOTS_GET_SUCCESS, { json });
}

export function lotsGetError(errorMsg) {
  return createAction(types.LOTS_GET_ERROR, errorMsg);
}
