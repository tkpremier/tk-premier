import React from 'react';
import { Provider } from 'react-redux';
import BuyNowLayout from './Layout';
import { configureStoreWithRouter } from '../utils/configureStore';
import getInitialState from './initialState';
import * as sortReducers from '../Sort/reducers';
import * as userReducers from '../PhillipsUser/reducers';
import * as buyNowReducers from './reducers';
import * as curatedViewReducers from '../CuratedView/reducers';
import filterData from '../PhillipsFilter/reducers';
import routesMap from './routes';

const BuyNow = ({ location, loginRequired, previewCuratedAuction, sale, userJSON }) => {
  const store = configureStoreWithRouter(
    {
      ...sortReducers,
      filterData,
      ...curatedViewReducers,
      ...buyNowReducers,
      ...userReducers
    },
    getInitialState({
      location,
      loginRequired,
      previewCuratedAuction,
      sale,
      userJSON
    }),
    routesMap,
    { initialEntries: [location] }
  );
  return (
    <Provider store={store}>
      <BuyNowLayout loginRequired={loginRequired} sale={sale} />
    </Provider>
  );
};

export { BuyNow };
