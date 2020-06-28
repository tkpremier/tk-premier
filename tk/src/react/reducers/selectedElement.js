
export default (state = null, { type, payload = { selectedElement: null } }) => {
  const { selectedElement } = payload;
  switch (type) {
    case 'SELECT_ELEMENT':
      return selectedElement;
    case 'ELEMENT_SAVE_REQUESTED':
      return { ...state, ...selectedElement };
    default:
      return state;
  }
};
