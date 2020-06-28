import * as R from 'ramda';

import * as types from '../actions/action-types';
import { users as initialState } from '../initial-state';
import { renameKeys } from '../../Shared/lib/util';

export default function users(state = initialState, action) {
  const newStateKey = { stateId: 'stateID' };

  switch (action.type) {
    case types.BIDS_LOGIN_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.BIDS_LOGIN_SUCCESS:
      return {
        ...state,
        bidsLoginUser: action.payload.json
      };

    case types.BIDS_LOGIN_ERROR:
      return {
        ...state
      };

    case types.GET_USERS_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.json
      };

    case types.GET_USERS_ERROR:
      return {
        ...state
      };

    case types.GET_USER_DETAILS_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        selectedUser: {
          ...action.payload.json,
          userAddress: {
            ...state.selectedUser.userAddress,
            ...action.payload.json.userAddress,
            ...(
              action.payload.json.userAddress !== null
              && action.payload.json.userAddress.province !== null
                ? {
                  ...renameKeys(
                    R.find(
                      R.propEq(
                        'stateCode',
                        action.payload.json.userAddress.province
                      )
                    )(state.states),
                    newStateKey
                  )
                }
                : { provinceFlag: false }
            )
          }
        }
      };

    case types.GET_USER_DETAILS_ERROR:
      return {
        ...state
      };

    case types.UPDATE_USER_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        progressIndicator: false
      };

    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.GET_COUNTRIES_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        ...action.payload.json
      };

    case types.GET_COUNTRIES_ERROR:
      return {
        ...state
      };

    case types.GET_STATES_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.GET_STATES_SUCCESS:
      return {
        ...state,
        ...action.payload.json
      };

    case types.GET_STATES_ERROR:
      return {
        ...state
      };

    case types.EDIT_USER_LIST:
      return {
        ...state,
        users: action.users
      };

    case types.EDIT_USER:
      return {
        ...state,
        userEdited: true,
        selectedUser: {
          ...action.user,
          [action.editedField]: action.edit
        }
      };

    case types.EDIT_USER_DROPDOWNS:
      return {
        ...state,
        userEdited: true,
        selectedUser: {
          ...action.selectedUser,
          userAddress: {
            ...action.userAddress,
            ...action.dropdownItem
          }
        }
      };

    case types.EDIT_USER_ADDRESS:
      return {
        ...state,
        userEdited: true,
        selectedUser: {
          ...action.selectedUser,
          userAddress: {
            ...action.selectedUser.userAddress,
            [action.editedField]: action.edit
          }
        }
      };

    case types.SET_SELECTED_USER:
      return {
        ...state,
        userEdited: false,
        selectedUser: {
          ...initialState.selectedUser,
          ...action.user,
          testUser: false
        }
      };

    case types.CLEAR_SELECTED_USER:
      return {
        ...state,
        userEdited: false,
        selectedUser: {
          ...initialState.selectedUser
        }
      };

    case types.SET_USER_QUERY_STRING:
      return {
        ...state,
        userEdited: false,
        queryString: action.queryString
      };

    case types.CLEAR_USER_QUERY_STRING:
      return {
        ...state,
        userEdited: false,
        queryString: ''
      };

    default:
      return state;
  }
}
