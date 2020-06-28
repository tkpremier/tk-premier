import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function updateTagSubmit() {
  return createAction(types.UPDATE_TAG_SUBMIT);
}

export function updateTagSuccess(json) {
  return createAction(types.UPDATE_TAG_SUCCESS, { json });
}

export function updateTagError(errorMsg) {
  return createAction(types.UPDATE_TAG_ERROR, errorMsg);
}
