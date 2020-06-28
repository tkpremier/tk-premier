import has from 'lodash/has';
import isNull from 'lodash/isNull';

const findInnerError = (responseJSON, errors) => {
  if (typeof responseJSON !== 'undefined') {
    if (isNull(responseJSON.innerError)) {
      return errors;
    }
    errors.push(responseJSON.innerError.message);
    return findInnerError(responseJSON.innerError, errors);
  }
  return 'Undefined error';
};
const getErrorMsg = (responseJSON) => {
  const errors = [];
  const errorKey = has(responseJSON, 'error_description')
    ? 'error_description'
    : 'message';
  let errorsStr = '';
  errors.push(responseJSON[errorKey]);
  if (has(responseJSON, 'innerError') && !isNull(responseJSON.innerError)) {
    findInnerError(responseJSON.innerError, errors);
  }
  errorsStr += errors.join('. ');
  return errorsStr;
};

export default getErrorMsg;
