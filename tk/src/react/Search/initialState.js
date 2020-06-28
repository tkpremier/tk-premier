import { isUndefined, mapValues } from 'lodash/fp';
import createInitialUserState from '../PhillipsUser/createInitialUserState';


// get totalCount when it's your searchType
export const defaults = {
  makers: {
    results: [],
    type: 'maker',
    title: 'Artists & Makers',
    count: 3,
    totalCount: 0
  },
  lots: {
    results: [],
    type: 'lot',
    title: 'Lots',
    count: 3,
    totalCount: 0
  },
  auctions: {
    results: [],
    type: 'auction',
    title: 'Auctions',
    count: 2,
    totalCount: 0
  },
  teams: {
    results: [],
    type: 'team',
    title: 'Team',
    count: 3,
    totalCount: 0
  },
  editorials: {
    results: [],
    type: 'editorial',
    title: 'Editorials',
    count: 2,
    totalCount: 0
  }
};

const initialState = ({ query, currentType, data, userDetails }) => {
  let initData = {};
  if (currentType !== 'all') {
    defaults[`${currentType}s`] = { ...defaults[`${currentType}s`], ...data };
    initData = defaults;
  } else {
    console.log('currentType: ', currentType);
    initData = Object.keys(data).reduce((obj, key) => {
      if (!isUndefined(data[key])) {
        obj[key] = { ...defaults[key], ...data[key] };
      }
      return obj;
    }, {});
  }
  return {
    query,
    currentType,
    ...initData,
    ...createInitialUserState(JSON.parse(userDetails))
  };
};

export default initialState;
