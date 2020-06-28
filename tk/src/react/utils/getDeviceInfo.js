import bindMoreArgs from './bindMoreArgs';

export const allDeviceTypes = [
  {
    'type': 'mobile',
    'query': 'screen and (min-width: 1px)'
  },
  {
    'type': 'tablet',
    'query': 'screen and (min-width: 480px)'
  },
  {
    'type': 'desktop',
    'query': 'screen and (min-width: 768px)'
  }
];

export const bindCb = (e, cb) => {

  const deviceInfo = {
    deviceTypes: [],
    isMobile: false,
    isTablet: true,
    isDesktop: true
  };
  deviceInfo.deviceTypes = allDeviceTypes.filter(({ query }) => {
    const mql = window.matchMedia(query);
    mqlListeners.push(mql);
    return mql.matches;
  }).map(({ type }) => type);
  cb(deviceInfo);
};

/**
 * 
 * @param {function} [cb] - optional callback function to call on any change event
 */
const getDeviceInfo = (cb = null) => {
  const deviceInfo = {
    deviceTypes: [],
    isMobile: false,
    isTablet: true,
    isDesktop: true
  };
  const mqlListeners = [];
  deviceInfo.deviceTypes = allDeviceTypes.filter(({ query }) => {
    const mql = window.matchMedia(query);
    mqlListeners.push(mql);
    return mql.matches;
  }).map(({ type }) => type);
  deviceInfo.isMobile = deviceInfo.deviceTypes.indexOf('mobile') > -1 && deviceInfo.deviceTypes.length === 1;
  deviceInfo.isTablet = deviceInfo.deviceTypes.indexOf('tablet') > -1;
  deviceInfo.isDesktop = deviceInfo.deviceTypes.indexOf('desktop') > -1;
  if (cb !== null) {
    const cbWithInfo = bindMoreArgs(cb, deviceInfo);
    mqlListeners.forEach((mql) => {
      if (mql.addListener) {
        mql.addListener(cbWithInfo);
      }
    });
  }
  return deviceInfo;
};

export default getDeviceInfo;
