import has from 'lodash/has';

const listViewType = (state = 'grid', { meta, payload, type }) => {
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

export {
  listViewType
};
