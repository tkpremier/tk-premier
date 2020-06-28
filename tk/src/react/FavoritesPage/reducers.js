import _, { find, filter, reject, isUndefined, isEqual, matches } from 'lodash/fp';
import { user, favoriteLots, followedMakers, lotLists } from '../PhillipsUser/reducers';
import { defaultModalProps } from '../PhillipsModal/proptypes';

const updateLots = (state = [], { payload }) => {
  let sale;
  // get salenumbers of upcoming or past favorite lots
  console.log('updateLots state?: ', state);
  const saleNumbers = state.map(({ saleNumber }) => saleNumber);
  // check if salenumber is in saleNumbers array
  const saleIndex = saleNumbers.indexOf(payload.saleNumber);
  // if it exists
  if (saleIndex > -1) {
    // find the sale
    sale = _.find(s => s.saleNumber === payload.saleNumber)(state);
    // filter out the lot and update lots array
    sale.lots = _.reject(lot => lot.lotNumber.toString() === payload.lotNumber)(sale.lots);
    // add it back into array
    state.splice(saleIndex, 1, sale);
    return [...state];
  }
  return state;
}

const pastFavoriteLots = (state = [], { payload, type }) => {
  let newState = state;
  switch (type) {
    case 'UPDATE_FAVORITE_LOTS':
      newState = updateLots(newState, { payload, type });
      break;
    default:
      break;
  }
  return newState;
}

const upcomingFavoriteLots = (state = [], { payload, type }) => {
  switch (type) {
    case 'UPDATE_FAVORITE_LOTS':
      return updateLots(state, { payload });
    default:
      return state;
  }
}

const editingLotList = (state = { id: null, lots: [], name: '', description: '', status: '' }, { payload, type }) => {
  switch (type) {
    case 'EDIT_LIST_ERROR':
      return { ...state, status: payload.status };
    case 'EDIT_LIST_PENDING':
      return { ...state, id: payload.id, status: payload.status };
    case 'EDIT_LIST_SUCCESS':
      return { id: payload.list.id, lots: [], status: payload.status };
    case 'TOGGLE_EDIT_LIST':
      return {
        ...state,
        id: payload.id === state.id ? null : payload.id,
        lots: [],
        status: payload.status,
        updateProp: payload.updateProp
      };
    case 'UPDATE_EDITING_LOTS':
      const lotInEdits = find(matches(payload.lot))(state.lots);
      const lots = !isUndefined(lotInEdits)
        ? filter(lot => !isEqual(lot)(payload.lot))(state.lots)
        : [...state.lots, payload.lot];
      return { ...state, lots };
    default:
      return state;
  }
}


const userLotList = (state = [], { type, payload }) => {
  switch (type) {
    case 'ADD_LOT_LIST':
    case 'ADD_LOT_TO_LIST':
    case 'REMOVE_LOT_LIST':
      return reject(list => list.id === payload.list.id)(state);
    case 'EDIT_LIST_SUCCESS':
      return state.map(list => list.id === payload.list.id ? payload.list : list);
    default:
      return state;
  }
}

const activeView = (state = 'upcomingFavoriteLots', { payload, type }) => {
  switch (type) {
    case 'SET_ACTIVE_VIEW':
      return payload.viewType;
    default:
      return state;
  }
}

const modal = (state = defaultModalProps, { payload, type }) => {
  switch (type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        show: true,
        component: payload.component,
        data: payload.data,
        status: null,
        error: null
      };
    case 'SHARE_LIST_PENDING':
    case 'DELETE_LIST_PENDING':
      return { ...state, status: 'pending' };
    case 'SHARE_LIST_ERROR':
    case 'DELETE_LIST_ERROR':
      return { ...state, status: 'error', error: payload.err };
    case 'REMOVE_LOT_LIST':
    case 'SHARE_LIST_SUCCESS':
    case 'CLOSE_MODAL':
      return { ...state, show: false, component: null, data: {}, status: null }
    default:
      return state;
  }
};

const rootReducer = {
  user,
  pastFavoriteLots,
  upcomingFavoriteLots,
  userLotList,
  favoriteLots,
  followedMakers,
  lotLists,
  editingLotList,
  activeView,
  modal
};

export default rootReducer;
