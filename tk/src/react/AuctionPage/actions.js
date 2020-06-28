import { auctionGridLotRowIds } from './selectors';
import { showModal, hideModal } from '../PhillipsModal/actions';

export const toggleModal = payload => payload.show
  ? showModal(payload)
  : hideModal();

export const setDeviceType = (deviceTypes = ['mobile']) => {
  return {
    type: 'SET_DEVICE_TYPE',
    payload: {
      deviceTypes
    }
  };
};

export const setLanguage = (language = ['us']) => {
  return {
    type: 'SET_LANGUAGE',
    payload: {
      language
    }
  };
};

export const fetchLotWidgetData = amLotRowId => (dispatch, getState) => {
  const gridLotRowIds = auctionGridLotRowIds(getState());
  const index = gridLotRowIds.indexOf(amLotRowId);
  const action = {
    type: 'FETCH_AM_LOT_ROW_ID',
    payload: {
      fetchLotRowIds: gridLotRowIds.slice(index, index + 20)
    }
  };
  dispatch(action);
};

export const toggleCuratedView = (showCuratedView) => {
  return {
    type: 'TOGGLE_CURATED_VIEW',
    payload: { showCuratedView }
  };
};

export const filterSort = (filter, sort, saleNumber, saleType = 'auction') => {
  let action = null;
  if (filter.length > 0 && sort.length > 0) {
    action = { type: 'ROUTES_FILTERSORT', payload: { filter, sort, saleNumber, saleType } };
  } else if (filter.length > 0 && sort.length <= 0) {
    action = { type: 'ROUTES_FILTER', payload: { filter, saleNumber, saleType } };
  } else if (filter.length <= 0 && sort.length > 0) {
    action = { type: 'ROUTES_SORT', payload: { sort, saleNumber, saleType } };
  } else {
    action = { type: 'ROUTES_DEFAULT', payload: { sort, saleNumber, saleType } };
  }
  return action;
};
