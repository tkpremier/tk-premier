import UserService from '../../../services/UserService';

const userService = new UserService();

const errorReset = () => ({ type: 'ERROR_RESET' });

const errorLotList = (error, list) => ({
  type: 'ERROR_LOT_LIST',
  payload: {
    error,
    list
  }
});

const errorLotToList = (error, listId) => {
  return {
    type: 'ERROR_LOT_LIST_ITEM',
    payload: {
      error,
      listId
    }
  };
};

const deleteLotListError = (error, listId) => (dispatch) => {
  dispatch(errorLotToList(error, listId));
  setTimeout(() => dispatch(errorReset()), 2000);
};

const saveLotListError = (error, list) => (dispatch) => {
  dispatch(errorLotList(error, list));
  setTimeout(() => dispatch(errorReset()), 2000);
};


const saveLotToLotListError = (error, listId) => {
  return (dispatch) => {
    dispatch(errorLotToList(error, listId));
    setTimeout(() => dispatch(errorReset()), 2000);
  };
};

const addLotList = lotList => ({
  type: 'ADD_LOT_LIST',
  payload: { lotList }
});

const removeLotList = id => ({
  type: 'REMOVE_LOT_LIST',
  payload: {
    list: { id }
  }
});

const saveLotList = ({ userId, list }) => dispatch => userService
  .saveLotList(userId, list)
  .then(lotList => dispatch(addLotList(lotList)))
  .catch(error => dispatch(saveLotListError(error, list)));

const deleteLotList = ({ userId, listId }) => dispatch => userService
  .deleteLotList(userId, listId)
  .then(() => dispatch(removeLotList(listId)))
  .catch(err => dispatch(deleteLotListError(err, listId)));

const addLotToLotList = lotList => ({
  type: 'ADD_LOT_TO_LIST',
  payload: { lotList }
});

const saveLotToLotList = ({ userId, listId, lot }) => dispatch => userService
  .saveLotToList(userId, listId, lot)
  .then(lotList => dispatch(addLotToLotList(lotList)))
  .catch(error => dispatch(saveLotToLotListError(error, listId)));

const removeLotFromLotList = lotList => ({
  type: 'REMOVE_LOT_FROM_LIST',
  payload: { lotList }
});

export {
  addLotList,
  saveLotList,
  addLotToLotList,
  saveLotToLotList,
  deleteLotList,
  removeLotFromLotList,
  removeLotList
};
