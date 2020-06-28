import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FavoritesModalCont from './FavoritesModal.container';
import AuctionView from './AuctionView/Auctionview';
import LotList from './ListsView/List.container';
import { setActiveView } from './actions';

const App = () => {
  const dispatch = useDispatch();
  const activeView = useSelector(state => state.activeView);
  const pastFavoriteLots = useSelector(state => state.pastFavoriteLots);
  const upcomingFavoriteLots = useSelector(state => state.upcomingFavoriteLots);
  const userLotList = useSelector(state => state.userLotList);
  return (
    <div className="main-container">
      <div className="content-area container my-lots" id="my-lots">
        <h2>My Favorites</h2>
        <select
          className="my-lots__select"
          onChange={e => dispatch(setActiveView(e.target.value))}
          value={activeView}
        >
          <option
            value={upcomingFavoriteLots.length === 0 && pastFavoriteLots.length > 0
              ? 'pastFavoriteLots'
              : 'upcomingFavoriteLots'
            }
          >
            Auctions
          </option>
          <option value="lists">Lists</option>
        </select>
        <div className="row">
          {activeView === 'lists'
            ? userLotList.length > 0
              ? (
                userLotList.map(list => (
                  <LotList
                    id={list.id}
                    key={`lots-list-${list.id}`}
                    list={list}
                  />
                ))
              )
              : (
                <p className="no-lists">
                  You have not created any lists. Please go to the&nbsp;
                  <a href="/auctions">Auctions page</a>
                  &nbsp;to start the process.
                </p>
              )
            : (
              <AuctionView
                activeView={activeView}
                pastFavoriteLots={pastFavoriteLots}
                upcomingFavoriteLots={upcomingFavoriteLots}
              />
            )
          }
        </div>
      </div>
      <FavoritesModalCont />
    </div>
  );
};

// App.defaultProps = {
//   pastFavoriteLots: [],
//   upcomingFavoriteLots: []
// };

// App.propTypes = {
//   userLotList: PropTypes.arrayOf(listPropTypes),
//   activeView: PropTypes.string.isRequired,
//   setActiveView: PropTypes.func.isRequired,
//   pastFavoriteLots: PropTypes.arrayOf(PropTypes.object),
//   upcomingFavoriteLots: PropTypes.arrayOf(PropTypes.object),
// };

export default App;
