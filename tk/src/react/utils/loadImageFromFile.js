
const readImageAsDataURL = (file, successCallBack, errorCallback = error => console.error('error: ', error)) => {
  const fReader = new FileReader();
  fReader.onload = successCallBack;
  fReader.onerror = errorCallback;
  fReader.readAsDataURL(file);
};

export default readImageAsDataURL;
