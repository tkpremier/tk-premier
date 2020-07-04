import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import isNull from 'lodash/isNull';
import { saveLot, deleteLot } from '../PhillipsUser/actions';
import getPhillipsBackboneProperty from '../utils/getPhillipsBackboneProperty';
import matchError from '../PhillipsUser/matchError';
import sendAnalytics from '../../utils/sendAnalytics';

const FavoriteLot = ({ lotNumberFull, saleNumber, onMouseEnter, onMouseLeave }) => {
  const bbEvent = useRef(null);
  useEffect(() => {
    getPhillipsBackboneProperty('Events')
      .then(eventEmitter => (bbEvent.current = eventEmitter))
      .catch(() => (bbEvent.current = null));
  }, []);
  const { error, favoriteLots, user } = useSelector(({ favoriteLots, user, error }) => ({
    error: matchError('FAVORITE_LOT', ({ lot }) => lot.lotNumberFull.trim() === lotNumberFull.trim())(error)
      ? error
      : null,
    favoriteLots,
    user
  }));
  const dispatch = useDispatch();
  const faveSaleIndex = favoriteLots.map(({ saleNumber: faveSaleNumber }) => faveSaleNumber).indexOf(saleNumber);
  const active = faveSaleIndex > -1 && favoriteLots[faveSaleIndex]?.lots?.indexOf(lotNumberFull.trim()) > -1;
  const toolTipMessage = isNull(error) ? (active ? 'Unfavorite lot' : 'Favorite lot') : error.message;
  const trackActivity = () => {
    const page = document ? document.title : 'placeholder';
    const analyticsData = {
      eventCategory: `Favorite Lot / ${page} / SaleNumber ${saleNumber} / LotNumber ${lotNumberFull.trim()}`,
      eventAction: 'Favorite Lot',
      eventLabel: `Email: ${user.email}`
    };
    sendAnalytics(analyticsData);
  };
  const onClick = () => {
    if (!user.loggedIn) {
      if (!isNull(bbEvent.current)) {
        bbEvent.current.trigger('openRegister');
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('favoritedLot', `${saleNumber}-${lotNumberFull}`);
      }
      return;
    }
    if (active) {
      dispatch(deleteLot(user.id, { lotNumber: lotNumberFull.trim(), saleNumber }));
    } else {
      trackActivity();
      dispatch(saveLot(user.id, { lotNumber: lotNumberFull.trim(), saleNumber }));
    }
  };
  return (
    <button
      className={classNames('favorite-lot', { active })}
      data-lot-id={`${saleNumber}-${lotNumberFull}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type="button"
      tabIndex={0}
    >
      <span className={classNames('icon', { active })} />
      <span className={classNames('tooltip', { error: !isNull(error) })}>{toolTipMessage}</span>
    </button>
  );
};

FavoriteLot.defaultProps = {
  error: null,
  onMouseEnter: () => false,
  onMouseLeave: () => false
};

FavoriteLot.propTypes = {
  error: PropTypes.shape({
    errorType: PropTypes.string,
    message: PropTypes.string
  }),
  lotNumberFull: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    loggedIn: PropTypes.bool
  }).isRequired,
  saleNumber: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export { FavoriteLot as UnWrappedFavoriteLot };
export default FavoriteLot;
