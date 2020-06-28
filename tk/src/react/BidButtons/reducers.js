const initialState = {
  offerStatus: '',
  offer: 0,
  timedAuctionLive: false,
  widgetStatus: '',
  error: null
};
const inquireDefault = { status: '', message: '' };
const inquireForm = (state = { status: '', message: '' }, { type, payload }) => {
  switch (type) {
    case 'INQUIRE_PENDING':
      return {
        ...state,
        status: 'pending'
      };
    case 'INQUIRE_ERROR':
      return {
        status: 'error',
        message: payload.message
      };
    case 'INQUIRE_SUCCESS':
      return {
        status: 'success',
        message: payload.message
      };
    case 'MODAL_HIDE':
    case 'CHANGE_LOT':
    case 'CHANGE_LOT_NO_MAKER':
      return state.status.length > 0 ? inquireDefault : state;
    default: return state;
  }
}

const bidButton = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'WIDGET_CONNECT_ERROR':
    case 'WIDGET_CONNECT_FAIL':
      return { ...state, widgetStatus: 'widgetConnectFailure', error: null };
    case 'WIDGET_CONNECT_SUCCESS':
      return { ...state, widgetStatus: 'widgetConnectSuccess', error: null };
    case 'PENDING':
      return { ...state, offerStatus: 'pending', error: null };
    // apiResponse success
    case 'MODAL_SHOW':
      return { ...state, ...payload };
    case 'MODAL_HIDE':
      return { ...state, offerStatus: '' };
    // apiResponse error
    case 'OFFER:ERROR':
      return { ...state, ...payload };
    // LotPage URL CHANGE ACTION
    case 'CHANGE_LOT':
    case 'CHANGE_LOT_NO_MAKER':
      return { ...state, offerStatus: '', error: null };
    default: return state;
  }
};

export { bidButton, inquireForm };

export default bidButton;
