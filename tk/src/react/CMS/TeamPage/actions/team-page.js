import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function teamMembersRequested() {
  return createAction(types.GET_TEAM_MEMBERS_SUBMIT);
}

export function teamMembersSuccess(json) {
  return createAction(types.GET_TEAM_MEMBERS_SUCCESS, { json });
}

export function teamMembersError(errorMsg) {
  return createAction(types.GET_TEAM_MEMBERS_ERROR, errorMsg);
}

export function teamMemberUpdateSubmit() {
  return createAction(types.UPDATE_TEAM_MEMBER_SUBMIT);
}

export function teamMemberUpdateSuccess(json) {
  return createAction(types.UPDATE_TEAM_MEMBER_SUCCESS, { json });
}

export function teamMemberUpdateError(errorMsg) {
  return createAction(types.UPDATE_TEAM_MEMBER_ERROR, errorMsg);
}

export function teamMemberDeleteSubmit() {
  return createAction(types.DELETE_TEAM_MEMBER_SUBMIT);
}

export function teamMemberDeleteSuccess(json) {
  return createAction(types.DELETE_TEAM_MEMBER_SUCCESS, { json });
}

export function teamMemberDeleteError(errorMsg) {
  return createAction(types.DELETE_TEAM_MEMBER_ERROR, errorMsg);
}

export function teamMemberImageUploadSubmit() {
  return createAction(types.UPLOAD_TEAM_MEMBER_IMAGE_SUBMIT);
}

export function teamMemberImageUploadSuccess(selectedTeamMember, json) {
  return createAction(types.UPLOAD_TEAM_MEMBER_IMAGE_SUCCESS, { selectedTeamMember, json });
}

export function teamMemberImageUploadError(errorMsg) {
  return createAction(types.UPLOAD_TEAM_MEMBER_IMAGE_ERROR, errorMsg);
}

export const teamMembersSetUploadImage = (imageLabel, uploadImage) => {
  return {
    type: types.TEAM_MEMBER_UPLOAD_IMAGE_SET,
    imageLabel,
    uploadImage
  };
};

export const teamMembersClearUploadImage = (imageLabel) => {
  return {
    type: types.TEAM_MEMBER_UPLOAD_IMAGE_CLEAR,
    imageLabel
  };
};

export const editTeamMemberDropdowns = (teamMember, editedId, editedField, id, edit) => {
  return {
    type: types.EDIT_TEAM_MEMBER_DROPDOWNS,
    teamMember,
    editedId,
    editedField,
    id,
    edit
  };
};

export const editTeamMember = (teamMember, editedField, edit) => {
  return {
    type: types.EDIT_TEAM_MEMBER,
    teamMember,
    editedField,
    edit
  };
};

export const editTeamMemberList = (teamMembers) => {
  return {
    type: types.EDIT_TEAM_MEMBER_LIST,
    teamMembers
  };
};

export const setSelectedTeamMember = (teamMember) => {
  return {
    type: types.SET_SELECTED_TEAM_MEMBER,
    teamMember
  };
};

export const clearSelectedTeamMember = () => {
  return {
    type: types.CLEAR_SELECTED_TEAM_MEMBER
  };
};

export const setNewTeamMember = () => {
  return {
    type: types.SET_NEW_TEAM_MEMBER
  };
};

export const updateBaseUrl = (url) => {
  return {
    type: types.APP_BASE_URL,
    baseUrl: url
  };
};
