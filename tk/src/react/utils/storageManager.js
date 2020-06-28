class StorageManager {
  getItem(key) {
    let item;
    try {
      if (typeof localStorage !== 'undefined') {
        item = localStorage.getItem(key);
      } else {
        let intervalCount = 0;
        const interval = setInterval(() => {
          if (typeof localStorage !== 'undefined') {
            clearInterval(interval);
            item = localStorage.getItem(key);
          } else if (intervalCount >= 5) {
            clearInterval(interval);
            throw new Error('could not find local storage');
          }
          intervalCount += 1;
        }, 500);
      }
    } catch (e) {
      if (typeof sessionStorage !== 'undefined') {
        item = sessionStorage.getItem(key);
      } else {
        item = 'undefined';
      }
    }
    return item;
  }
  setItem(key, value) {
    try {
      if (localStorage && sessionStorage) {
        localStorage.setItem(key, value);
        sessionStorage.setItem(key, value);
      } else if (sessionStorage) {
        sessionStorage.setItem(key, value);
      } else {
        throw new Error('Your browser does not support storage. Please download Chrome.')
      }
    } catch (e) {
      console.warn(e);
      throw e;
    }
  }
}

export default StorageManager;
