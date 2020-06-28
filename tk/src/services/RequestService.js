import handleResponse from '../utils/handleresponse';
import apiSettings from '../utils/ApiSettings.decorator';
import TokenManager from '../utils/tokenManager';

@apiSettings
class RequestService {
  tokenManager = new TokenManager()

  submitInquiry(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      },
      body: JSON.stringify(payload)
    };
    // http://localhost:8001/api/trackingapi/inquirerequest
    return fetch(`${this.apiDomain}api/trackingapi/inquirerequest`, options).then(handleResponse);
  }

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
