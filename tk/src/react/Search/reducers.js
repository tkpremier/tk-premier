import { has } from 'lodash/fp';
import { defaults } from './initialState';


const query = (state = '', { type, payload }) => {
  let newState = state;
  switch (type) {
    case 'ALL_RESULTS_PENDING':
    case 'TYPE_SPECIFIC_PENDING':
      newState = payload.query;
      break;
    default:
      break;
  }
  return newState;
};

const currentType = (state = 'all', { type, payload }) => {
  let newState = state;
  switch (type) {
    case 'FETCH_RESULTS_SUCCESS':
      return payload.currentType;
    default:
      return newState;
  }
};

const makers = (state = defaults.makers, { type, payload  }) => {
  let newState = state;
  switch (type) {
    case 'FETCH_RESULTS_SUCCESS':
      newState = has('makers')(payload) ? { ...state, ...payload.makers } : state;
      break;
    default:
      break;
  }
  return newState;
};

const results = (state = defaults, { type, payload }) => {
  let newState = state;
  switch (type) {
    // case 'TYPE_SPECIFIC':
    //   if (payload.searchType === 'maker') {
    //     console.log('payload: ', payload);
    //   }
    //   break;
    default:
      break;
  }
  return newState;
}

const editorials = (state = defaults.editorials, { type, payload } ) =>  {
  let newState = state;
  switch (type) {
    case 'FETCH_RESULTS_SUCCESS':
      newState = has('editorials')(payload) ? { ...state, ...payload.editorials } : state;
      break;
    default:
      break;
  }
  return newState;
};

const teams = (state = defaults.teams, { type, payload }) =>  {
  let newState = state;
  switch (type) {
    case 'FETCH_RESULTS_SUCCESS':
      newState = has('teams')(payload) ? { ...state, ...payload.teams } : state;
      break;
    default:
      break;
  }
  return newState;
};

const auctions = (state = defaults.auctions, { type, payload }) =>  {
  let newState = state;
  switch (type) {
    case 'FETCH_RESULTS_SUCCESS':
      newState = has('auctions')(payload) ? { ...state, ...payload.auctions } : state;
      break;
    default:
      break;
  }
  return newState;
};

const lots = (state = defaults.lots, { type, payload }) =>  {
  let newState = state;
  switch (type) {
    case 'FETCH_RESULTS_SUCCESS':
      newState = has('lots')(payload) ? { ...state, ...payload.lots } : state;
      break;
    default:
      break;
  }
  return newState;
};

export {
  query,
  currentType,
  makers,
  editorials,
  auctions,
  lots,
  teams
};