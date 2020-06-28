import * as types from '../actions/action-types';
import * as sharedTypes from '../../Shared/actions/action-types';
import { teamPage as initialState } from '../initial-state';

export default function teamPage(state = initialState, action) {
  switch (action.type) {
    case types.GET_TEAM_MEMBERS_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.GET_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        teamMembers: action.payload.json
      };

    case types.GET_TEAM_MEMBERS_ERROR:
      return {
        ...state
      };

    case types.UPDATE_TEAM_MEMBER_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      };

    case types.UPDATE_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        progressIndicator: false
      };

    case types.UPDATE_TEAM_MEMBER_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.DELETE_TEAM_MEMBER_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      };

    case types.DELETE_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        progressIndicator: false,
        selectedTeamMember: {
          ...initialState.selectedTeamMember,
          newTeamMember: true
        }
      };

    case types.DELETE_TEAM_MEMBER_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.UPLOAD_TEAM_MEMBER_IMAGE_SUBMIT:
      return {
        ...state,
        errors: {},
        progressIndicator: true
      };

    case types.UPLOAD_TEAM_MEMBER_IMAGE_SUCCESS:
      return {
        ...state,
        progressIndicator: false,
        selectedTeamMember: {
          ...action.payload.selectedTeamMember,
          imageURL: action.payload.json.imageURL
        }
      };

    case types.UPLOAD_TEAM_MEMBER_IMAGE_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.TEAM_MEMBER_UPLOAD_IMAGE_SET:
      return {
        ...state,
        teamMemberEdited: true,
        [action.imageLabel]: action.uploadImage
      };

    case types.TEAM_MEMBER_UPLOAD_IMAGE_CLEAR:
      return {
        ...state,
        teamMemberEdited: false,
        [action.imageLabel]: { preview: '' }
      };

    case types.EDIT_TEAM_MEMBER:
      return {
        ...state,
        teamMemberEdited: true,
        selectedTeamMember: {
          ...action.teamMember,
          [action.editedField]: action.edit
        }
      };

    case types.EDIT_TEAM_MEMBER_LIST:
      return {
        ...state,
        teamMembers: action.teamMembers
      };

    case types.EDIT_TEAM_MEMBER_DROPDOWNS:
      return {
        ...state,
        teamMemberEdited: true,
        selectedTeamMember: {
          ...action.teamMember,
          [action.editedId]: action.id,
          [action.editedField]: action.edit
        }
      };

    case types.SET_SELECTED_TEAM_MEMBER:
      return {
        ...state,
        teamMemberEdited: false,
        selectedTeamMember: {
          ...initialState.selectedTeamMember,
          ...action.teamMember,
          newTeamMember: false
        }
      };

    case types.CLEAR_SELECTED_TEAM_MEMBER:
      return {
        ...state,
        teamMemberEdited: false,
        selectedTeamMember: {
          ...initialState.selectedTeamMember
        }
      };

    case types.SET_NEW_TEAM_MEMBER:
      return {
        ...state,
        teamMemberEdited: true,
        selectedTeamMember: {
          ...initialState.selectedTeamMember,
          newTeamMember: true
        }
      };

    default:
      return state;

  }
}
