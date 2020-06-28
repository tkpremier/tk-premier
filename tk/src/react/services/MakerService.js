import handleResponse from '../utils/handleResponse';
import apiSettings from '../utils/ApiSettings.decorator';

@apiSettings
class MakerService {
  fetchByLetter(letter) {
    return fetch(`${this.apiDomain}api/maker/${letter}/latest`)
      .then(handleResponse);
  }
  fetchMoreByLetter(letter, page) {
    return fetch(`${this.apiDomain}api/maker/${letter}/latest/?page=${page}`)
      .then(handleResponse);
  }
  search(query) {
    return fetch(`${this.apiDomain}api/lookup/searchmaker/${query}`)
      .then(handleResponse);
  }
}

export default new MakerService()
