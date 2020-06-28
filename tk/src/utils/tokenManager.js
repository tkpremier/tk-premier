import Base64 from './base64EncodeDecode';
import CookieManager from './cookieManager';

const TokenManager = function () {
  this.cookieManager = new CookieManager();
  this.storageToken = '8fe8291d-50c3-4b58-9513-cb34bfbad893';
  this.getToken = function () {
    let token = this.cookieManager.getCookie(this.storageToken);

    if (token !== undefined && token !== null) {
      token = Base64.decode(token);
      token = JSON.parse(token);
      return token;
    } else {
      return 'You must be logged in';
    }
  };
  this.getTokenForAuthorizationHeader = function () {
    var token = this.getToken();
    if (typeof token === 'object' && token !== null) {
      return `${token.token_type} ${token.access_token}`;
    }
    return token;
  };
  this.setToken = function (token, setLocal) {
    if (typeof token === 'object') {
      token = JSON.stringify(token);
      return this.cookieManager.setCookieOnPhillipsDomain(this.storageToken, Base64.encode(token), setLocal);
    }
  };
  this.removeToken = function () {
    this.cookieManager.expireCookie(this.storageToken);
  };
  this.isTokenSet = function () {
    if (this.cookieManager.getCookie(this.storageToken)) {
      return true;
    }
    return false;
  };
};
export default TokenManager;
