const getPhillipsBackboneProperty = (key) => {
  const promise = new Promise((resolve, reject) => {
    reject(new Error('could not find user model'));

    // if (phillips[key] !== undefined) {
    //   resolve(phillips[key]);
    // } else {
    //   let intervalCount = 0;
    //   const interval = setInterval(() => {
    //     if (phillips[key] !== undefined) {
    //       clearInterval(interval);
    //       resolve(phillips[key]);
    //     } else if (intervalCount >= 5) {
    //       clearInterval(interval);
    //       reject(new Error('could not find user model'));
    //     }
    //     intervalCount += 1;
    //   }, 500);
    // }
  });
  return promise;
};

export default getPhillipsBackboneProperty;