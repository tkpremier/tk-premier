

export default function (errorType, comparator) {
  return function (error) {
    let match = false;
    if (error && error.errorType === errorType) {
      match = comparator(error);
    }
    return match;
  };
}
