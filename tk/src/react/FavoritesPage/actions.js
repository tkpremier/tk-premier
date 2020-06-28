import 'fetch-ponyfill';
import { filter, isEqual, isUndefined, find } from 'lodash/fp';
import UserService from '../../services/UserService';

const userService = new UserService();

export const setLotListToBBColl = (lotList) => {
  return {
    lotList: lotList,
    type: 'LOT_LISTS_BACKBONED'
  }
}

export const toggleEditLotList = (enableEdit, id, updateProp) => ({
  type: 'TOGGLE_EDIT_LIST',
  payload: {
    id,
    status: enableEdit === 'true' ? 'editing' : '',
    updateProp
  }
});

export const updateFavoriteLots = (saleNumber, lotNumber) => ({
  type: 'UPDATE_FAVORITE_LOTS',
  payload: {
    lotNumber,
    saleNumber
  }
});


export const updateEditingLots = ({ saleNumber, lotNumberFull }) => ({
  type: 'UPDATE_EDITING_LOTS',
  payload: {
    lot: {
      saleNumber,
      lotNumberFull
    }
  }
});


export const handleListSync = (list, response) => (dispatch) => {
  if (typeof response === 'string' && response.indexOf('deleted') > -1) {
    dispatch(deleteListSuccess(list.get('id')));
  } else {
    dispatch(editListSuccess(list));
  }
};


export const setActiveView = viewType => ({
  type: 'SET_ACTIVE_VIEW',
  payload: {
    viewType
  }
});

const shareListPending = () => ({ type: 'SHARE_LIST_PENDING' });

const shareListSuccess = id => ({
  type: 'SHARE_LIST_SUCCESS',
  payload: { id }
});

const shareListError = err => ({
  type: 'SHARE_LIST_ERROR',
  payload: { err }
});

export const shareList = () => dispatch => dispatch(shareListPending());

const deleteListPending = () => ({
  type: 'DELETE_LIST_PENDING'
});

export const deleteListSuccess = id => ({
  type: 'DELETE_LIST_SUCCESS',
  payload: { id }
});

export const deleteListError = err => ({
  type: 'DELETE_LIST_ERROR',
  payload: { err }
});

const editListPending = (id) => {
  return {
    type: 'EDIT_LIST_PENDING',
    payload: { id, status: 'pending' }
  }
}

export const editListSuccess = list => ({
  type: 'EDIT_LIST_SUCCESS',
  payload: { list, status: 'success' }
});

const editListError = error => ({
  type: 'EDIT_LIST_ERROR',
  payload: { error, status: 'error' }
});

export const editListRequest = data => (dispatch, getState) => {
  dispatch(editListPending(data.id));
  const { editingLotList, user, userLotList } = getState();
  const oldList = find(list => list.id === editingLotList.id)(userLotList);
  const lots = editingLotList.updateProp === 'lots'
    ? filter((lot) => {
      const { saleNumber, lotNumberFull } = lot;
      const lotSample = {
        saleNumber,
        lotNumberFull
      };
      return isUndefined(find(editingLot => isEqual(lotSample)(editingLot))(editingLotList.lots));
    })(data.lots)
    : oldList.lots;
  userService.saveLotList(user.id, { ...oldList, ...data, lots })
    .then(resp => dispatch(editListSuccess(resp)))
    .catch(err => dispatch(editListError(err)));
};
