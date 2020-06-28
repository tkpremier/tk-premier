export const validateLength = (value = '') => value.length > 0;

export const validatePassword = (value = '') => {
  // check for at least 8 characters, one upper, one lower, and number
  const pwRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
  return value.length > 0
    ? pwRegex.test(value)
    : false;
};

export const validateConfirmPassword = ({ password = '', confirmPassword = '' }) => {
  return confirmPassword.length > 0
    ? password === confirmPassword
    : false;
}

export const validateEmail = (value = '') => {
  const emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm);
  return value.length > 0
    ? emailRegex.test(value)
    : false;
};