import React from 'react';
import { Provider } from 'react-redux';
import AuctionPageCont from './AuctionPage.container';
import * as auctionPageReducers from './reducers';
import * as modalReducers from '../PhillipsModal/reducer';
import * as userReducers from '../PhillipsUser/reducers';
import { bidButton } from '../BidButtons/reducers';
import filterData from '../PhillipsFilter/reducers';
import { configureStoreWithRouter } from '../utils/configureStore';
import routesMap from './routes';
import setInitialState from './setInitialState';

const AuctionPage = ({ amApiUrl, auction, userJSON, recommendedLots, previewCuratedAuction, location, isExhibitionLanding }) => {
  const { curatedViewEnabled, ...state } = setInitialState({
    auction,
    isExhibitionLanding,
    location,
    previewCuratedAuction,
    recommendedLots,
    userJSON
  });
  const store = configureStoreWithRouter(
    {
      bidButton,
      filterData,
      ...auctionPageReducers,
      ...modalReducers,
      ...userReducers
    },
    state,
    routesMap,
    { basename: '/auctions' }
  );
  return (
    <Provider store={store}>
      <AuctionPageCont amApiUrl={amApiUrl} curatedViewEnabled={curatedViewEnabled} />
    </Provider>
  );
};

export { AuctionPage };
