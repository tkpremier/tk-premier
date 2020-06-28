import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { findIndex, isUndefined } from 'lodash/fp';
import BidButton from '../BidButtons/BidButton';
import { showModal } from '../PhillipsModal/actions';
import { submitOffer, offerReject } from '../BidButtons/actions';

export const lotNumberFullSelector = state => state.lotNumberFull;

export const lotsSelector = state => state.lots;

const getPrevLotIds = (currentIndex, lots, count) => {
  const prevIds = [];
  const totalLotsCount = lots.length;
  const maxCount = totalLotsCount > count
    ? count
    : totalLotsCount;
  for (let i = 0; i < maxCount; i++) {
    const lot = isUndefined(lots[currentIndex - (i + 1)]) ?
      lots[totalLotsCount - (i + 1)] :
      lots[currentIndex - (i + 1)];
    prevIds.push(lot.auctionMobilityLotRowId);
  }
  return prevIds;
};

const getNextLotIds = (currentIndex, lots, count) => {
  const nextIds = [];
  const totalLotsCount = lots.length;
  const maxCount = totalLotsCount > count
    ? count
    : totalLotsCount;
  for (let i = 0; i < maxCount; i++) {
    const lot = isUndefined(lots[currentIndex + (i + 1)]) ?
      lots[totalLotsCount - (i + 1)] :
      lots[currentIndex + (i + 1)];
    nextIds.push(lot.auctionMobilityLotRowId);
  }
  return nextIds;
};

export const getAuctionMobilityLotRowIds = createSelector(
  [lotNumberFullSelector, lotsSelector],
  (lotNumberFull, lots) => {
    const currentIndex = findIndex(lot => lot.lotNumberFull.trim() === lotNumberFull.trim())(lots);
    const currentLotRowId = lots[currentIndex].auctionMobilityLotRowId;
    const prevLotIds = getPrevLotIds(currentIndex, lots, 20);
    prevLotIds.push(currentLotRowId);
    return prevLotIds.concat(getNextLotIds(currentIndex, lots, 20));
  });

export const getLotRowIds = createSelector(
  [lotsSelector],
  lots => lots.map(lot => lot.auctionMobilityLotRowId)
);

const mapStateToProps = ({ auction, user, bidButton, lots, lotNumberFull }, ownProps) => {
  const { contactEmail } = auction;
  return {
    contactEmail,
    ...bidButton,
    ...ownProps,
    user,
    auctionMobilityLotRowIds: getAuctionMobilityLotRowIds({ lotNumberFull, lots })
  };
};

const mapDispatchToProps = {
  showModal,
  submitOffer,
  offerReject
};

export default connect(mapStateToProps, mapDispatchToProps)(BidButton);
