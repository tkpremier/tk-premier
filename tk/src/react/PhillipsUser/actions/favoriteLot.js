import UserService from '../../../services/UserService';

const userService = new UserService();

const addLot = payload => ({
  type: 'ADD_LOT',
  payload
});

const removeLot = payload => ({
  type: 'REMOVE_LOT',
  payload
});

const favoriteLotError = payload => ({
  type: 'ERROR_FAVORITE_LOT',
  payload
});

const saveLot = (userId, lot) => dispatch => userService
  .saveLot(userId, lot)
  .then(() => dispatch(addLot(lot)))
  .catch(error => dispatch(favoriteLotError({ error, lot })));

const deleteLot = (userId, lot) => dispatch => userService
  .deleteLot(userId, lot)
  .then(() => dispatch(removeLot(lot)))
  .catch(error => dispatch(favoriteLotError({ error, lot })));

export {
  addLot,
  removeLot,
  saveLot,
  deleteLot
};
