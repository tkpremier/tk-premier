import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function tagsGetSubmit() {
  return createAction(types.TAGS_GET_SUBMIT);
}

export function tagsGetSuccess(json) {
  return createAction(types.TAGS_GET_SUCCESS, { json });
}

export function tagsGetError(errorMsg) {
  return createAction(types.TAGS_GET_ERROR, errorMsg);
}
