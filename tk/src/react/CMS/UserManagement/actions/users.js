import * as types from './action-types';
import { createAction } from '../../Shared/lib/util';

// === Action Creators ===
export function bidsLoginSubmit() {
  return createAction(types.BIDS_LOGIN_SUBMIT);
}

export function bidsLoginSuccess(json) {
  return createAction(types.BIDS_LOGIN_SUCCESS, { json });
}

export function bidsLoginError(errorMsg) {
  return createAction(types.BIDS_LOGIN_ERROR, errorMsg);
}

export function usersRequested() {
  return createAction(types.GET_USERS_SUBMIT);
}

export function usersSuccess(json) {
  return createAction(types.GET_USERS_SUCCESS, { json });
}

export function usersError(errorMsg) {
  return createAction(types.GET_USERS_ERROR, errorMsg);
}

export function userDetailsRequested() {
  return createAction(types.GET_USER_DETAILS_SUBMIT);
}

export function userDetailsSuccess(json) {
  return createAction(types.GET_USER_DETAILS_SUCCESS, { json });
}

export function userDetailsError(errorMsg) {
  return createAction(types.GET_USER_DETAILS_ERROR, errorMsg);
}

export function userUpdateSubmit() {
  return createAction(types.UPDATE_USER_SUBMIT);
}

export function userUpdateSuccess(json) {
  return createAction(types.UPDATE_USER_SUCCESS, { json });
}

export function userUpdateError(errorMsg) {
  return createAction(types.UPDATE_USER_ERROR, errorMsg);
}

export function getCountriesRequested() {
  return createAction(types.GET_COUNTRIES_SUBMIT);
}

export function getCountriesSuccess(json) {
  return createAction(types.GET_COUNTRIES_SUCCESS, { json });
}

export function getCountriesError(errorMsg) {
  return createAction(types.GET_COUNTRIES_ERROR, errorMsg);
}

export function getStatesRequested() {
  return createAction(types.GET_STATES_SUBMIT);
}

export function getStatesSuccess(json) {
  return createAction(types.GET_STATES_SUCCESS, { json });
}

export function getStatesError(errorMsg) {
  return createAction(types.GET_STATES_ERROR, errorMsg);
}

export const editUserDropdowns = (selectedUser, userAddress, dropdownItem) => {
  return {
    type: types.EDIT_USER_DROPDOWNS,
    selectedUser,
    userAddress,
    dropdownItem
  };
};

export const editUserAddress = (selectedUser, editedField, edit) => {
  return {
    type: types.EDIT_USER_ADDRESS,
    selectedUser,
    editedField,
    edit
  };
};

export const editUser = (user, editedField, edit) => {
  return {
    type: types.EDIT_USER,
    user,
    editedField,
    edit
  };
};

export const editUserList = (users) => {
  return {
    type: types.EDIT_USER_LIST,
    users
  };
};

export const setUserQueryString = (queryString) => {
  return {
    type: types.SET_USER_QUERY_STRING,
    queryString
  };
};

export const clearUserQueryString = () => {
  return {
    type: types.CLEAR_USER_QUERY_STRING
  };
};

export const setSelectedUser = (user) => {
  return {
    type: types.SET_SELECTED_USER,
    user
  };
};

export const clearSelectedUser = () => {
  return {
    type: types.CLEAR_SELECTED_USER
  };
};

export const setNewUser = () => {
  return {
    type: types.SET_NEW_USER
  };
};

export const updateBaseUrl = (url) => {
  return {
    type: types.APP_BASE_URL,
    baseUrl: url
  };
};
