import CookieManager from './cookieManager';
import base64 from './base64EncodeDecode';

const SettingsManager = {
  apiUrl(url) {
    // The apiAddress local storage key is set on the Master2014.cshtml view
    // I know it's awful but it's the best I could think of in that moment.
    // Cristian Suarez 5/12/16
    const keyName = _.isUndefined(url) ? 'apiAddress' : url;
    // if the key is not set on localStorage get it from the cookiess
    if (localStorage.getItem(keyName)) {
      return localStorage.getItem(keyName);
    }
    return CookieManager.getCookie(keyName);
  },
  stripeKey() {
    const keyName = 'stripePubKey';

    if (localStorage.getItem(keyName)) {
      const stripeKey = localStorage.getItem(keyName);
      return base64.decode(stripeKey);
    }

    console.error('Stripe publishable key not found');
    return false;
  },
  domainUrl() {
    const keyName = 'domainUrl';

    if (localStorage.getItem(keyName)) {
      const domainKey = localStorage.getItem(keyName);
      return domainKey;
    }

    console.error('cookie domain not found on local storage.');
    return '';
  }
};
export default SettingsManager;
