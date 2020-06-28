import React from 'react';
import PropTypes from 'prop-types';
import { isAuctionLive } from '../../utils/auctionLiveState';

export const showSaleroomLink = props => isAuctionLive(props, 20, 'lessThan') && props.saleTypeID === 1 && props.auctionMobilityAuctionRowId !== '0';

const LiveSaleroomLink = ({ amApiUrl, auctionMobilityAuctionRowId, locationName }) => (
  <section className="saleroom-link">
    <div>
      <p>
        <span
          className="green dot pulsate-bkg-green"
        />
        {`Live in ${locationName}`}
      </p>
      <h3>Auction in progress.</h3>
    </div>
    <a href={`${amApiUrl}live-auction/${auctionMobilityAuctionRowId}`} title="Saleroom Link">Go to Saleroom</a>
  </section>
);

LiveSaleroomLink.propTypes = {
  amApiUrl: PropTypes.string.isRequired,
  auctionMobilityAuctionRowId: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired
};

export default LiveSaleroomLink;
