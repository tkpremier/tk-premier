import consignmentService from './ConsignmentService';

// FORM FETCH MAKERS ACTIONS
export const fetchMakersSuccess = (makers) => {
  return {
    type: 'FETCH_MAKERS_SUCCESS',
    payload: {
      makersFetched: true,
      makers
    }
  };
};

export const fetchMakersError = (err) => {
  return {
    type: 'FETCH_MAKERS_ERROR',
    payload: {
      makersFetched: false,
      makers: [err.message]
    }
  }
}

export const fetchMakers = searchQuery => dispatch => consignmentService.getMakers(searchQuery)
  .then(({ makers }) => dispatch(fetchMakersSuccess(makers)))
  .catch((error) => {
    console.error('error', error);
  });


// FORM UI ACTIONS
export const addImages = ({ files = [], images = [] }) => ({
  type: 'ADD_IMAGES',
  payload: {
    files,
    images
  }
});

export const blurTypeahead = () => {
  return {
    type: 'TYPEAHEAD_BLUR'
  };
};

export const changeMedium = (mediumId) => {
  return {
    type: 'CHANGE_MEDIUM',
    payload: {
      mediumId
    }
  }
};

export const makerSelected = (maker) => {
  return {
    type: 'MAKER_SELECTED',
    payload: maker
  };
};

// FORM HTTP REQUEST ACTIONS
export const submitError = ({ message = '' }) => ({
  type: 'CONSIGN_SUBMIT_ERROR',
  payload: {
    message
  }
})

export const submitPending = () => ({ type: 'CONSIGN_SUBMIT_PENDING' });

export const submitSuccess = ({ message = '', user = { email: '', name: '' } }) => ({
  type: 'CONSIGN_SUBMIT_SUCCESS',
  payload: {
    message,
    user
  }
});

export const resetForm = () => {
  return {
    type: 'RESET_FORM'
  }
}