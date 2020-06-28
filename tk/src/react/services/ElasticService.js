import { isUndefined } from 'lodash/fp';
import handleResponse from '../utils/handleResponse';
import apiSettings from '../utils/ApiSettings.decorator';

const apiClientKey = 'MjZlZTUxMmQtOTU3ZC00OTAyLWIxNDAtNTNiOTZmYjdiY2ExOlBISUxMSVBTV0VCU0lURQ';

const options = {
  "method": 'GET',
  "Authorization" : `basic ${apiClientKey}`
};

@apiSettings
class ElasticService {
  fetchResults({query, searchType}) {

    const url = isUndefined(searchType) ?
      `${this.apiDomain}api/search/${query}` :
      `${this.apiDomain}api/search/${query}/${searchType}`;
    return fetch(url, options)
      .then(handleResponse);
  }
}

export default new ElasticService();
