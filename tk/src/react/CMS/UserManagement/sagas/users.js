import {
  call,
  put,
  select
} from 'redux-saga/effects';
import * as C from '../constants';
import * as types from '../actions/action-types';
import * as Api from '../../Shared/lib/api';
import {
  bidsLoginError,
  bidsLoginSuccess,
  usersRequested,
  usersSuccess,
  usersError,
  userDetailsRequested,
  userDetailsSuccess,
  userDetailsError,
  userUpdateSuccess,
  userUpdateError,
  editUser,
  editUserList,
  userUpdateSubmit,
  getCountriesSuccess,
  getCountriesError,
  getStatesSuccess,
  getStatesError
} from '../actions/users';
import {
  createSagaWatchers
} from '../../Shared/lib/util';
import {
  getBaseUrlState,
  getApiUrlState,
  getBidsUserName,
  getBidsPassword,
  getBidsClientId,
  getSelectedUser,
  getSelectedUserId,
  getUserQueryString,
  getBidsUserToken
} from '../selectors';


// === Watchers ===
export const bidsLoginWatchers = createSagaWatchers({
  [types.BIDS_LOGIN_SUBMIT]: bidsLoginWorker
});

export const getUsersWatchers = createSagaWatchers({
  [types.GET_USERS_SUBMIT]: getUsersWorker
});

export const getUserDetailsWatchers = createSagaWatchers({
  [types.GET_USER_DETAILS_SUBMIT]: getUserDetailsWorker
});

export const updateUserWatchers = createSagaWatchers({
  [types.UPDATE_USER_SUBMIT]: updateUserWorker
});

export const getCountriesWatchers = createSagaWatchers({
  [types.GET_COUNTRIES_SUBMIT]: getCountriesWorker
});

export const getStatesWatchers = createSagaWatchers({
  [types.GET_STATES_SUBMIT]: getStatesWorker
});

// === Workers ===
export function* bidsLoginWorker() {
  const apiUrl = yield select(getApiUrlState);
  const userName = yield select(getBidsUserName);
  const password = yield select(getBidsPassword);
  const clientId = yield select(getBidsClientId);

  const response = yield call(Api.bidsLogin, apiUrl, userName, password, clientId);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(bidsLoginError(json));
    return;
  }

  yield put(bidsLoginSuccess(json));
}

export function* getUsersWorker() {
  const baseUrl = yield select(getBaseUrlState);
  const queryString = yield select(getUserQueryString);

  const response = yield call(Api.getUsers, baseUrl, queryString);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(usersError(json));
    return;
  }

  yield put(usersSuccess(json));
}

export function* getUserDetailsWorker() {
  const apiUrl = yield select(getApiUrlState);
  const token = yield select(getBidsUserToken);
  const userId = yield select(getSelectedUserId);

  const response = yield call(Api.getUserDetails, apiUrl, token, userId);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(userDetailsError(json));
    return;
  }

  yield put(userDetailsSuccess(json));
}

export function* updateUserWorker() {
  const apiUrl = yield select(getApiUrlState);
  const token = yield select(getBidsUserToken);
  const userId = yield select(getSelectedUserId);
  const user = yield select(getSelectedUser);

  const selectedUser = yield select(getSelectedUser);
  const { userAddress } = selectedUser;

  // Macro validation reducer: (transducer?)
  const userValidated = userAddress.countryID === null || userAddress === null
    ? { ...selectedUser, userAddress: null }
    : { ...selectedUser, userAddress: userAddress };

  const response = yield call(
    Api.updateUser,
    apiUrl,
    token,
    userId,
    userValidated
  );
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(userUpdateError(json));
    return;
  }

  yield put(userUpdateSuccess(json));
}

// Get Countries saga
export function* getCountriesWorker() {
  const apiUrl = yield select(getApiUrlState);

  const response = yield call(Api.getCountries, apiUrl);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(getCountriesError(json));
    return;
  }

  yield put(getCountriesSuccess(json));
}

// Get States Saga
export function* getStatesWorker() {
  const apiUrl = yield select(getApiUrlState);

  const response = yield call(Api.getStates, apiUrl);
  const { hasError, json, statusCode } = response;

  if (hasError || statusCode !== 200) {
    yield put(getStatesError(json));
    return;
  }

  yield put(getStatesSuccess(json));
}
