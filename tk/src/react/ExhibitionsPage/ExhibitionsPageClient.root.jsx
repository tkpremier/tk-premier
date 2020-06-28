import React from 'react';
import { Provider } from 'react-redux';
import { configureStoreWithRouter } from './configurestore';
import routesMap from './routes';
import * as ExhibitionsReducers from './exhibitionsreducers';
import setInitialState from './setinitialstate';
import ExhibitionsContainer from './Exhibitions.container';

const Exhibitions = ({ data, location }) => {
  const store = configureStoreWithRouter(
    {
      ...ExhibitionsReducers
    },
    setInitialState(
      data, location
    ),
    routesMap,
    {
      basename: '/auctions/exhibitions'
    }, true
  );
  return (
    <Provider store={store}>
      <ExhibitionsContainer />
    </Provider>
  );
};
export { Exhibitions };
