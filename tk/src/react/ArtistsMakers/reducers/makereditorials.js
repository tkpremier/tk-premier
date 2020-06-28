const makerEditorials = (state = {data: []}, action) => {
  switch (action.type) {
    case 'RECEIVE_POSTS':
      const newState = {...state, data :action.data.makerEditorials.data};
      return newState;
    default:
      return state;
  }
}
export default makerEditorials;
