import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function migratePreviewToStagingSuccess(json) {
  return createAction(types.MIGRATE_PREVIEW_TO_STAGING_SUCCESS, { json });
}

export function migratePreviewToStagingError(errorMsg) {
  return createAction(types.MIGRATE_PREVIEW_TO_STAGING_ERROR, errorMsg);
}

export function migratePreviewToStagingSubmit() {
  return createAction(types.MIGRATE_PREVIEW_TO_STAGING_SUBMIT);
}
