import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { configureStoreWithRouter } from '../utils/configureStore';
import SellPage from './SellPage';
import getInitialState from './getInitialState';
import { user, userForm } from '../PhillipsUser/reducers';
import * as consignReducers from './reducers';

const routesMap = {
  SETLANG: '/:language'
}

const Consignments = ({
  apiUrl,
  countries,
  language,
  location,
  makerId,
  makerName,
  mediums,
  userJSON
}) => {
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
    { initialEntries: [location] }
  );
  return (
    <Provider store={store}>
      <SellPage
        apiUrl={apiUrl}
        language={language}
        countries={countries}
        mediums={mediums}
      />
    </Provider>
  );
};

Consignments.defaultProps = {
  countries: [],
  language: '',
  location: '',
  makerId: null,
  makerName: '',
  mediums: [],
  userJSON: ''
};

Consignments.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({})),
  language: PropTypes.string,
  location: PropTypes.string,
  makerId: PropTypes.number,
  makerName: PropTypes.string,
  mediums: PropTypes.arrayOf(PropTypes.shape({})),
  userJSON: PropTypes.string
};

export { Consignments };
