const manageMakerItem = (state = {editor: {status: 'closed', id: null, carouselId: null}}, action) => {
  switch(action.type) {
    case 'ADD_MAKER':
      return state;
      break;
    case 'EDIT_MAKER':
      return { ...state, editor: {status: 'edit', keyId: action.keyId, carouselId: action.carouselId}};
      break;
    case 'OPEN_DELETE':
      return { ...state, editor: {status: 'delete', keyId: action.keyId, carouselId: action.carouselId}};
      break;
    default:
      return state;
  }
};
export default manageMakerItem;
