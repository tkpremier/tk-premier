import React from 'react';
import PropTypes from 'prop-types';
import PhillipsImage from '../PhillipsImage/PhillipsImage';

const PhillipsAuctionItem = props => {
  const tempLink = `/auctions/auction/${props.saleNumber}`;
  const imgSrc = `\\phillipsds\\website\\Certificates\\${props.saleNumber}\\${props.saleNumber}.jpg`;
  return (
    <div className="auction">
      <a href={tempLink}>
        <PhillipsImage
          imagePath={imgSrc}
          transformation={'AuctionPastGallery'}
          cloudinary={false}
        />
      </a>
      <h2><a href={tempLink}>{props.auctionTitle}</a></h2>
      <h3>{props.location} Auction</h3>
    </div>
  );
};

PhillipsAuctionItem.defaultProps = {
  permalink: '#',
  image: '/images/item_placeholder.png',
  location: '',
  title: '',
  auctionTitle: '',
  saleNumber: ''
};

PhillipsAuctionItem.propTypes = {
  permalink: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.string,
  title: PropTypes.string,
  auctionTitle: PropTypes.string,
  saleNumber: PropTypes.string
};

export default PhillipsAuctionItem;
