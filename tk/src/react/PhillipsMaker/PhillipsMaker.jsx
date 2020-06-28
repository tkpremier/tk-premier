import React from 'react';
import PropTypes from 'prop-types';
import FollowArtist from '../FollowArtist/FollowArtist';
import PhillipsImage from '../PhillipsImage/PhillipsImage';

// Updated PhillipsArtist used on Homepage
const PhillipsMaker = ({
  editable, imagePath, imageVersion, imageWidth, makerId, makerName, makerUrl, style, useCloudinary
}) => (
  <div
    className="phillips-artist"
    style={style}
  >
    <a href={makerUrl}>
      <PhillipsImage
        cloudinary={useCloudinary}
        transformation="HomePageCarousel"
        imagePath={imagePath}
        imageVersion={imageVersion}
        width={imageWidth}
      />
      <div className="description">
        <h3>{makerName}</h3>
      </div>
    </a>
    {editable
      ? null
      : <FollowArtist makerId={makerId} />
    }
  </div>
);

PhillipsMaker.defaultProps = {
  editable: false,
  imagePath: '',
  imageVersion: '',
  imageWidth: '',
  makerUrl: '',
  style: {},
  useCloudinary: true
};

PhillipsMaker.propTypes = {
  editable: PropTypes.bool,
  imagePath: PropTypes.string,
  imageVersion: PropTypes.string,
  imageWidth: PropTypes.string,
  makerId: PropTypes.number.isRequired,
  makerName: PropTypes.string.isRequired,
  makerUrl: PropTypes.string,
  style: PropTypes.shape(),
  useCloudinary: PropTypes.bool
};

export default PhillipsMaker;
