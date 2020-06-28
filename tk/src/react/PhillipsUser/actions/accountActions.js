import UserService from '../../../services/UserService';

const userService = new UserService();

const logout = () => ({
  type: 'USER_LOGOUT',
  payload: {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      id: ''
    },
    favoriteLots: [],
    followedMakers: [],
    lotLists: [],
    saleRegistrations: []
  }
});

const setUser = ({ id, userName, firstName, lastName, email }) => ({
  type: 'USER_LOGIN',
  payload: {
    user: {
      id,
      email,
      userName,
      firstName,
      lastName
    }
  }
});
const userFetched = user => ({
  type: 'USER_FETCHED',
  payload: {
    favoriteLots: user.favoriteLots,
    followedMakers: user.followedMakers,
    lotLists: user.lotLists,
    saleRegistrations: user.saleRegistrations
  }
});
const loggedIn = user => (dispatch) => {
  dispatch(setUser(user));
  userService.fetchUserDetails(user.id).then(userModel => dispatch(userFetched(userModel)));
};
const loginUserPending = payload => ({
  type: 'USER_LOGIN_PENDING',
  payload
});
const loginUserError = payload => ({
  type: 'USER_LOGIN_ERROR',
  payload
});
const loginUser = payload => (dispatch) => {
  dispatch(loginUserPending('login'));
  userService.fetchUser(payload)
    .then(res => dispatch(loggedIn(res)))
    .catch(err => dispatch(loginUserError(err)));
};

const createUserPending = payload => ({
  type: 'USER_CREATE_PENDING',
  payload
});
const createUserSuccess = payload => ({
  type: 'USER_CREATE_SUCCESS',
  payload
});
const createUserError = payload => ({
  type: 'USER_CREATE_ERROR',
  payload
});
const createUser = (payload, autoLogin = false) => (dispatch) => {
  dispatch(createUserPending('signup'));
  return userService.registerUser(payload)
    .then((res) => {
      dispatch(createUserSuccess(res));
      if (autoLogin) {
        dispatch(loginUser({
          ...payload,
          Username: res.email,
          grant_type: 'password'
        }));
      }
    })
    .catch(err => dispatch(createUserError(err)));
};

const editUserPending = formName => ({
  type: 'EDIT_USER_PENDING',
  payload: { formName }
});
const editUserSuccess = payload => ({
  type: 'EDIT_USER_SUCCESS',
  payload
});
const editUserError = payload => ({
  type: 'EDIT_USER_ERROR',
  payload
});
const editUser = (payload, userId, formName) => (dispatch) => {
  dispatch(editUserPending(formName));
  userService.editUser({ payload, formName, userId })
    .then(res => dispatch(editUserSuccess({ ...res, ...payload, formName })))
    .catch(err => dispatch(editUserError({ message: err.message, formName })))
};

const resetPasswordSuccess = payload => ({
  type: 'USER_RESET_PW_SUCCESS',
  payload
});
const resetPasswordError = payload => ({
  type: 'USER_RESET_PW_ERROR',
  payload
});
const resetPassword = payload => (dispatch) => {
  dispatch(loginUserPending('forgot-pw'));
  userService.resetUserPassword(payload)
    .then(res => dispatch(resetPasswordSuccess(res)))
    .catch(err => dispatch(resetPasswordError(err)));
};

export {
  createUser,
  loginUser,
  loggedIn,
  setUser,
  userFetched,
  editUser,
  resetPassword,
  logout
};
