import React from 'react';
import PropTypes from 'prop-types';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import PhillipsSlider from '../PhillipsSlider/PhillipsSlider';

const Highlights = ({ highlights, useCloudinary }) => {
  return (
    <PhillipsSlider
      animation="fade"
      pagination={highlights.length > 1}
      arrows={highlights.length > 1}
    >
      {highlights.map(highlight => (
        <div className="auction-highlight">
          <PhillipsImage
            alt={highlight.title.replace(/<\/?[^>]+(>|$)/g, '')}
            imagePath={highlight.image}
            cloudinary={useCloudinary}
            description={highlight.title}
            transformation="AuctionHighlightsGalleryModal"
            version={highlight.version}
          />
          <span
            className="highlights-caption"
            dangerouslySetInnerHTML={{ __html: highlight.title }}
          />
        </div>
      ))}
    </PhillipsSlider>
  );
};
Highlights.defaultProps = {
  highlights: []
};
Highlights.propTypes = {
  highlights: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    version: PropTypes.number
  })),
  useCloudinary: PropTypes.bool.isRequired
};

export default Highlights;