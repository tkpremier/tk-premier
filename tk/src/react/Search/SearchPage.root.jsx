import { Provider } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { user } from '../PropTypes/proptypes';
import AppCont from './SearchPage.container';
import { configureStoreWithRouter } from '../utils/configureStore';
import initialState from './initialState';
import * as userReducers from '../PhillipsUser/reducers';
import * as searchReducers from './reducers';
import routesMap from './routes';

const Root = ({ query, currentType, data, userDetails, location }) => {
  const store = configureStoreWithRouter({
    ...searchReducers,
    ...userReducers
  },
    initialState({ query, currentType, data, userDetails }),
    routesMap,
    { initialEntries: [location] }
  );
  return (
    <Provider store={store}>
      <AppCont />
    </Provider>
  );
};

Root.defaultProps = {
  data: {},
  currentType: '',
  userDetails: user
};

Root.propTypes = {
  query: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  currentType: PropTypes.string,
  userDetails: PropTypes.objectOf(user),
  data: PropTypes.objectOf(PropTypes.array).isRequired
};

/*
  // ({combineReducer params}, initialState, routesMap, history)
  // routesMap is currently imported from ./routesMap
  // sets the routes with payload props as params
  const store = configureStoreWithRouter({
    ...languageReducers,
    ...userReducers,
    ...modalReducers,
    ...bidButtonReducers,
    ...lotPageReducers
  },
    setInitialState({ userJSON, lotNumber, auction }),
    routesMap,
    history
  );
 */

export { Root };
