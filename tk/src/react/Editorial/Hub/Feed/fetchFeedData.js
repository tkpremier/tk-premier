import handleResponse from '../../../../utils/handleresponse';

const fetchFeedData = () => fetch('/editorial/GetEditorialAndVideosSection').then(handleResponse);

export default fetchFeedData;
