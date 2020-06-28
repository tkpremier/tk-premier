import 'fetch-ponyfill';
import handleResponse from '../utils/handleResponse';
import apiSettings from '../utils/ApiSettings.decorator';

const options = {
  method: 'POST',
  headers: {
    'Authorization': 'basic MjZlZTUxMmQtOTU3ZC00OTAyLWIxNDAtNTNiOTZmYjdiY2ExOlBISUxMSVBTV0VCU0lURQ==',
  }
};

@apiSettings
class NewsletterService {
  saveEmailToNewsletter({ email, departmentId }) {
    const hasDeptId = departmentId && !isNaN(parseInt(departmentId, 10)) ?
      `&departmentId=${parseInt(departmentId, 10)}` :
      '';
    return fetch(`${this.apiDomain}api/universalaccount/saveemailsignup?email=${email}${hasDeptId}`, options)
      .then(handleResponse);
  }
}

export default new NewsletterService();