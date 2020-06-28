import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import SellPage from './SellPage';
import { configureStoreWithRouter } from '../utils/configureStore';
import getInitialState from './getInitialState';
import { user, userForm } from '../PhillipsUser/reducers';
import * as consignReducers from './reducers';

const routesMap = {
  SETLANG: '/:language'
};

const Consignments = ({ apiUrl, countries, userJSON, mediums, language, makerId, makerName }) => {
  mediums.sort((a, b) => {
    if (a.medium.toUpperCase() < b.medium.toUpperCase()) {
      return -1;
    }
    if (a.medium.toUpperCase() > b.medium.toUpperCase()) {
      return 1;
    }
    return 0;
  });
  const store = configureStoreWithRouter(
    { ...consignReducers, user, userForm },
    getInitialState({
      userJSON,
      language,
      makerId,
      makerName
    }),
    routesMap,
    {
      basename: '/sell'
    }
  );
  return (
    <Provider store={store}>
      <SellPage
        apiUrl={apiUrl}
        countries={countries}
        language={language}
        mediums={mediums}
      />
    </Provider>
  );
};

Consignments.defaultProps = {
  userJSON: '',
  makerId: null,
  makerName: null,
  mediums: [],
  isLandingPage: true,
  language: ''
};

Consignments.propTypes = {
  userJSON: PropTypes.string,
  makerId: PropTypes.string,
  makerName: PropTypes.string,
  mediums: PropTypes.array,
  isLandingPage: PropTypes.bool,
  language: PropTypes.string
};

export { Consignments };
