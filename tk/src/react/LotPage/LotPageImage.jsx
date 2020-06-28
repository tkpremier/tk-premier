import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNull, isEmpty } from 'lodash/fp';
import DetailVideo from './DetailVideo';
import LotPageThumbNails from './LotPageThumbNails';
import OpenSeaDragonView from '../OpenSeaDragon/OpenSeaDragonView';
import Phillips360View from '../Phillips360View/Phillips360View';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import cloudinaryConfig from '../PhillipsImage/cloudinaryConfig';
import PhillipsVideo from '../PhillipsVideo/PhillipsVideo';
import sendAnalytics from '../../utils/sendAnalytics';

class LotPageImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: props.imagePath,
      isAlternate: false,
      loading: true,
      show360View: false,
      showOpenSeaDragon: false,
      showDetailVideo: false,
      showLotVideo: false,
      thumbNailSize: '0px'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imagePath !== this.state.currentImage) {
      this.setState(state => ({
        ...state,
        currentImage: nextProps.imagePath,
        isAlternate: false,
        loading: true,
        show360View: false,
        showOpenSeaDragon: false,
        showDetailVideo: false,
        showLotVideo: false
      }));
    }
  }

  getOpenSeaDragonUrl(baseUrl) {
    let url = '';
    if (this.props.cloudinary) {
      // set url to cloudinary url;
      url = cloudinaryConfig.url(baseUrl, {
        //fetch_format: 'auto',
        transformation: 'Website_LotDetailZoomImage',
        version: this.props.cloudinaryVersion
      });
    } else {
      if (this.state.isAlternate) {
        url = `/Xigen/image.ashx?path=${baseUrl}&width=2000&height=4000`;
      } else {
        url = `${baseUrl}/2000/4000.jpg`;
      }
    }
    return url;
  }

  isNullOrEmpty(str) {
    return isNull(str) || isEmpty(str);
  }

  configureOpenSeaDragon() {
    return {
      prefixUrl: '/images/dzitest/img/',
      tileSources: {
        type: 'image',
        url: this.getOpenSeaDragonUrl(this.state.currentImage)
      },
      debugMode: false,
      showNavigationControl: false,
      blendTime: 0.0,
      animationTime: 1.5,
      springStiffness: 15.0,
      maxZoomPixelRatio: 1.0,
      minZoomImageRatio: 0.9,
      zoomPerScroll: 1.1,
      constrainDuringPan: true,
      visibilityRatio: 1
    };
  }

  render() {
    const submitAnalytics = () => {
      sendAnalytics({
        eventCategory: 'View Detail Video Click',
        eventAction: 'Clicked View Surface Detail Video',
        eventLabel: window.location.href
      });
    };

    const showOpenSeaDragon = () => {
      this.setState((state) => {
        return { ...state, showOpenSeaDragon: true };
      });
    };

    const close = () => {
      this.setState((state) => {
        return { ...state, showOpenSeaDragon: false };
      });
    };

    const onLoad = (event) => {
      let size = event.target.offsetHeight;
      if (this.props.isMobile) {
        size = event.target.offsetWidth;
      }
      this.setState((state) => {
        return { ...state, loading: false, thumbNailSize: size };
      });
    };

    let thumbNails = null;
    if (!this.state.loading) {
      if (this.props.lotImages.length > 1
        || this.props.has360View
        || !this.isNullOrEmpty(this.props.detailVideoUrl)
        || !this.isNullOrEmpty(this.props.videoSource)
      ) {
        const switchImage = ({
          imagePath,
          isAlternate,
          show360View,
          showDetailVideo,
          showLotVideo
        }) => () => {
          imagePath.includes('lot_detail_videos')
            ? submitAnalytics()
            : null;

          this.setState(state => ({
            ...state,
            currentImage: imagePath,
            isAlternate,
            show360View,
            showDetailVideo,
            showLotVideo
          }));
        };

        const videoThumbs = [];
        if (this.props.videoSource.length > 0 && this.props.videoAboveTheFold) {
          videoThumbs.push({
            imagePath: 'vimeo',
            showLotVideo: true,
            isViewInRoom: false
          });
        }
        if (this.props.has360View) {
          const limeLightUrl = localStorage ? localStorage.getItem('limelightUrl') : 'http://phillips.vo.llnwd.net/v1/';
          videoThumbs.push({
            imagePath: `${limeLightUrl}360view/${this.props.saleNumber}/${this.props.lotNumber.trim()}/1/Lv2/img01.jpg`,
            isViewInRoom: false
          });
        }
        if (!this.isNullOrEmpty(this.props.detailVideoUrl)) {
          videoThumbs.push({
            imagePath: `${this.props.detailVideoUrl}/thumb.jpg`,
            isViewInRoom: false
          });
        }
        const thumbs = [...this.props.lotImages];
        if (videoThumbs.length > 0) {
          thumbs.splice(1, 0, ...videoThumbs);
        }
        thumbNails = (
          <div className="col-xs-12 col-sm-2">
            <LotPageThumbNails
              cloudinary={this.props.cloudinary}
              currentImage={this.state.currentImage}
              description={this.props.description}
              isMobile={this.props.isMobile}
              onClick={switchImage}
              size={this.state.thumbNailSize}
              thumbNailPaths={thumbs}
              version={this.props.cloudinaryVersion}
              videoSource={this.props.videoSource}
            />
          </div>
        );
      }
    }

    const transform = this.state.isAlternate ? 'LotDetailAltImageFullSize' : 'LotDetailMainImage';

    let loader = null;
    if (this.state.loading) {
      loader = (<div className="image-loader"><span className="signal" /></div>);
    }
    let mainContent = null;
    if (this.state.showLotVideo && this.props.videoAboveTheFold) {
      const videoClassName = classNames("phillips-video--main-lot-image", {
        'phillips-video--square-format': this.props.videoSquareAspectRatio
      });
      mainContent = (
        <PhillipsVideo
          squareFormat={this.props.videoSquareAspectRatio}
          className={videoClassName}
          description={this.props.videoDescription}
          source={this.props.videoSource}
          title={this.props.videoTitle}
        />
      );
    } else if (this.state.show360View) {
      const source = this.state.currentImage.replace('/Lv2/img01.jpg', '');
      let frameCount = 36;
      if (this.props.saleNumber === 'NY080117') {
        frameCount = 30;
      }
      mainContent = (
        <Phillips360View source={source} frameCount={frameCount} />
      );
    } else if (this.state.showDetailVideo) {
      mainContent = (
        <DetailVideo src={`${this.props.detailVideoUrl}/video.mp4`} />
      );
    } else {
      mainContent = (
        <PhillipsImage
          className="main-lot-image"
          alt={this.props.description}
          imagePath={this.state.currentImage}
          transformation={transform}
          cloudinary={this.props.cloudinary}
          version={this.props.cloudinaryVersion}
          hideLoader
          onLoad={onLoad}
        />
      );
    }
    const imageContainerClasses = classNames('image-container col-xs-12', {
      loading: this.state.loading,
      'col-sm-10': thumbNails !== null,
      'is-video': this.state.showDetailVideo
    });
    const classes = classNames('lot-image', {
      vertical: !this.props.isMobile,
      hasThumbnails: thumbNails !== null
    });
    return (
      <div className={classes}>
        {loader}
        {thumbNails}
        <div
          className={imageContainerClasses}
          onClick={
            (this.state.show360View || this.state.showDetailVideo) ? null : showOpenSeaDragon
          }
        >
          {mainContent}
        </div>
        {this.state.showOpenSeaDragon ?
          <OpenSeaDragonView
            close={close}
            config={this.configureOpenSeaDragon()}
            showControls
          />
          :
          null
        }
      </div>
    );
  }
}

LotPageImage.defaultProps = {
  cloudinary: true,
  description: '',
  detailVideoUrl: null,
  has360View: false,
  imagePath: '',
  isMobile: true,
  lotImages: [],
  lotNumber: '',
  saleNumber: '',
  cloudinaryVersion: '',
  videoAboveTheFold: true,
  videoDescription: '',
  videoSource: '',
  videoSquareAspectRatio: false,
  videoTitle: ''
};

LotPageImage.propTypes = {
  cloudinary: PropTypes.bool,
  description: PropTypes.string,
  detailVideoUrl: PropTypes.string,
  has360View: PropTypes.bool,
  imagePath: PropTypes.string,
  isMobile: PropTypes.bool,
  lotImages: PropTypes.arrayOf(PropTypes.object),
  lotNumber: PropTypes.string,
  saleNumber: PropTypes.string,
  cloudinaryVersion: PropTypes.string,
  videoAboveTheFold: PropTypes.bool,
  videoDescription: PropTypes.string,
  videoSource: PropTypes.string,
  videoSquareAspectRatio: PropTypes.bool,
  videoTitle: PropTypes.string
};

export default LotPageImage;
