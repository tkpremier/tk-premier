import RequestService from '../../services/RequestService';
import * as modalActionCreator from '../PhillipsModal/actions';

const requestService = new RequestService();

export const inquireReset = () => ({
  type: 'INQUIRE_RESET'
});
const inquirePending = () => ({
  type: 'INQUIRE_PENDING'
});
const inquireSuccess = payload => ({
  type: 'INQUIRE_SUCCESS',
  payload
});
const inquireError = payload => ({
  type: 'INQUIRE_ERROR',
  payload
});
export const privateSalesInquire = payload => (dispatch) => {
  dispatch(inquirePending());
  requestService.submitInquiry(payload)
    .then(res => dispatch(inquireSuccess(res)))
    .catch(err => dispatch(inquireError(err)));
};
const offerSuccess = payload => modalActionCreator.showModal({
  ...payload,
  showTerms: false,
  type: 'offer'
});

const offerPending = payload => ({
  type: 'PENDING',
  payload
});

const offerError = payload => ({
  type: 'OFFER:ERROR',
  payload
});

export const widgetConnect = payload => ({ type: `WIDGET_CONNECT_${payload.toUpperCase()}` });

export const offerReject = payload => modalActionCreator.showModal({ ...payload, type: 'offer' });

export const submitOffer = ({ offerData, payload }) => (dispatch) => {
  dispatch(offerPending());
  requestService.submitOffer(offerData)
    .then(() => {
      dispatch(offerSuccess({
        ...payload,
        offerStatus: 'received',
        error: null
      }));
    })
    .catch((error) => {
      dispatch(offerError({
        ...payload,
        offer: 0,
        offerStatus: 'error',
        error: error
      }));
    });
};
