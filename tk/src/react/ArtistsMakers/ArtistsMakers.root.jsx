import { Provider } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import { configureStore } from '../utils/configureStore';
import ArtistsMakersPage from './ArtistsMakersPage.container';
import preloadedState from './default-state-slices/initdata';
import rootReducer from './reducers';
import * as userReducers from '../PhillipsUser/reducers';
import { defaultFeaturedMaker } from './default-state-slices/featuredmaker';

const ArtistsMakers = ({ data, editable, env, userJSON }) => {
  const featuredMaker = isNull(data.featuredMaker) ? defaultFeaturedMaker : data.featuredMaker;
  const initialState = preloadedState({ data, editable, env, featuredMaker, userJSON });
  const store = configureStore(
    {
      ...rootReducer,
      ...userReducers
    },
    initialState
  );
  return (
    <Provider store={store}>
      <ArtistsMakersPage
        editable={editable}
        env={env}
        featuredMaker={featuredMaker}
        makerEditorials={data.makerEditorials}
      />
    </Provider>
  );
};

ArtistsMakers.defaultProps = {
  editable: false,
  env: 'web',
  userJSON: ''
};

ArtistsMakers.propTypes = {
  data: PropTypes.shape({
    featuredMaker: PropTypes.object,
    makerCarousels: PropTypes.array,
    makerEditorials: PropTypes.array
  }).isRequired,
  editable: PropTypes.bool,
  env: PropTypes.string,
  userJSON: PropTypes.string
};

export { ArtistsMakers };

