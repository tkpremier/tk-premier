
const currentLanguage = (state = 'en-US', { type, payload }) => {
  let nextState = '';
  switch (type) {
    case 'CHANGE_LANGUAGE': {
      nextState = payload.language;
      break;
    }
    default: {
      nextState = state;
    }
  }
  return nextState;
};

export { currentLanguage };
