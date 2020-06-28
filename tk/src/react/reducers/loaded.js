
export default (state = false, { type, loaded }) => {
  let newState = state;
  switch (type) {
    case 'LOADING_FINISHED':
      newState = loaded;
      break;
    default:
      break;
  }
  return newState;
};
