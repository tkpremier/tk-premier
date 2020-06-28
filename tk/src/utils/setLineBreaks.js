const lineBreakTest = /(?:\r\n|\r|\n)/g;

const setLineBreaks = (str) => {
  if (str && typeof str === 'string') {
    return str.replace(lineBreakTest, '<br />');
  }
  return str;
};

export default setLineBreaks;