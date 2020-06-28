import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/fp/includes';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import PhillipsVideo from '../PhillipsVideo/PhillipsVideo';
import sendAnalytics from '../../utils/sendAnalytics';

const LotPageThumbNails = (props) => {
  let style = null;
  const thumbs = props.thumbNailPaths.map((thumb) => {
    const isAlternate = includes('phillipsds')(thumb.imagePath);
    const is360View = includes('360view')(thumb.imagePath);
    const isDetailVideo = includes('video')(thumb.imagePath);
    const submitAnalytics = () => {
      sendAnalytics({
        eventCategory: '360 View',
        eventAction: 'Clicked 360 View',
        eventLabel: window.location.href
      });
    };
    if (thumb.showLotVideo) {
      return (
        <div className={classNames('thumbnail-slide thumbnail-slide--lot-video', {
          'active': props.currentImage === 'vimeo'
        })}>
          <PhillipsVideo
            className="thumbnail-slide__video"
            source={props.videoSource}
          />
          <button
            className="thumbnail-slide__button thumbnail-slide__button--lot-video"
            type="button"
            onClick={props.onClick({
              imagePath: thumb.imagePath,
              isAlternate: false,
              show360View: false,
              showDetailVideo: false,
              showLotVideo: thumb.showLotVideo
            })}
          >
            &nbsp;
          </button>
        </div>
      );
    }
    let transformation = 'LotDetailAlternateThumbsMainImage';
    if (isAlternate) {
      transformation = 'LotDetailAlternateThumbs';
    }
    let image = null;
    if (is360View || isDetailVideo) {
      image = (<img alt={props.description} title={props.description} src={thumb.imagePath} style={{ width: '120px' }} />);
    } else {
      image = (
        <PhillipsImage
          alt={props.description}
          imagePath={thumb.imagePath}
          transformation={transformation}
          cloudinary={props.cloudinary}
          version={props.version}
          loader={false}
        />
      );
    }
    const isActive = props.currentImage === thumb.imagePath;
    const threeSixtyAnalytics = isActive && is360View ? submitAnalytics() : null;
    return (
      <div
        className={classNames('thumbnail-slide', { show360View: is360View, active: isActive, 'detail-video': isDetailVideo })}
        onClick={props.onClick({
          imagePath: thumb.imagePath,
          isAlternate,
          show360View: is360View,
          showDetailVideo: isDetailVideo,
          showLotVideo: false,
          send360Analytics: threeSixtyAnalytics
        })}
        role="tab"
      >
        {image}
      </div>
    );
  });
  if (!props.isMobile) {
    style = { height: `${props.size}px` };
  }
  return (
    <div className="thumbnails">
      <div className="thumbnail-carousel" style={style}>
        {thumbs}
      </div>
    </div>
  );
};

LotPageThumbNails.defaultProps = {
  cloudinary: true,
  currentImage: '',
  description: '',
  isMobile: false,
  size: 1,
  version: ''
};

LotPageThumbNails.propTypes = {
  cloudinary: PropTypes.bool,
  currentImage: PropTypes.string,
  description: PropTypes.string,
  isMobile: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.number,
  thumbNailPaths: PropTypes.arrayOf(
    PropTypes.object
  ),
  version: PropTypes.string,
  videoSource: PropTypes.string.isRequired
};

export default LotPageThumbNails;
