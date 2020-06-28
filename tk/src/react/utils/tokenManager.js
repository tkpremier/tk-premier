import Base64 from './base64EncodeDecode.js';
import CookieManager from './cookieManager';

class TokenManager {
  constructor() {
    this.storageToken = '8fe8291d-50c3-4b58-9513-cb34bfbad893';
    this.getTokenForAuthorizationHeader = this.getTokenForAuthorizationHeader.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  getToken() {
    let token = CookieManager.getCookie(this.storageToken);
    if (token !== undefined && token !== null) {
      token = Base64.decode(token);
      token = JSON.parse(token);
      return token;
    } else {
      return "You must be logged in";
    }
  }

  getTokenForAuthorizationHeader() {
    const token = this.getToken();
    if (typeof token === "object" && token !== null){
      return `${token.token_type} ${token.access_token}`;
    }
    return token;
  }

  setToken(token, setLocal) {
    if(typeof token === "object"){
      token = JSON.stringify(token);
      CookieManager.setCookieOnPhillipsDomain(this.storageToken, Base64.encode(token), setLocal);
    }
  }

  removeToken(){
    CookieManager.expireCookie(this.storageToken);
  }

  isTokenSet(){
    if(CookieManager.getCookie(this.storageToken)){
      return true;
    }
    return false;
  }
};

export default TokenManager;
