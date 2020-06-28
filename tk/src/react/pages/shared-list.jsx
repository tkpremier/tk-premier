import { render } from 'react-dom';
import { Provider } from 'react-redux';
import LotList from '../FavoritesPage/ListsView/List';
import { configureStore } from '../utils/configureStore';
import { user, favoriteLots, followedMakers, lotLists } from '../PhillipsUser/reducers';

const initialState = (userDetails) => {
  return {
    user: {
      firstName: userDetails.firstName || '',
      lastName: userDetails.lastName || '',
      email: userDetails.email || '',
      id: userDetails.id || ''
    },
    favoriteLots: userDetails.favoriteLots || [],
    followedMakers: userDetails.followedMakers || [],
    lotLists: userDetails.lotLists || []
  };
};
const store = configureStore({ user, favoriteLots, followedMakers, lotLists }, initialState(JSON.parse(window.userDetails)));

render(
  <Provider store={store}>
    <LotList model={window.modelData} />
  </Provider>,
  document.getElementById('shared-list')
);
