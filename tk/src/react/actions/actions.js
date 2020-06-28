import { saveElement, deleteElement } from '../services/httpservice';

// ELEMENT_SAVE_REQUESTED
/*
  Cause: When an POST or PUT Ajax request is made
  Effect: this sets the states isRequestPending to true so we can display a spinner
  or some loading effect.
*/
const saveRequested = (data) => {
  return {
    type: 'ELEMENT_SAVE_REQUESTED',
    payload: {
      selectedElement: data,
      modal: { isRequestPending: true }
    }
  };
};

// ELEMENT_SAVE_FAIL
/*
  Cause: When an POST or PUT Ajax request is completed unsuccessfully
  Effect: the new state's modal.response property with be populated with the errors
  status code and error message to be displayed on the modal.
*/
const elementSaveFail = (error) => {
  return {
    type: 'ELEMENT_SAVE_FAIL',
    payload: {
      modal: {
        visible: true,
        isRequestPending: false,
        response: {
          status: error.status || 400,
          message: error.message
        }
      }
    }
  };
};

// ELEMENT_SAVE_SUCCESS
/*
  Cause: When an POST or PUT Ajax request is completed successfully
  Effect: the new states elements property will be be set to the data recieved from
    the ajax response and well set the modal.response property to display a success message
    return from the server.
*/
const saveSuccess = (res, deleted = false) => {
  return {
    type: 'ELEMENT_SAVE_SUCCESS',
    payload: {
      res,
      isRequestPending: false,
      modal: {
        visible: true,
        isRequestPending: false,
        response: {
          status: 200,
          message: `${res.elementType} ${deleted ? 'deleted' : 'saved'} successfully`
        }
      }
    }
  };
};

const elementSave = (elementType, data) => (dispatch) => {
  dispatch(saveRequested(data));
  return saveElement(elementType, data)
    .then(res => dispatch(saveSuccess({ ...res, elementType }, false)))
    .catch((error) => {
      console.error('error', error);
      dispatch(elementSaveFail(error));
    });
};

const elementDelete = (elementType, data) => {
  return (dispatch) => {
    dispatch(saveRequested(data));
    return deleteElement(elementType, data)
      .then((res) => {
        if (res.hasOwnProperty('errorCode')) {
          throw new Error(res.message);
        }
        dispatch(saveSuccess({ ...res, elementType }, true));
      })
      .catch((error) => {
        console.error('error', error);
        dispatch(elementSaveFail(error));
      });
  };
};

// CHANGE_HERO_INDEX
/*
  Cause: When a user either clicks othe squares in the caption box.
  Effect: The currentHeroIndex of the new state will be set to the index of the square clicked.
*/
const changeHeroIndex = (index) => { return { type: 'CHANGE_HERO_INDEX', index }; };

const setMakersList = (makersList) => { return { type: 'SET_MAKERS_LIST', makersList }; };

const loaded = (isLoaded) => { return { type: 'LOADING_FINISHED', loaded: isLoaded }; };

export {
  elementSave,
  elementDelete,
  changeHeroIndex,
  setMakersList,
  loaded
};
