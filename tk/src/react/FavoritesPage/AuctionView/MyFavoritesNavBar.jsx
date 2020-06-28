import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { setActiveView } from '../actions';

const NavBar = () => {
  const dispatch = useDispatch();
  const activeView = useSelector(state => state.activeView);
  const upcomingFavoriteLots = useSelector(state => state.upcomingFavoriteLots);
  const pastFavoriteLots = useSelector(state => state.pastFavoriteLots);
  const totalUpcomingFavoriteLots = upcomingFavoriteLots.reduce((count, sale) => {
    return count + sale.lots.length;
  }, 0);
  const totalPastFavoriteLots = pastFavoriteLots.reduce((count, sale) => {
    return count + sale.lots.length;
  }, 0);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setActiveView(e.target.dataset.value));
  }

  const upcomingClass = classNames({
    active: (activeView === 'upcomingFavoriteLots')
  });
  const pastClass = classNames({
    active: (activeView === 'pastFavoriteLots')
  });
  return (
    <nav id="my-lots-nav">
      <a href="#" data-value="upcomingFavoriteLots" onClick={handleClick} className={upcomingClass}>Upcoming (<span className="count" data-value="upcomingFavoriteLots">{totalUpcomingFavoriteLots}</span>)</a>
      <a href="#" data-value="pastFavoriteLots" onClick={handleClick} className={pastClass}>Past (<span className="count" data-value="pastFavoriteLots">{totalPastFavoriteLots}</span>)</a>
    </nav>
  )
};

export default NavBar;
