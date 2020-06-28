export const getBaseUrlState = (state) => state.globalState.baseUrl;
export const getApiUrlState = (state) => state.globalState.apiUrl;

// === User Management ===
export const getUserQueryString = (state) => state.users.queryString;

export const getSelectedUser = (state) => state.users.selectedUser;
export const getSelectedUserId = (state) => state.users.selectedUser.id;
export const getBidsUserToken = (state) => state.users.bidsLoginUser.access_token;

export const getUserEmail = (state) => state.users.selectedUser.email;
export const getUserNewEmail = (state) => state.users.selectedUser.newEmail;

// === Bids login ===
export const getBidsUserName = (state) => state.users.bidsLogin;
export const getBidsPassword = (state) => state.users.bidsPassword;
export const getBidsClientId = (state) => state.users.bidsClientId;
