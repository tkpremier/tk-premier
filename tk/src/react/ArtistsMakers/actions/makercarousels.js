import handleResponse from '../../utils/handleResponse';

export function manageCarousel(id, type) {
  const newAction = {
    isAdding: true,
    isEditing: false,
    isFetching: false,
    type,
    id
  };
  return newAction;
}

export function addNewMaker(carouselId) {
  return {
    type: 'ADD_NEW_MAKER',
    carouselId,
  }
}

export const updateCarouselPending = (id) => {
  return {
    type: 'UPDATE_CAROUSEL_PENDING',
    id,
    editorResponse : {
      status: 'pending',
      msg: '',
      carouselId: id
    }
  }
}

export const updateCarouselSuccess = (id, updatedCarousels) => {
  return {
    type: 'UPDATE_CAROUSEL_SUCCESS',
    updatedCarousels,
    id,
    editorResponse: {
      status: 'success',
      msg: 'Carousel has been updated successfully',
      carouselId: id
    }
  };
};

export const updateCarouselError = (id, err) => {
  console.error('Update Carousel ERROR: ', err);
  return {
    type: 'UPDATE_CAROUSEL_ERROR',
    id,
    editorResponse: {
      status: 'error',
      msg: `There was an error.  ${err}`,
      carouselId: id
    }
  };
};

export const saveCarousel = (id, data) => {
  const method = id === 0 ? 'POST' : 'PUT';
  const jsonData = JSON.stringify(data);
  const headersObj = {
    'Content-Type': 'application/json'
  };
  const options = {
    method: method,
    headers: headersObj,
    body: jsonData
  }
  return (dispatch) => {
    dispatch(updateCarouselPending(id));
    return fetch(`${phillips.domainURL}/api/maker/carousel`, options)
      .then(handleResponse)
      .then(json =>
        dispatch(updateCarouselSuccess(json.modifiedItem.id, json.makerPage.makerCarousels))
      )
      .catch((err) => {
        console.log('catch err: ', err);
        dispatch(updateCarouselError(id, err));
      });
  };
};
export const deleteCarousel = (id) => {
  const options = {
    method: 'DELETE'
  };
  return (dispatch) => {
    dispatch(updateCarouselPending(id));
    return fetch(`${phillips.domainURL}/api/maker/carousel/${id}`, options)
      .then(response => response.json())
      .then((json) => {
        dispatch(updateCarouselSuccess(id, json.makerPage.makerCarousels));
      })
      .catch((err) => {
        console.log('deleteCarouselError err: ', err);
        dispatch(updateCarouselError(id, err));
      });
  };
};
export const manageMaker = (id, carouselId) => {
  return {
    type: 'EDIT_MAKER',
    id,
    carouselId
  };
};
export const setMaker = (maker) => {
  const id = maker.makerId;
  const name = maker.maker;
  return {
    type: 'SET_MAKER',
    id,
    name
  };
};
export const saveMaker = (id, isNew, carouselId, saveOnServer, data) => {
  if (saveOnServer) {
    const method = isNew === true ? 'POST' : 'PUT';
    const jsonData = JSON.stringify(data);
    const headersObj = {
      'Content-Type': 'application/json'
    };
    const options = {
      method: method,
      headers: headersObj,
      body: jsonData
    };
    return (dispatch) => {
      return fetch(`${phillips.domainURL}/api/maker/carouselitem`, options)
        .then(response => response.json())
        .then(json =>
          dispatch(updateCarouselSuccess(id, json.makerPage.makerCarousels))
        )
        .catch((err) => {
          dispatch(updateCarouselError(id, err));
          console.log('catch err: ', err);
        });
    };
  }
  return {
    type: 'SAVE_MAKER',
    id,
    carouselId,
    data
  };
}
