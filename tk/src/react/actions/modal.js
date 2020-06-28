const showModal = (data, component) => {
  return {
    type: 'OPEN_MODAL',
    payload: {
      component,
      data
    }
  }
}

const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
  }
}

export { showModal, closeModal };
