const checkEnabled = (label = '', filterParameter = '') => {
  let enabled = false;
  if (filterParameter.length > 0) {
    const filterArray = filterParameter.split('~');
    enabled = filterArray.reduce((prev, curr) => {
      if (curr.indexOf(label) === 0) {
        return true;
      }
      return prev;
    }, false);
  }
  return enabled;
};

export default checkEnabled;
