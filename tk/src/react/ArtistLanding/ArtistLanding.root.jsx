import { Provider } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import ArtistLandingPage from './ArtistLandingPage';
import * as userReducers from '../PhillipsUser/reducers';
import createInitialUserState from '../PhillipsUser/createInitialUserState';
import { configureStore } from '../utils/configureStore';

const ArtistLanding = ({ apiRoot, maker, userJSON }) => {
  const store = configureStore(
    { ...userReducers },
    createInitialUserState(JSON.parse(userJSON))
  );
  return (
    <Provider store={store}>
      <ArtistLandingPage
        apiRoot={apiRoot}
        {...JSON.parse(maker)}
      />
    </Provider>
  );
};

ArtistLanding.defaultProps = {
  maker: '',
  userJSON: ''
};

ArtistLanding.propTypes = {
  apiRoot: PropTypes.string,
  maker: PropTypes.string,
  pastLots: PropTypes.string,
  upcomingLots: PropTypes.string,
  userJSON: PropTypes.string
};

export { ArtistLanding };
