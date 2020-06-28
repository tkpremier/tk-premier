import React from 'react';
import { Provider } from 'react-redux';
import UpcomingLotsContainer from './UpcomingLots.container';
import { configureStoreWithRouter } from '../utils/configureStore';
import getInitialState from './initialState';
import * as sortReducers from '../Sort/reducers';
import * as userReducers from '../PhillipsUser/reducers';
import * as upcomingLotsReducers from './reducers';
import routesMap from './routes';

const UpcomingLotsPage = ({ auctions, location, lots, tags, upcomingLotsDesc, upcomingLotsTitle, userJSON }) => {
  const store = configureStoreWithRouter(
    {
      ...sortReducers,
      ...upcomingLotsReducers,
      ...userReducers
    },
    getInitialState({
      auctions, location, lots, tags, upcomingLotsDesc, upcomingLotsTitle, userJSON
    }),
    routesMap,
    {initialEntries: [location] }
  );
  return (
    <Provider store={store}>
      <UpcomingLotsContainer />
    </Provider>
  );
};

export { UpcomingLotsPage };
