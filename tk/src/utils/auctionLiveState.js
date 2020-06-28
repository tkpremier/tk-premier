import differenceInMinutes from 'date-fns/differenceInMinutes';
import isNull from 'lodash/isNull';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';

export const isAuctionLive = (
  saleData,
  minutes = 0,
  operator = 'lessThan',
  useDateType = 'startDate'
) => {
  const {
    endSale,
    startDate,
    timeState,
    timeZone
  } = saleData;
  const today = new Date(Date.now());
  const todayUtc = new Date(today.toUTCString());
  const timeZoneString = isNull(timeZone) ? '' : timeZone;
  const eventDateString = saleData[useDateType] || startDate;
  const eventDateUtc = typeof Intl !== 'undefined' && timeZoneString.length > 0
    ? zonedTimeToUtc(eventDateString, timeZoneString)
    : eventDateString;
  const eventDate = new Date(eventDateUtc);
  const timeDiff = differenceInMinutes(eventDate, todayUtc);
  const comparator = {
    'greaterThan': () => timeDiff >= minutes,
    'lessThan': () => timeDiff <= minutes
  };
  return (operator === 'lessThan' && timeState === 1 && !endSale)
    || operator === 'greaterThan'
    ? comparator[operator]()
    : false;
};
/**
 * Check if event is currently live (active).
 * @param {Object} eventInfo - The event info that relates to start and end times with time zone.
 * @param {string} [eventInfo.endDate = ''] - The event end date in local time.
 * @param {string} [eventInfo.startDate = ''] - The event start date in local time.
 * @param {string} [eventInfo.timeZone = ''] - The event time zone in IANA format.

 */

export const isTimedAuctionLive = ({
  endDate = '',
  startDate = '',
  timeZone = ''
}) => {
  const timeZoneString = isNull(timeZone) ? '' : timeZone;
  const today = new Date(Date.now());
  const todayUtc = new Date(today.toUTCString());
  const startDateUtc = typeof Intl !== 'undefined' && timeZoneString.length > 0
    ? zonedTimeToUtc(startDate, timeZoneString)
    : startDate;
  const endDateUtc = typeof Intl !== 'undefined' && timeZoneString.length > 0
    ? zonedTimeToUtc(endDate, timeZoneString)
    : endDate;
  const start = new Date(startDateUtc);
  const end = new Date(endDateUtc);
  const live = (isAfter(todayUtc, start) && isBefore(todayUtc, end));
  return live;
};
