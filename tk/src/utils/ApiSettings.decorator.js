import cookies from 'cookies-js';

export default function ApiSettings(target) {
  Object.defineProperties(target.prototype, {
    apiDomain: {
      get: () => {
        let apiDomain = 'http://localhost:8001/';
        if (localStorage && localStorage.getItem('apiAddress')) {
          apiDomain = localStorage.getItem('apiAddress');
        } else if (window && cookies.get('apiAddress')) {
          apiDomain = cookies.get('apiAddress');
        }
        return apiDomain;
      }
    },
    authToken: {
      get: () => {
        const tokenKey = '8fe8291d-50c3-4b58-9513-cb34bfbad893';
        let authToken = 'NO_AUTH';
        if (window && cookies.get(tokenKey)) {
          const auth = JSON.parse(atob(cookies.get(tokenKey)));
          authToken = `${auth.token_type} ${auth.access_token}`;
        }
        return authToken;
      }
    }
  });
}
