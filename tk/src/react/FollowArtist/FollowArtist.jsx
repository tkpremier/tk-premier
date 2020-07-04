import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import isNull from 'lodash/isNull';
import { saveMaker, deleteMaker } from '../PhillipsUser/actions';
import matchError from '../PhillipsUser/matchError';
import { user as userPropTypes } from '../PropTypes/proptypes';
import getPhillipsBackboneProperty from '../utils/getPhillipsBackboneProperty';
import sendAnalytics from '../../utils/sendAnalytics';

const FollowArtist = ({ makerId, makerName }) => {
  const bbEvent = useRef(null);
  useEffect(() => {
    getPhillipsBackboneProperty('Events')
      .then(eventEmitter => (bbEvent.current = eventEmitter))
      .catch(() => (bbEvent.current = null));
  }, []);
  const { error, followedMakers, user } = useSelector(({ followedMakers, user, error }) => ({
    error: matchError('FOLLOW_MAKER', maker => maker.makerId === makerId)(error) ? error : null,
    followedMakers,
    user
  }));
  const dispatch = useDispatch();
  const active = followedMakers.indexOf(makerId) > -1;
  const toolTipMessage = isNull(error) ? (active ? 'Followed' : 'Follow') : error.message;
  const trackActivity = () => {
    const page = document ? document.title : 'placeholder';
    const analyticsData = {
      eventCategory: `Follow Maker / ${page} / Maker: ${makerName}`,
      eventAction: 'Follow Maker',
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
        localStorage.setItem('followedMaker', makerId);
      }
      return;
    }
    if (active) {
      dispatch(deleteMaker(user.id, makerId));
    } else {
      trackActivity();
      dispatch(saveMaker(user.id, makerId));
    }
  };
  return (
    <button
      className={classNames('follow-artist', { active })}
      type="button"
      tabIndex={0}
      onClick={onClick}
      data-artist-id={makerId}
    >
      <span className={classNames('icon', { active })} />
      <span className={classNames('tooltip', { error: !isNull(error) })}>{toolTipMessage}</span>
    </button>
  );
};

FollowArtist.propTypes = {
  makerId: PropTypes.number.isRequired,
  makerName: PropTypes.string.isRequired
};

export { FollowArtist as UnWrappedFollowArtist };
export default FollowArtist;
