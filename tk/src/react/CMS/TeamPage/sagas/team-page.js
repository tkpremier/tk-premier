import {
  call,
  put,
  select
} from 'redux-saga/effects';
import * as C from '../constants';
import * as types from '../actions/action-types';
import * as Api from '../../Shared/lib/api';
import {
  teamMembersRequested,
  teamMembersSuccess,
  teamMembersError,
  teamMemberAddSuccess,
  teamMemberAddError,
  teamMemberUpdateSuccess,
  teamMemberUpdateError,
  teamMemberDeleteSuccess,
  teamMemberDeleteError,
  teamMemberImageUploadSuccess,
  teamMemberImageUploadError,
  editTeamMember,
  editTeamMemberList,
  teamMemberUpdateSubmit
} from '../actions/team-page';
import {
  createSagaWatchers
} from '../../Shared/lib/util';
import {
  getBaseUrlState,
  getTeamMembers,
  getSelectedTeamMember,
  getSelectedTeamMemberId,
  getTeamMemberEmail,
  getTeamMemberCurrentEmail,
  getTeamMembersImageUpload
} from '../selectors';


// === Watchers ===
export const getTeamMembersWatchers = createSagaWatchers({
  [types.GET_TEAM_MEMBERS_SUBMIT]: getTeamMembersWorker
});

export const updateTeamMemberWatchers = createSagaWatchers({
  [types.UPDATE_TEAM_MEMBER_SUBMIT]: updateTeamMemberWorker
});

export const deleteTeamMemberWatchers = createSagaWatchers({
  [types.DELETE_TEAM_MEMBER_SUBMIT]: deleteTeamMemberWorker
});

export const teamMemberImageUploadWatchers = createSagaWatchers({
  [types.UPLOAD_TEAM_MEMBER_IMAGE_SUBMIT]: teamMemberImageUploadWorker
})

// === Workers ===
export function* getTeamMembersWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const response = yield call(Api.getTeamMembers, baseUrl);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(teamMembersError(json));
    return;
  }

  yield put(teamMembersSuccess(json));
}

export function* updateTeamMemberWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const teamMember = yield select(getSelectedTeamMember);

  const response = yield call(
    Api.updateTeamMember,
    baseUrl,
    teamMember
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(teamMemberUpdateError(json));
    return;
  }

  yield put(teamMemberUpdateSuccess(json));
  yield put(teamMembersRequested());
}

export function* deleteTeamMemberWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const selectedTeamMember = yield select(getSelectedTeamMember);
  const response = yield call(
    Api.deleteTeamMember,
    baseUrl,
    selectedTeamMember
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(teamMemberDeleteError(json));
    return;
  }

  yield put(teamMemberDeleteSuccess(json));
  yield put(teamMembersRequested());
}

export function* teamMemberImageUploadWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const image = yield select(getTeamMembersImageUpload);
  const selectedTeamMember = yield select(getSelectedTeamMember);
  const teamMemberEmail = yield select(getTeamMemberEmail);
  const teamMemberCurrentEmail = yield select(getTeamMemberCurrentEmail);

  const response = yield call(
    Api.uploadTeamMemberImage,
    baseUrl,
    image,
    teamMemberEmail,
    teamMemberCurrentEmail
  );
  const { statusCode, json } = response;

  if (statusCode !== 200) {
    yield put(teamMemberImageUploadError({ message: C.ERROR.GENERAL }))
    return
  }

  yield put(teamMemberImageUploadSuccess(selectedTeamMember, json));
  yield put(teamMembersRequested());
}
