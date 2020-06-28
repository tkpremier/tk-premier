import React from 'react';
import { isUndefined } from 'lodash/fp';
import PropTypes from 'prop-types';

const ImageSlider = ({ slideActive, url, imageUrl }) => {
  const classes = slideActive ? 'phillips-slide active' : 'phillips-slide';
  const imageStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: '0% 0%'
  };
  const trackSegment = () => {
    if (!isUndefined(window.analytics)) {
      analytics.track('Click', {
        category: 'Homepage / Hero Image',
        label: `Destination ${url}`
      });
    }
  };
  return (
    <div className={classes}>
      <a href={url} onClick={trackSegment}>
        <div className="slide-image">
          <div className="image-container" style={imageStyles}></div>
        </div>
      </a>
    </div>
  );
};

ImageSlider.propTypes = {
  slideActive: PropTypes.bool,
  url: PropTypes.string,
  imageUrl: PropTypes.string
};

export default ImageSlider;
