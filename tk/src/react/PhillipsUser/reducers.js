import filter from 'lodash/fp/filter';
import find from 'lodash/find';
import getErrorMsg from '../../utils/geterrormsg';
import { defaultUserProps } from '../PropTypes/proptypes';

const user = (state = defaultUserProps.user, { type, payload }) => {
  switch (type) {
    case 'USER_LOGIN':
    case 'USER_LOGOUT': {
      return {
        ...state,
        ...payload.user,
        loggedIn: payload.user.id.length > 0,
        name: payload.user.id.length > 0
          ? `${payload.user.firstName} ${payload.user.lastName}`
          : ''
      };
    }
    case 'EDIT_USER_SUCCESS': {
      return {
        ...state,
        ...payload
      };
    }
    case 'CONSIGN_SUBMIT_SUCCESS':
      const [firstName, lastName] = payload.user.name.split(' ');
      return {
        ...state,
        email: payload.user.email,
        name: payload.user.name,
        firstName,
        lastName
      };
    default: {
      return state;
    }
  }
};

const userForm = (state = { status: '', message: '', type: 'signup' }, { type, payload }) => {
  switch (type) {
    case 'USER_CREATE_PENDING':
    case 'USER_LOGIN_PENDING':
      return {
        type: payload,
        status: 'pending',
        message: type === 'USER_LOGIN_PENDING' ? 'Logging in...' : ''
      };
    case 'USER_CREATE_SUCCESS':
      return {
        status: 'success',
        message: `Thank you for joining Phillips Digital, ${payload.firstName}`,
        type: 'signup'
      };
    case 'USER_RESET_PW_SUCCESS':
      return {
        status: 'success',
        message: payload.message,
        type: 'forgot-pw'
      };
    case 'USER_LOGIN':
    case 'USER_LOGOUT':
      return {
        status: '',
        message: ''
      };
    case 'CONSIGN_SUBMIT_SUCCESS': {
      const [firstName, lastName] = payload.user.name.split(' ');
      return {
        ...state,
        email: payload.user.email,
        name: payload.user.name,
        firstName,
        lastName
      };
    }
    case 'USER_RESET_PW_ERROR':
      return {
        status: 'error',
        message: getErrorMsg(payload),
        type: 'forgot-pw'
      };
    case 'USER_CREATE_ERROR':
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        status: 'error',
        message: payload.message
      };
    default: {
      return state;
    }
  }
}

// payload will either be the array of followedMakers when the type is USER_FETCHED
// or a single maker when type is ADD_MAKER or REMOVE_MAKER
const followedMakers = (state = [], { type, payload }) => {
  switch (type) {
    case 'USER_FETCHED':
    case 'USER_LOGOUT':
      return payload.followedMakers;
    case 'ADD_MAKER':
      return [...state, payload];
    case 'REMOVE_MAKER':
      return state.filter(makerId => makerId !== payload);
    default: return state;
  }
};

// payload will either be the array of favoriteLots when the type is USER_FETCHED
// or a single lot when type is ADD_MAKER or REMOVE_MAKER
const favoriteLots = (state = [], { type, payload }) => {
  switch (type) {
    case 'USER_FETCHED':
    case 'USER_LOGOUT':
      return payload.favoriteLots;
    case 'ADD_LOT': {
      const { saleNumber, lotNumber } = payload;
      const favSaleIndex = state.map(({ saleNumber: favSaleNumber }) => favSaleNumber).indexOf(saleNumber);
      const saleObj = favSaleIndex > -1
        ? {
          ...state[favSaleIndex],
          lots: [...state[favSaleIndex].lots, `${lotNumber}`]
        }
        : {
          saleNumber,
          lots: [`${lotNumber}`]
        };
      if (favSaleIndex > -1) {
        state.splice(favSaleIndex, 1, saleObj);
        return [...state];
      }
      return [...state, saleObj];
    }
    case 'REMOVE_LOT': {
      const { saleNumber, lotNumber } = payload;
      const favSaleIndex = state
        .map(({ saleNumber: favSaleNumber }) => favSaleNumber)
        .indexOf(saleNumber);
      const favSale = state[favSaleIndex];
      const lotIndex = favSale.lots.indexOf(lotNumber);
      favSale.lots.splice(lotIndex, 1);
      if (favSale.lots.length > 0) {
        return state.map((sale, i) => i !== favSale ? sale : ({ ...favSale }));
      }
      return state.filter(sale => sale.saleNumber !== saleNumber);
    }
    case 'ERROR_FAVORITE_LOT':
    default:
      return state;
  }
};


const lotLists = (state = [], { type, payload }) => {
  let newState = [];
  switch (type) {
    case 'USER_FETCHED':
    case 'USER_LOGOUT':
      return payload.lotLists.sort((a, b) => a.id < b.id);
    case 'ADD_LOT_LIST': {
      newState = [...state, payload.lotList];
      break;
    }
    case 'ADD_LOT_TO_LIST': {
      const { lotList } = payload;
      newState = state.filter(list => list.id !== lotList.id);
      newState.push(lotList);
      break;
    }
    case 'ERROR_LOT_LIST_ITEM': {
      const { listId, error } = payload;
      const lotList = find(state, list => list.id === listId);
      const filterLotLists = filter(list => list.id !== listId)(state);
      newState = [...filterLotLists, { ...lotList, error }];
      break;
    }
    default: return state;
  }
  return newState.sort((a, b) => a.id < b.id);
};


const error = (state = null, { type, payload }) => {
  switch (type) {
    case 'ERROR_LOT_LIST': return {
      errorType: 'LOT_LIST',
      message: payload.error.message,
      list: payload.list
    };
    case 'ERROR_LOT_LIST_ITEM':
      return {
        errorType: 'LOT_LIST_ITEM',
        message: payload.error.message,
        lotListId: payload.lotListId
      };
    case 'ERROR_FOLLOW_MAKER':
      return {
        errorType: 'FOLLOW_MAKER',
        message: payload.error.message,
        makerId: payload.makerId
      };
    case 'ERROR_FAVORITE_LOT':
      return {
        errorType: 'FAVORITE_LOT',
        message: payload.error.message,
        lot: {
          ...payload.lot,
          lotNumberFull: payload.lot.lotNumber
        }
      };
    case 'ERROR_RESET':
      return null;
    default:
      return state;
  }
};

const recommendedLots = (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_RECOMMENDED_LOTS': return state.length === 0
      && payload.recommendedLots.length === 0
      ? state
      : payload.recommendedLots;
    default: return state;
  }
};

const saleRegistrations = (state = [], { type, payload }) => {
  switch (type) {
    case 'USER_FETCHED':
    case 'USER_LOGOUT':
      return payload.saleRegistrations;
    default:
      return state;
  }
};

export {
  saleRegistrations,
  user,
  userForm,
  recommendedLots,
  followedMakers,
  favoriteLots,
  lotLists,
  error
};
