const formState = (state = { status: '', payload: { formName: '' } }, { type, payload }) => {
  switch (type) {
    case 'EDIT_USER_PENDING':
      return {
        status: 'pending',
        payload
      };
    case 'EDIT_USER_SUCCESS':
      return {
        status: 'success',
        payload
      };
    case 'EDIT_USER_ERROR':
      return {
        status: 'error',
        payload
      }
    case 'CLEAR_FORM_STATUS':
      return {
        status: '',
        payload: {
          formName: ''
        }
      };
    default:
      return state;
  }
}

export {
  formState
};
