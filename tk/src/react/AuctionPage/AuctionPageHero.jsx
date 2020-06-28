import React from 'react';
import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';

const HeroAuctionNavigation = props => (
  <nav className="auction-navigation">
    <div className="previous arrow">
      <div className="title">Previous:<strong>{props.previousSale.auctionTitle}</strong></div>
      <a href={`/auctions/auction/${props.previousSale.saleNumber}`}>Previous</a>
    </div>
    <div className="next arrow">
      <div className="title">Next:<strong>{props.nextSale.auctionTitle}</strong></div>
      <a href={`/auctions/auction/${props.nextSale.saleNumber}`}>Next</a>
    </div>
  </nav>
)

const AuctionPageHero = props => (
  <div className="banner" ref={props.innerRef}>
    <div className="image" style={{ backgroundImage: `url(${props.image})` }} />
    <div className="content-body container">
      <div className="row">
        <div className="title-box col-xs-12">
          <h1 className="title-box__title">{props.title}</h1>
          <div className="date" dangerouslySetInnerHTML={{ __html: props.auctionDetails }} />
        </div>
      </div>
      {!isNull(props.previousSale) && !isNull(props.nextSale)
        ? <HeroAuctionNavigation {...props} />
        : null
      }
    </div>
  </div>
);

AuctionPageHero.propTypes = {
  innerRef: PropTypes.shape({ current: null }).isRequired
};

export default AuctionPageHero;
