import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import setInitalState from './setInitalState';
import { configureStoreWithRouter } from '../utils/configureStore';
import routesMap from './routesMap';
import * as userReducers from '../PhillipsUser/reducers';
import * as languageReducers from '../LanguageToggle/reducers';
import { bidButton, inquireForm } from '../BidButtons/reducers';
import * as modalReducers from '../PhillipsModal/reducer';
import * as lotPageReducers from './reducers';
import LotPageContainer from './LotPage.container';
import lotpage from '../../../mock/lotpage.json';

const LotPage = () => {
  const { auction, loginRequired, userJSON, lotNumber, buyNowSaleNumber, language } = lotpage;
  const store = configureStoreWithRouter(
    {
      bidButton,
      inquireForm,
      ...languageReducers,
      ...userReducers,
      ...modalReducers,
      ...lotPageReducers
    },
    setInitalState({ userJSON, lotNumber, auction, buyNowSaleNumber, language }),
    routesMap
  );
  return (
    <Provider store={store}>
      <LotPageContainer isServer={false} loginRequired={loginRequired} />
    </Provider>
  );
};

LotPage.propTypes = {
  buyNowSaleNumber: PropTypes.string,
  auction: PropTypes.object.isRequired,
  userJSON: PropTypes.string.isRequired,
  lotNumber: PropTypes.number.isRequired
};
export { LotPage };
