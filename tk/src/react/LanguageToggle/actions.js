
const changeLanguage = (language) => {
  return {
    type: 'CHANGE_LANGUAGE',
    payload: { language },
    query: { language }
  };
};

export { changeLanguage };
