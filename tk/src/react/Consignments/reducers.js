import uniqBy from 'lodash/fp/uniqBy';
import { consignmentFormDefaultState, getSelectedMaker } from './getInitialState';

export const form = (state = consignmentFormDefaultState, { type, payload }) => {
  switch (type) {
    case 'CONSIGN_SUBMIT_ERROR':
      return {
        ...state,
        requestPending: false,
        error: {
          display: true,
          message: payload.message
        }
      };
    case 'CONSIGN_SUBMIT_PENDING':
      return {
        ...state,
        requestPending: true,
        error: {
          ...state.error,
          display: false
        }
      };
    case 'CONSIGN_SUBMIT_SUCCESS':
      return {
        ...state,
        requestPending: false,
        success: {
          display: true,
          message: payload.message
        }
      }
    case 'ADD_IMAGES':
      return {
        ...state,
        files: payload.files,
        images: payload.images
      };
    case 'CHANGE_MEDIUM':
      return { ...state, mediumId: payload.mediumId };
    case 'RESET_FORM':
      return consignmentFormDefaultState;
    case 'USER_CREATE_SUCCESS':
      return {
        ...state,
        userSignup: {
          status: 'success',
          message: `Thank you for joining Phillips Digital, ${payload.firstName}`
        }
      };
    default:
      return state;
  }
}

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
}

export const language = (state = '', { type, payload }) => {
  switch (type) {
    case 'SETLANG':
      return checkLang(payload.language);
    default:
      return state;
  }
}

export const selectedMaker = (state = getSelectedMaker(), { type, payload }) => {
  switch (type) {
    case 'MAKER_SELECTED': {
      return payload;
    }
    default: {
      return state;
    }
  }
}