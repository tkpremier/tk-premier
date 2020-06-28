/* eslint-disable class-methods-use-this */
import handleResponse from '../utils/handleResponse';
import { getPhillipsCmsDomain } from '../utils/PhillipsSettings';
import apiSettings from '../utils/ApiSettings.decorator';


@apiSettings
class ConsignmentService {
  postData(formData) {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    };
    return fetch(`${this.apiDomain}api/consignment`, options).then(handleResponse);
  }

  postImages({ email, title, files }) {
    const data = new FormData();
    data.append('email', email);
    data.append('title', title);
    files.forEach((file, i) => data.append(`file-${i}`, file));
    const options = {
      method: 'POST',
      contentType: 'multipart/form-data',
      body: data
    };
    return fetch(`${this.apiDomain}api/consignment/image`, options).then(handleResponse);
  }

  getMakers(searchQuery) {
    return fetch(`${this.apiDomain}api/lookup/searchMaker/${searchQuery}?isconsignmentmaker=true`).then(handleResponse);
  }
}

export default new ConsignmentService();
