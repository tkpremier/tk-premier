
class StorageManager {
  getItem(key) {
    let item;
    try {
      if (!localStorage) {
        throw new Error('localStorage not supported');
      }
      item = localStorage.getItem(key);
    } catch (e) {
      item = sessionStorage.getItem(key);
    }
    return item;
  }
  setItem(key, value) {
    console.log(key, value);
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

export default new StorageManager();
