import React from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import PhillipsTranslations from '../PhillipsTranslations/PhillipsTranslations';


const SaleBanner = (props) => {
  const auctionTitle = props.getTranslatedString('auctionTitle', props.currentLanguage);
  const auctionDetails = props.getTranslatedString('auctionDetailsSmall', props.currentLanguage);
  const truncatedTitle = truncate(auctionTitle, { length: 50, separator: ' ' });
  return (
    <div className="sale-title-banner">
      <a href={`/auctions/auction/${props.saleNumber}`}>
        <strong dangerouslySetInnerHTML={{ __html: props.truncateTitle ? truncatedTitle : auctionTitle }} />
        <br className="hidden-md" />
        <span dangerouslySetInnerHTML={{ __html: auctionDetails }} />
      </a>
    </div>
  );
};

SaleBanner.defaultProps = {
  currentLanguage: 'en-US',
  truncateTitle: false
};

SaleBanner.propTypes = {
  getTranslatedString: PropTypes.func.isRequired,
  saleNumber: PropTypes.string.isRequired,
  currentLanguage: PropTypes.string,
  truncateTitle: PropTypes.bool
};

export default PhillipsTranslations(SaleBanner);
