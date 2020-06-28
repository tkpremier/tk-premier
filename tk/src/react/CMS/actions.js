// SELECT_ELEMENT
/*
  Cause: When a user clicks the Edit or Add on a component
  Effect: the selectedElement property of the new state will be set to
    the props of the component selected and showModal will be true.
*/
const selectElement = ({ elementProps, elementType, type }) => {
  return {
    type: 'SELECT_ELEMENT',
    payload: {
      selectedElement: elementProps,
      modal: {
        type: type,
        elementType: elementType,
        visible: true
      }
    }
  };
};

// UNSELECT_ELEMENT
/*
  Cause: When the EditorModal component closes
  Effect: the selectedElement property of the new state will be set to null and
  showModal will be false.
*/
const unselectElement = () => {
  return {
    type: 'UNSELECT_ELEMENT',
    payload: {
      modal: {
        visible: false,
        isRequestPending: false,
        response: {
          status: 200,
          message: ''
        }
      }
    }
  };
};

export {
  selectElement,
  unselectElement
};
