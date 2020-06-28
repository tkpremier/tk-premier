import React from 'react';
import { Provider } from 'react-redux';
import AuctionPageCont from './AuctionPage.container';
import { configureStoreWithRouter } from '../utils/configureStore';
import routesMap from './routes';
import * as auctionPageReducers from './reducers';
import * as modalReducers from '../PhillipsModal/reducer';
import * as userReducers from '../PhillipsUser/reducers';
import { bidButton } from '../BidButtons/reducers';
import filterData from '../PhillipsFilter/reducers';
import setInitialState from './setInitialState';

const AuctionPage = ({ auction, userJSON, recommendedLots, previewCuratedAuction, location, isExhibitionLanding, amApiUrl }) => {
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
      filterData,
      ...auctionPageReducers,
      bidButton,
      ...modalReducers,
      ...userReducers
    },
    state,
    routesMap,
    {
      basename: '/auctions',
      initialEntries: [location]
    }
  );
  return (
    <Provider store={store}>
      <AuctionPageCont curatedViewEnabled={curatedViewEnabled} amApiUrl={amApiUrl} event={auction} />
    </Provider>
  );
};

export { AuctionPage };
