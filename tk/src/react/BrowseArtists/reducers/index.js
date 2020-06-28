import { combineReducers } from 'redux';
import { getCurrent } from './makerslist';

const letter = (state = '', action) => {
  let newLetter = state;
  switch(action.type) {
    case 'UPDATE_PENDING':
    case 'RECEIVE_MAKERS_SUCCESS':
      if (action.letter !== newLetter) {
        newLetter = action.letter;
      }
      break;
    default:
      break;
  }
  return newLetter;
}

const data = (state = [], action) => {
  let newState = state;
  switch(action.type) {
    case 'UPDATE_PENDING':
      break;
    case 'RECEIVE_MAKERS_SUCCESS':
      if (action.fetchedMore) {
        newState = _.union(state, action.data.data)
      } else {
        newState = action.data.data;
      }
      break;
    default:
      break;
  }
  return newState;
}

const isFetching = (state = {initial: false, more: false}, action) => {
  let newState = state;
  switch(action.type) {
    case 'UPDATE_PENDING':
      if (action.fetchedMore) {
        newState = {initial: false, more: true};
      } else {
        newState = {initial: true, more: false};
      }
      break;
    case 'RECEIVE_MAKERS_SUCCESS':
      newState = {initial: false, more: false};
      break;
    default:
      break;
  }
  return newState;
}

const currentCount = (state = 0, action) => {
  let newState = state;
  switch(action.type) {
    case 'UPDATE_PENDING':
      if (!action.fetchedMore) {
        newState = 0;
      }
      break;
    case 'RECEIVE_MAKERS_SUCCESS':
      newState = getCurrent(action.data);
      break;
    default:
      break;
  }
  return newState;
}


const totalCount = (state = 0, action) => {
  let newState = state;
  switch(action.type) {
    case 'UPDATE_PENDING':
      if (!action.fetchedMore) {
        newState = 0;
      }
      break;
    case 'RECEIVE_MAKERS_SUCCESS':
      newState = action.data.totalCount;
      break;
    default:
      break;
  }
  return newState;
}

export const search = (state = { options: [], currentValue: '' }, action) => {
  switch (action.type) {
    case 'SEARCH_MAKER_PENDING':
      return {
        ...state,
        currentValue: action.currentValue,
        options: [{ 'makerId': null, 'makerName': 'Pending' }]
      };
    case 'SEARCH_MAKER_SUCCESS':
      return {
        ...state,
        currentValue: action.currentValue,
        options: action.makers
      };
    case 'SEARCH_MAKER_ERROR':
      return {
        ...state
      };
    default:
      return {
        ...state,
        currentValue: action.currentValue
      };
  }
}

export const currentPage = (state = 1, action) => {
  let newState = state;
  switch (action.type) {
    case 'UPDATE_PENDING':
      if (action.fetchedMore) {
        newState = action.page;
      } else {
        newState = 1;
      }
      break;
    default:
      break;
  }
  return newState;
}

const rootReducer = combineReducers({
  letter,
  data,
  isFetching,
  currentCount,
  totalCount,
  search,
  currentPage
});

export default rootReducer;
