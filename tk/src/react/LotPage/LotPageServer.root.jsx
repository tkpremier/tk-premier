import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import setInitialState from './setInitalState';
import { configureStoreWithRouter } from '../utils/configureStore';
import routesMap from './routesMap';
import * as userReducers from '../PhillipsUser/reducers';
import * as languageReducers from '../LanguageToggle/reducers';
import { bidButton, inquireForm } from '../BidButtons/reducers';
import * as modalReducers from '../PhillipsModal/reducer';
import * as lotPageReducers from './reducers';
import LotPageContainer from './LotPage.container';
// import auction from './mock.json';

const LotPage = ({ auction, lotNumber, userJSON, location, loginRequired, buyNowSaleNumber, language }) => {
  // ({combineReducer params}, initialState, routesMap, history)
  // routesMap is currently imported from ./routesMap
  // sets the routes with payload props as params
  const store = configureStoreWithRouter({
    bidButton,
    inquireForm,
    ...languageReducers,
    ...userReducers,
    ...modalReducers,
    ...lotPageReducers
  },
    setInitialState({ userJSON, lotNumber, auction, buyNowSaleNumber, language }),
    routesMap,
    { initialEntries: [location] }
  );
  return (
    <Provider store={store}>
      <LotPageContainer isServer loginRequired={loginRequired} />
    </Provider>
  );
};

LotPage.propTypes = {
  location: PropTypes.string.isRequired,
  loginRequired: PropTypes.bool.isRequired,
  auction: PropTypes.object.isRequired,
  userJSON: PropTypes.string.isRequired,
  lotNumber: PropTypes.number.isRequired
};

export { LotPage };
