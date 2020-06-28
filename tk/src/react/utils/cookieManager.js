
class CookieManager  {
  constructor() {

    this.expirationDays = "14";
    this.defaultPath = "/";

  }
  //get the domain even from subdomain
  //taken from http://stackoverflow.com/questions/13367376/get-the-domain-name-of-the-subdomain-javascript

  domain() {
    var parts = location.hostname.split('.');
    return parts.slice(-2).join('.');
  }

  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    var cArr = [];
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) {
        cArr.push(c.substring(name.length, c.length));
      }
    }
    if (cArr.length > 1) {
      return cArr[1];
    } else {
      return cArr[0];
    }
    // return "";
  }

  setCookieOnPhillipsDomain(cookieName, cookieValue, setExpirationDay) {
    var expiration = null;
    if (setExpirationDay) {
      expiration = this.expirationDays;
    }
    this.setCookie(cookieName, cookieValue, expiration, this.domain(), this.defaultPath);
  }

  setCookie(cname, cvalue, exdays, domain, path) {
    var domain, expires, cookieString;
    cookieString = cname + "=" + cvalue;
    if (exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      expires = "expires=" + d.toUTCString();
      cookieString += "; " + expires;
    }

    //if the domain does not have a dot and is passed to the cookie
    //on ie the cookie won't be set
    if (domain && domain.indexOf('.') > -1) {
      domain = "domain=" + domain;
      cookieString += "; " + domain;
    }
    //if the domain does not have a dot and is passed to the cookie
    //on ie the cookie won't be set
    if (path) {
      path = "path=" + path;
      cookieString += "; " + path;
    }


    document.cookie = cookieString;
  }

  expireCookie(cookieName) {
    this.setCookie(cookieName, "", -10, this.domain(), this.defaultPath);
  }
}

// get cookie information to show on UI

const newCookieManager = new CookieManager();

export default newCookieManager;