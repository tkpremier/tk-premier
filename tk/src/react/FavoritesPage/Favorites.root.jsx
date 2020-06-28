import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import App from './Favorites';
import { configureStore } from '../utils/configureStore';
import createInitialUserState from '../PhillipsUser/createInitialUserState';
import rootReducer from './reducers';
import listPropTypes, { defaultEditingLotList } from './proptypes';
import { defaultModalProps } from '../PhillipsModal/proptypes';

const initialState = (
  {
    pastFavoriteLots,
    upcomingFavoriteLots,
    userLotList,
    userDetails,
    activeView
  }) => {
  return {
    pastFavoriteLots: pastFavoriteLots || [],
    upcomingFavoriteLots: upcomingFavoriteLots || [],
    userLotList: userLotList || [],
    editingLotList: defaultEditingLotList,
    ...createInitialUserState(JSON.parse(userDetails)),
    activeView: activeView || 'upcomingFavoriteLots',
    modal: defaultModalProps
  };
};

const MyFavorites = ({ data, activeView, userDetails }) => {
  const { userLotList } = data;
  const pastFavoriteLots = data.favorites?.pastFavoriteLots
    ? data.favorites.pastFavoriteLots
    : [];
  const upcomingFavoriteLots = data.favorites?.upcomingFavoriteLots
    ? data.favorites.upcomingFavoriteLots
    : [];
  const store = configureStore(rootReducer, initialState({
    userLotList,
    pastFavoriteLots,
    upcomingFavoriteLots,
    userDetails,
    activeView
  }));
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

MyFavorites.defaultProps = {
  data: {
    favorites: {
      pastFavoriteLots: [],
      upcomingFavoriteLots: []
    }
  },
  activeView: '',
  userDetails: '',
  userLotList: []
};

MyFavorites.propTypes = {
  data: PropTypes.shape({
    favorites: PropTypes.shape({
      pastFavoriteLots: PropTypes.array,
      upcomingFavoriteLots: PropTypes.array
    })
  }),
  activeView: PropTypes.string,
  userDetails: PropTypes.string,
  userLotList: PropTypes.arrayOf(listPropTypes)
};

export { MyFavorites };
