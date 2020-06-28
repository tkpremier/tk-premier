import { createSelector } from 'reselect';

const enableCuratedAuctionSelector = ({ auction }) => auction.enableCuratedAuction;

const urlQueriesSelector = ({ urlQueries }) => urlQueries;

export const sortSelector = ({ sortQuery }) => sortQuery;

export const lotsSelector = ({ auction }) => auction.lots;

const showCuratedViewSelector = ({ showCuratedView }) => showCuratedView;
const deviceInfoSelector = state => state.deviceInfo;

const showCuratedViewToggleSelector = createSelector(
  [enableCuratedAuctionSelector, deviceInfoSelector, urlQueriesSelector, showCuratedViewSelector],
  (enableCuratedAuction, deviceInfo, { filter, sort }, showCuratedView) => filter.length > 0 || sort.length > 0
    ? false
    : (enableCuratedAuction || showCuratedView) && deviceInfo.isTablet
);

export {
  showCuratedViewToggleSelector
};
