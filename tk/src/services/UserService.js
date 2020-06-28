import isUndefined from 'lodash/isUndefined';
import apiSettings from '../utils/ApiSettings.decorator';
import handleResponse from '../utils/handleresponse';
import TokenManager from '../utils/tokenManager';

const parseAuthToken = token => `${token.token_type} ${token.access_token}`;

const serialized = (payload = {}) => Object.keys(payload).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`).join('&');
@apiSettings
class UserService {
  tokenManager = new TokenManager()

  fetchUserToken(payload) {
    const rememberMe = payload.rememberMe || false;
    const data = serialized(payload);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    };

    return fetch('/phillipsapi/login', options)
      .then(handleResponse)
      .then((token) => {
        this.tokenManager.setToken(token, rememberMe);
        return token;
      });
  }

  fetchUser(payload) {
    return this.fetchUserToken(payload).then((token) => {
      const authToken = this.tokenManager.getToken();
      const options = {
        headers: {
          'Authorization': parseAuthToken(authToken)
        }
      };
      return fetch(`${this.apiDomain}api/user/${token.userId}`, options)
        .then(handleResponse);
    })
  }

  registerUser(payload) {
    return fetch(
      `${this.apiDomain}api/universalaccount/register`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    ).then(handleResponse);
  }

  editUser({ formName, payload, userId }) {
    const token = this.tokenManager.getTokenForAuthorizationHeader();
    const url = formName === 'change-pw'
      ? `${this.apiDomain}api/universalaccount/resetpassword`
      : `${this.apiDomain}api/user/${userId}`;
    const options = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json; charset=UTF-8'
      }
    };
    return fetch(url, options)
      .then(handleResponse);
  }

  deleteLotFromList(userId, listId, lot) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: this.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lot)
    };

    return fetch(
      `${this.apiDomain}api/user/${userId}/lotlist/${listId}/item`,
      options
    ).then(handleResponse);
  }

  saveLotToList(userId, listId, lot) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: this.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lot)
    };

    return fetch(
      `${this.apiDomain}api/user/${userId}/lotlist/${listId}/item`,
      options
    ).then(handleResponse);
  }

  deleteLotList(userId, listId) {
    const options = {
      method: 'DELETE',
      headers: { Authorization: this.authToken }
    };

    return fetch(
      `${this.apiDomain}api/user/${userId}/lotlist/${listId}`,
      options
    ).then(handleResponse);
  }

  saveLotList(userId, list) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: this.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(list)
    };
    return fetch(
      `${this.apiDomain}api/user/${userId}/lotlist/${list.id || 0}`,
      options
    ).then(handleResponse);
  }

  saveLot(userId, { saleNumber, lotNumber }) {
    const options = {
      method: 'POST',
      headers: { Authorization: this.authToken }
    };

    return fetch(
      `${this.apiDomain}api/user/${userId}/favoriteLot/${saleNumber}-${lotNumber}`,
      options
    ).then(handleResponse);
  }

  deleteLot(userId, { saleNumber, lotNumber }) {
    const options = {
      method: 'DELETE',
      headers: { Authorization: this.authToken }
    };

    return fetch(
      `${this.apiDomain}api/user/${userId}/favoriteLot/${saleNumber}-${lotNumber}`,
      options
    ).then(handleResponse);
  }

  saveMaker(userId, makerId) {
    const options = {
      method: 'POST',
      headers: { Authorization: this.authToken }
    };

    return fetch(
      `${this.apiDomain}api/user/${userId}/followmaker/${makerId}`,
      options
    ).then(handleResponse);
  }

  deleteMaker(userId, makerId) {
    const options = {
      method: 'DELETE',
      headers: { Authorization: this.authToken }
    };

    return fetch(
      `${this.apiDomain}api/user/${userId}/followmaker/${makerId}`,
      options
    ).then(handleResponse);
  }

  fetchUserDetails(id) {
    const options = {
      headers: { Authorization: this.authToken }
    };

    return fetch(`${this.apiDomain}api/user/${id}/details`, options)
      .then(handleResponse);
  }

  fetchRecommendedLots(id, saleNumber) {
    const options = {
      headers: { Authorization: this.authToken }
    };
    // if saleNumber is undefined fetch all recommended lots
    const saleNumberParam = isUndefined(saleNumber) ? '' : `/${saleNumber}`;
    return fetch(`${this.apiDomain}api/user/${id}/recommendedlots${saleNumberParam}`, options)
      .then(handleResponse)
  }

  resetUserPassword(payload) {
    return fetch(
      `${this.apiDomain}/api/universalaccount/ForgotPasswordSendEmail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
      }
    )
      .then(handleResponse);
  }

  trackUserActivity(activityModel) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: this.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activityModel)
    };

    return fetch(`${this.apiDomain}api/user/${activityModel.userId}/saveuseractivity`, options)
      .then(handleResponse);
  }
}

export default UserService;
