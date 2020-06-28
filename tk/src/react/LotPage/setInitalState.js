import omit from 'lodash/fp/omit';
import createInitialUserState from '../PhillipsUser/createInitialUserState';

const setInitialState = ({ userJSON, lotNumber, auction, buyNowSaleNumber, language }) => {
  // fix for WEB-4667 [PERPETUAL] - Change sold price text logic to be based on sale number
  const lots = auction.lots.map(lot => ({
    ...lot,
    saleTypeId: buyNowSaleNumber.includes(lot.saleNumber)
      ? 5
      : lot.saleTypeId
  }));
  const lotsOmittedAuction = omit('lots')(auction);
  return {
    ...createInitialUserState(JSON.parse(userJSON)),
    currentLanguage: language,
    modal: {
      show: false,
      type: ''
    },
    bidButton: {
      offerStatus: '',
      offer: 0,
      timedAuctionLive: false,
      widgetStatus: '',
      error: null
    },
    inquireForm: {
      status: '',
      message: ''
    },
    lotNumberFull: lotNumber.toString() || '',
    auction: {
      ...lotsOmittedAuction,
      saleTypeID: (buyNowSaleNumber.includes(lotsOmittedAuction.saleNumber))
        ? 5
        : lotsOmittedAuction.saleTypeID
    },
    lots: lots
  };
};

export default setInitialState;