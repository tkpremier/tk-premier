const showModal = payload => ({
  type: 'MODAL_SHOW',
  payload
});

const hideModal = () => ({ type: 'MODAL_HIDE' });

export { showModal, hideModal };