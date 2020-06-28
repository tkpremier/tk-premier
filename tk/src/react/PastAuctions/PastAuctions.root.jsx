import React from 'react';
import { Provider } from 'react-redux';
import { configureStoreWithRouter } from './configurestore';
import routesMap from './routes';
import * as pastAuctionReducers from './pastauctionsreducers';
import setInitialState from './setInitialState';
import PastAuctionsContainer from './pastauctions.container';

const PastAuctions = ({ data, location }) => {
  const store = configureStoreWithRouter(
    {
      ...pastAuctionReducers
    },
    setInitialState(
      data, location
    ),
    routesMap,
    { initialEntries: [location] }
  );
  return (
    <Provider store={store}>
      <PastAuctionsContainer />
    </Provider>
  );
};
export { PastAuctions };
