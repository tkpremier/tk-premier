import { uniqBy } from 'lodash/fp';
import { buySellDefaultState, getSelectedMaker } from './getInitialState';

export const form = (state = buySellDefaultState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export const countries = (state = []) => state;

export const makers = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_MAKERS_SUCCESS': {
      return uniqBy(m => m.makerId)([...payload.makers]);
    }
    case 'FETCH_MAKERS_ERROR': {
      return payload.makers;
    }
    case 'TYPEAHEAD_BLUR':
    case 'MAKER_SELECTED':
      return [];
    default: {
      return state;
    }
  }
};

const checkLang = (lang) => {
  const language = lang.toUpperCase() === 'CH' ? 'ch' : 'en';
  return language;
};

export const language = (state = '', { type, payload }) => {
  switch (type) {
    case 'SETLANG':
      return checkLang(payload.language);
    default:
      return state;
  }
};

export const selectedMaker = (state = getSelectedMaker(), { type, payload }) => {
  switch (type) {
    case 'MAKER_SELECTED': {
      return payload;
    }
    default: {
      return state;
    }
  }
};
