import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import App from './App';
import * as userReducers from '../../PhillipsUser/reducers';
import createInitialUserState from '../../PhillipsUser/createInitialUserState';
import { configureStore } from '../../../utils/configureStore';
import carouselPropTypes from '../../PhillipsCarousel/proptypes';

const EditorialArticle = ({ data }) => {
  const store = configureStore(
    {
      ...userReducers
    },
    createInitialUserState()
  );
  return (
    <Provider store={store}>
      <App data={data} />
    </Provider>
  );
};

EditorialArticle.defaultProps = {
  data: []
};

EditorialArticle.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(carouselPropTypes))
};

export default EditorialArticle;
