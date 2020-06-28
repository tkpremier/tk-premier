
export default (state = 0, { type, index }) => {
  let newState;
  switch (type) {
    case 'CHANGE_HERO_INDEX':
      newState = index;
      break;
    default:
      newState = state;
  }
  return newState;
};
