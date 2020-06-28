const modal = (state = { show: false, type: '' }, { type, payload }) => {
  switch (type) {
    case 'MODAL_SHOW':
      return {
        ...payload,
        show: true
      };
    case 'MODAL_HIDE':
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}

export { modal };