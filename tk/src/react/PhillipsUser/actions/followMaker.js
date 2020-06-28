import UserService from '../../../services/UserService';

const userService = new UserService();

const addMaker = payload => ({
  type: 'ADD_MAKER',
  payload
});

const removeMaker = payload => ({
  type: 'REMOVE_MAKER',
  payload
});

const followMakerError = (error, makerId) => ({
  type: 'ERROR_FOLLOW_MAKER',
  payload: {
    error,
    makerId
  }
});
const saveMaker = (userId, makerId) => dispatch => userService
  .saveMaker(userId, makerId)
  .then(() => dispatch(addMaker(makerId)))
  .catch(error => dispatch(followMakerError(error, makerId)));

const deleteMaker = (userId, makerId) => dispatch => userService
  .deleteMaker(userId, makerId)
  .then(() => dispatch(removeMaker(makerId)))
  .catch(error => dispatch(followMakerError(error, makerId)));

export {
  addMaker,
  removeMaker,
  saveMaker,
  deleteMaker
};
