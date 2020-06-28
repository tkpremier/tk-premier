import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash/fp';
import { Cloudinary } from 'cloudinary-core';
import PhillipsPageMeta from '../PhillipsPageMeta/PhillipsPageMeta';

const cloudinaryConfig = Cloudinary.new({ cloud_name: 'phillips-assets' });

const getMetaData = (props) => {
  const descriptionArtist = !props.makerName || props.makerName === 'NoArtist' ? '' : `by ${props.makerName} `;
  const titleArtist = !props.makerName || props.makerName === 'NoArtist' ? '' : `${props.makerName} - `;
  const titleCirca = props.circa === null ? '' : `, ${props.circa}`;
  const title = `${titleArtist}${props.description}${titleCirca} | Phillips`;
  const keywords = `Phillips Auctioneers LLC, auction, lot, ${props.auction.title}, ${props.makerName}, ${props.auction.auctionDetailsSmall}`;
  const lastPartMetaDescription = (props.auction.timeState === 2 || props.auction.timeState === 1)
    ? 'place an advance bid now'
    :  'its final selling price';
  const description = `View ${props.description} ${descriptionArtist}sold at ${props.auction.auctionTitle} on ${props.auction.auctionDetailsSmall}. Learn more about the piece and artist, and ${lastPartMetaDescription}`;

  // const description = `Lot ${props.lotNumberFull}, ${props.auction.title}, ${props.makerName}, ${props.auction.auctionDetailsSmall}`;
  const url = `https://www.phillips.com${props.detailLink}`;
  const image = props.isCloudinary
    ? cloudinaryConfig.url(
      props.imagePath,
      { transformation: 'Website_LotDetailMainImage' }
    )
    : `https://www.phillips.com${props.imagePath}/605/550/false/false/false`;
  return {
    title,
    keywords,
    description,
    url,
    image
  };
};

const LotPageMeta = (props) => (
  <PhillipsPageMeta {...getMetaData(props)} />
);

LotPageMeta.propTypes = {
  lotNumberFull: PropTypes.string.isRequired
};

export default LotPageMeta;
