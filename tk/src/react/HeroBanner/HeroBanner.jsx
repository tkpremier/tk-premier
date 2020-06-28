import React from 'react';
import PropTypes from 'prop-types';

const HeroBanner = (props) => {
  return (
    <div className="banner">
      <div className="image" style={{ backgroundImage: `url(${props.image})` }} />
      <div className="content-body container">
        <h1 className="headline">{props.headline}</h1>
      </div>
    </div>
  );
};

HeroBanner.propTypes = {
  image: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired
};

export default HeroBanner;
