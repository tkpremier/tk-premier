const initalState = {
  type: 'add',
  visible: false,
  isRequestPending: false,
  elementType: 'default',
  response: {
    status: 200,
    Message: ''
  }
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case 'SELECT_ELEMENT':
    case 'UNSELECT_ELEMENT':
    case 'ELEMENT_SAVE_REQUESTED':
    case 'ELEMENT_SAVE_FAIL':
    case 'ELEMENT_SAVE_SUCCESS':
      return { ...state, ...payload.modal };
    default:
      return state;
  }
};
