import React from 'react';
import PropTypes from 'prop-types';

const SlideCaption = ({ url, htmlCaption, slideWidth }) => {
  const trackSegment = () => {
    if (!_.isUndefined(window.analytics)) {
      analytics.track('Click', {
        category: 'Homepage / Hero Image',
        label: `Destination ${url}`
      });
    }
  };
  return (
    <div className="caption-slide" style={{ width: `${slideWidth}px` }}>
      <a href={url} onClick={trackSegment}>
        <div className="caption" dangerouslySetInnerHTML={{ __html: htmlCaption }}></div>
      </a>
    </div>
  );
};

SlideCaption.propTypes = {
  url: PropTypes.string,
  htmlCaption: PropTypes.string,
  slideWidth: PropTypes.number
};

export default SlideCaption;
