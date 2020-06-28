import React from 'react';
import { Provider } from 'react-redux';
import CatalogueContainer from './components/cataloguebuy.container';
import { configureStoreWithRouter } from '../utils/configureStore';
import routesMap from './routes';
import * as catalogueBuyReducers from './reducers';

// import filterData from '../PhillipsFilter/reducers';
import setInitialState from './setInitialState';


const CatalogueBuy = ({
  data, storeForm, location
}) => {
  const store = configureStoreWithRouter(
    {
      ...catalogueBuyReducers
    },
    setInitialState(
      data, storeForm, location
    ),
    routesMap,
    {
      basename: '/catalogues/buy'
    }, true
  );
  return (
    <Provider store={store}>
      <CatalogueContainer />
    </Provider>
  );
};

export { CatalogueBuy };
