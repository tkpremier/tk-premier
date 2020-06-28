import * as types from '../actions/action-types';
import { globalState as initialState } from '../initial-state';

const globalState = (state = initialState, action) => {
  switch (action.type) {
    case types.APP_INIT:
      return {
        ...state
      };

    case types.APP_BASE_URL:
      return {
        ...state,
        baseUrl: action.baseUrl
      };

    case types.API_BASE_URL:
      console.log('API base reducer: ', action);
      return {
        ...state,
        apiUrl: action.apiUrl
      };

    default:
      return state;
  }
};

export default globalState;
