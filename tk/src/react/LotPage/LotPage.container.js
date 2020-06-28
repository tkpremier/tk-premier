import { connect } from 'react-redux';
import LotPage from './LotPage';
import { getAuctionMobilityLotRowIds } from './LotPageBidButton.container';
import { currentLotSelector } from './selectors';

const mapStateToProps = (state, { isServer, loginRequired }) => {
  const { modal, auction, lotNumberFull, lots, currentLanguage, bidButton, user } = state;
  return {
    auction,
    auctionMobilityLotRowIds: getAuctionMobilityLotRowIds({ lotNumberFull, lots }),
    bidButton,
    currentLanguage,
    currentLot: currentLotSelector({ lotNumberFull, lots }),
    isServer,
    loginRequired,
    lots,
    modal,
    user
  };
};

export default connect(mapStateToProps)(LotPage);