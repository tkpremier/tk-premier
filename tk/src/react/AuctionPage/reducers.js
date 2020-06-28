import has from 'lodash/has';
import uniq from 'lodash/uniq';

const defaultDeviceInfo = {
  deviceTypes: [
    'mobile',
    'tablet',
    'desktop'
  ],
  isMobile: false,
  isTablet: true,
  isDesktop: true
};

const defaultLanguage = 'en';

export const auction = (state = {}) => state;

export const sortQuery = (state = '', { type, payload }) => {
  switch (type) {
    case 'ROUTES_DEFAULT':
    case 'ROUTES_FILTER':
      return '';
    case 'ROUTES_SORT':
    case 'ROUTES_FILTERSORT':
      return payload.sort;
    default:
      return state;
  }
};

export const filter = (state = '', { type, payload }) => {
  switch (type) {
    case 'ROUTES_DEFAULT':
    case 'ROUTES_SORT':
      return '';
    case 'ROUTES_FILTER':
    case 'ROUTES_FILTERSORT':
      return payload.filter;
    default:
      return state;
  }
};

export const fetchLotRowIds = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_AM_LOT_ROW_ID':
      return payload.fetchLotRowIds;
    case 'TOGGLE_LIST_VIEW':
      return state.length === 0 ? state : [];
    case 'ROUTES_DEFAULT':
    case 'ROUTES_FILTER':
    case 'ROUTES_SORT':
    case 'ROUTES_FILTERSORT':
      return state.length === 0 ? state : [];
    default:
      return state;
  }
};

export const fetchedLotRowIds = (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_AM_LOT_ROW_ID':
      return uniq(state.concat(payload.fetchLotRowIds));
    case 'TOGGLE_LIST_VIEW':
      return state.length === 0 ? state : [];
    case 'ROUTES_DEFAULT':
    case 'ROUTES_FILTER':
    case 'ROUTES_SORT':
    case 'ROUTES_FILTERSORT':
      return state.length === 0 ? state : [];
    default:
      return state;
  }
};

export const listViewType = (state = 'grid', { meta, payload, type }) => {
  switch (type) {
    case 'ROUTES_FILTER':
    case 'ROUTES_SORT':
    case 'ROUTES_FILTERSORT':
      return state === 'grid' ? state : 'grid';
    case 'ROUTES_DEFAULT':
      return has(meta, 'query')
        ? meta.query.previewCuratedAuction
          ? 'catalogue'
          : state
        : state;
    case 'TOGGLE_LIST_VIEW':
      return payload === state ? state : payload;
    default:
      return state;
  }
};
export const deviceInfo = (state = defaultDeviceInfo, { type, payload }) => {
  switch (type) {
    case 'SET_DEVICE_TYPE':
      return payload.deviceTypes;
    default:
      return state;
  }
};

export const language = (state = defaultLanguage, { type, payload }) => {
  switch (type) {
    case 'ROUTES_LANGUAGE':
    case 'SET_LANGUAGE':
      return state === payload.language ? state : payload.language;
    default:
      return state;
  }
};

export const isExhibitionLanding = (state = {}) => state;

export const urlQueries = (state = { filter: '', sort: '' }, { type, payload }) => {
  switch (type) {
    case 'ROUTES_DEFAULT':
      return { filter: '', sort: '' };
    case 'ROUTES_FILTERSORT':
    case 'ROUTES_FILTER':
    case 'ROUTES_SORT':
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
