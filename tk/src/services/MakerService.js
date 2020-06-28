import handleResponse from '../utils/handleresponse';
import apiSettings from '../utils/ApiSettings.decorator';

@apiSettings
class MakerService {
  getMakerByName(query) {
    return fetch(`${this.apiDomain}/lookup/searchMaker/${query.trim()}`)
      .then(handleResponse);
  }
}

export default MakerService;