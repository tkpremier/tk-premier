import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import subDays from 'date-fns/subDays';
import subHours from 'date-fns/subHours';
import subMinutes from 'date-fns/subMinutes';
import isAfter from 'date-fns/isAfter';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';

function getTimeDifference(nowString, end) {
  const now = new Date(nowString);
  let endTime = new Date(end);
  // get number of days in timeDifference then set timeDifference to the remainder
  const days = differenceInDays(endTime, now);
  endTime = subDays(endTime, days);
  // get number of hours in timeDifference then set timeDifference to the remainder
  const hours = differenceInHours(endTime, now);
  endTime = subHours(endTime, hours);
  // get number of minutes in timeDifference then set timeDifference to the remainder
  const minutes = differenceInMinutes(endTime, now);
  endTime = subMinutes(endTime, minutes);
  // get number of seconds
  const seconds = differenceInSeconds(endTime, now);
  return { days, hours, minutes, seconds };
}
const PhillipsTimer = ({
  endDate,
  liveMessage,
  timeZone
}) => {
  const endDateUtc = typeof Intl !== 'undefined' && timeZone.length > 0
    ? zonedTimeToUtc(endDate, timeZone)
    : endDate;
  const [now, setNow] = useState(new Date(Date.now()));
  const [active, setStatus] = useState(isAfter(new Date(endDateUtc), new Date(now.toUTCString())));
  useEffect(() => {
    if (active) {
      const intervalId = setInterval(() => {
        const intervalNow = new Date(Date.now());
        const intEndDateUtc = typeof Intl !== 'undefined' && timeZone.length > 0
          ? zonedTimeToUtc(endDate, timeZone)
          : endDate;
        const ended = isAfter(new Date(intervalNow.toUTCString()), new Date(intEndDateUtc));
        setNow(intervalNow);
        if (ended) {
          setStatus(!active);
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }, []);
  const timeDifference = getTimeDifference(now, endDateUtc);
  return !active
    ? <div />
    : (
      <div className="phillips-timer">
        <h4>{liveMessage}</h4>
        <h3>
          {timeDifference.days > 0
            ? (
              <p>
                <span type="days">{timeDifference.days}</span>
                <label>Days</label>
              </p>
            )
            : null
          }
          {timeDifference.days > 0
            ? <span>:</span>
            : null
          }
          <p>
            <span type="hrs">{timeDifference.hours}</span>
            <label>Hours</label>
          </p>
          {' :'}
          <p>
            <span type="min">{timeDifference.minutes}</span>
            <label>Min</label>
          </p>
          {' :'}
          <p>
            <span type="sec">{timeDifference.seconds}</span>
            <label>Sec</label>
          </p>
        </h3>
      </div>
    );
};

PhillipsTimer.defaultProps = {
  endDate: '',
  liveMessage: '',
  timeZone: ''
};

PhillipsTimer.propTypes = {
  endDate: PropTypes.string,
  liveMessage: PropTypes.string,
  timeZone: PropTypes.string
};

export default PhillipsTimer;
