const getAmWidget = () => {
  const promise = new Promise((resolve, reject) => {
    if (typeof amw !== 'undefined') {
      resolve(amw.default);
    } else {
      let intervalCount = 0;
      const interval = setInterval(() => {
        if (typeof amw !== 'undefined') {
          clearInterval(interval);
          resolve(amw.default);
        } else if (intervalCount >= 5) {
          clearInterval(interval);
          reject(new Error('could not find Am LotWidget'));
        }
        intervalCount += 1;
      }, 500);
    }
  });
  return promise;
};

export default getAmWidget;
