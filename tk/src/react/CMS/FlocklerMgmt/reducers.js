import { defaultEditorialProps } from '../../PropTypes/proptypes';

const activeView = (state = 'table', { type, payload }) => {
  switch (type) {
    case 'SELECT_ITEM_SUCCESS':
      return 'form';
    default:
      return state;
  }
}

const data = (state = []) => state;

const formStatus = (state = {
  pending: false,
  msg: ''
}, { type, payload }) => {
  switch (type) {
    case 'EDITORIAL_CAROUSEL_ERROR':
    case 'UPDATE_ITEM_ERROR':
    case 'SELECT_ITEM_ERROR':
      return {
        pending: false,
        msg: `There was an error: ${payload}. Please contact an engineer, or try again later.`
      };
    case 'EDITORIAL_CAROUSEL_SUCCESS':
    case 'UPDATE_ITEM_SUCCESS':
      return {
        pending: false,
        msg: 'Editorial Updated Successfully.'
      };
    case 'SELECT_ITEM_SUCCESS':
      return {
        pending: false,
        msg: 'Editorial Fetched.'
      };
    case 'SELECT_ITEM_PENDING':
      return {
        pending: true,
        msg: 'Fetching Editorial.'
      };
    case 'EDITORIAL_CAROUSEL_PENDING':
    case 'UPDATE_ITEM_PENDING':
      return {
        pending: true,
        msg: 'Updating'
      };
    default: return state;
  }
}

const selectedEditorial = (state = defaultEditorialProps, { type, payload }) => {
  switch (type) {
    case 'EDITORIAL_CAROUSEL_SUCCESS':
      return {
        ...state,
        carousels: [payload]
      };
    case 'UPDATE_ITEM_SUCCESS':
      return {
        ...state,
        ...payload
      };
    case 'SELECT_ITEM_PENDING':
    case 'SELECT_ITEM_SUCCESS':
      return payload;
    default:
      return state;
  }
}

export {
  activeView,
  data,
  formStatus,
  selectedEditorial
};
