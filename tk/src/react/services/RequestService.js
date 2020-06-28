import handleResponse from '../utils/handleResponse';

class RequestService {
  submitOffer(offer) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer)
    };
    return fetch('/ConditionRequest/SendOffer', options).then(handleResponse);
  }
  submitConditionReportRequest(request) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: request
    };
    return fetch('/conditionrequest/contact', options).then(handleResponse);
  }
}

export default RequestService;
