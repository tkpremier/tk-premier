
export default (state = [], { type, makersList }) => {
  let newState;
  switch (type) {
    case 'SET_MAKERS_LIST':
      newState = makersList;
      break;
    default:
      newState = state;
  }
  return newState;
};
