import React from 'react';
import PropTypes from 'prop-types';

const AuctionVideo = props => (
  <div className="auction-video">
    <div className="caption row col-xs-12 clearfix">
      <div className="left col-xs-6">
        <p className="eyebrow"><em>{props.liveAuctionSuperTitle}</em></p>
        <h2>{props.liveAuctionTitle}</h2>
      </div>
      <div className="right col-xs-6">
        <a className="video-link" href={props.liveAuctionLinkUrl}>{props.liveAuctionLinkDesc}</a>
      </div>
    </div>
    <div className="video-wrapper">
      <iframe
        src={props.liveAuctionUrl}
        allowFullScreen
        title={props.liveAuctionLinkDesc}
      />
    </div>
  </div>
);

AuctionVideo.propTypes = {
  liveAuctionTitle: PropTypes.string,
  liveAuctionSuperTitle: PropTypes.string,
  liveAuctionLinkUrl: PropTypes.string,
  liveAuctionLinkDesc: PropTypes.string,
  liveAuctionUrl: PropTypes.string
};


export default AuctionVideo;
