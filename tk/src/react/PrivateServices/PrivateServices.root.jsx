import React from 'react';
import { Provider } from 'react-redux';
import PrivateServicesContainer from './PrivateServices.container';
import { configureStoreWithRouter } from '../utils/configureStore';
import getInitialState from './initialState';
import * as userReducers from '../PhillipsUser/reducers';
import { getUrlBasePath } from '../../utils/getUrlQueries';

const PrivateServices = ({
  location,
  loginRequired,
  sale,
  userJSON
}) => {
  const store = configureStoreWithRouter(
    {
      ...userReducers
    },
    getInitialState({
      location,
      loginRequired,
      sale,
      userJSON
    }),
    { basename: `/${getUrlBasePath(window.location.href, window.location.origin)}` }
  );
  return (
    <Provider store={store}>
      <PrivateServicesContainer loginRequired={loginRequired} />
    </Provider>
  );
};

export { PrivateServices };
