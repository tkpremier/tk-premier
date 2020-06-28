const allDeviceTypes = [
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
]

const handleMql = (query, cb) => {
  const mql = window.matchMedia(query);
  if (mql.addListener) {
    mql.addListener(cb);
  }
  cb(mql);
  return mql;
};

// possible values: 'mobile', 'tablet', 'desktop'
export const getDeviceType = (cb) => {
  const deviceTypes = allDeviceTypes.filter(({query}) => {
    return window.matchMedia(query);
  }).map(({ type }) => type);
  cb(deviceTypes);
}

export default handleMql;
