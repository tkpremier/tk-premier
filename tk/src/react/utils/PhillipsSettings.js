import cookies from 'cookies-js';

const getPhillipsApiDomain = () => {
  let apiDomain = null;
  if (localStorage.getItem('apiAddress')) {
    apiDomain = localStorage.getItem('apiAddress');
  }
  if (cookies.get('apiAddress')) {
    apiDomain = cookies.get('apiAddress');
  }
  return apiDomain || new Error('apiAddress not found');
};

const getPhillipsCmsDomain = () => {
  let apiDomain = null;
  if (localStorage.getItem('cmsAddress')) {
    apiDomain = localStorage.getItem('cmsAddress');
  }
  if (cookies.get('cmsAddress')) {
    apiDomain = cookies.get('cmsAddress');
  }
  return apiDomain || new Error('cmsAddress not found');
};

const getApiAuthToken = () => {
  const tokenKey = '8fe8291d-50c3-4b58-9513-cb34bfbad893';
  const encodedToken = cookies.get(tokenKey);
  return JSON.parse(atob(encodedToken));
};

const setAuthHeader = () => {
  const { access_token, token_type } = getApiAuthToken();
  return `${token_type} ${access_token}`;
};

export {
  getPhillipsApiDomain,
  getPhillipsCmsDomain,
  getApiAuthToken,
  setAuthHeader
};
