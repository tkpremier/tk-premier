import React, { Component } from 'react';
import { has } from 'lodash/fp';
import PropTypes from 'prop-types';
import cloudinaryConfig from './cloudinaryConfig';

const cloudinaryTransformations = {
  AuctionHighlightsGalleryModal: 'Website_AuctionHighlightsGalleryModal',
  AuctionInlinePopup: 'Website_AuctionPageLot',
  AuctionLotsView: 'Website_AuctionPageLot',
  AuctionThumb: 'Website_Auction_Thumb_dev4',
  EditorialHubFeaturedMain: 'editorial_image_featured-main',
  EditorialHubFullWidth: 'editorial_image_full-width',
  EditorialHub: 'editorial_image',
  EditorialHubVideoThumb: 'editorial_hub_feed_video_dev3',
  HomePageCarousel: 'Website_HomePageCarousel',
  LotDetailMainImage: 'Website_LotDetailMainImage',
  LotDetailZoomImage: 'Website_LotDetailZoomImage',
  LotDetailAlternateThumbs: 'Website_LotDetailThumb',
  LotDetailAlternateThumbsMainImage: 'Website_LotDetailThumb',
  LotDetailAltImageFullSize: 'Website_LotDetailMainImage',
  LotDetailZoomImageAlt: 'Website_LotDetailZoomImage',
  // Curated Auction Transformations
  SingleCell: 'Website_CuratedAuction_SingleCell_NoPad_dev2',
  // Curated Auction Containers
  ContainerTworowsTwocolumnsFeatureLeft: 'Website_CuratedAuction_TwoColumns_dev2',
  ContainerTworowsTwocolumnsFeatureRight: 'Website_CuratedAuction_TwoColumns_dev2',
  ContainerTworowsTwocolumnsFeatureCenter: 'Website_CuratedAuction_TwoColumns_dev2',
  ContainerTworowsTwocolumnsTopRight: 'Website_CuratedAuction_SingleCell_NoPad_dev2',
  ContainerTworowsTwocolumnsBtmRight: 'Website_CuratedAuction_SingleCell_NoPad_dev2',
  ContainerTworowsTwocolumnsTopLeft: 'Website_CuratedAuction_SingleCell_NoPad_dev2',
  ContainerTworowsTwocolumnsBtmLeft: 'Website_CuratedAuction_SingleCell_NoPad_dev2',
  ContainerTworowsThreecolumnsTopLeft: 'Website_CuratedAuction_SingleCell_NoPad',
  ContainerTworowsThreecolumnsBottomLeft: 'Website_CuratedAuction_SingleCell_NoPad',
  ContainerTworowsThreecolumnsTopMiddle: 'Website_CuratedAuction_SingleCell_NoPad',
  ContainerTworowsThreecolumnsBottomMiddle: 'Website_CuratedAuction_SingleCell',
  ContainerTworowsThreecolumnsTopRight: 'Website_CuratedAuction_SingleCell_NoPad',
  ContainerTworowsThreecolumnsBottomRight: 'Website_CuratedAuction_SingleCell_NoPad',
  ContainerTworowsThreecolumnsFeatureLeft: 'Website_CuratedAuction_TwoRows',
  ContainerTworowsThreecolumnsFeatureMiddle: 'Website_CuratedAuction_TwoRows',
  ContainerTworowsThreecolumnsFeatureRight: 'Website_CuratedAuction_TwoRows',
  OnerowTwocolumnsLeft: 'Website_CuratedAuction_TwoColumnsOneRowNoPad',
  OnerowTwocolumnsRight: 'Website_CuratedAuction_TwoColumnsOneRowNoPad',
  TwoColumnsOneRowNoPad: 'Website_CuratedAuction_TwoColumnsOneRowNoPad',
  TwoColumnsOneRow: 'Website_CuratedAuction_TwoColumnsOneRowNoPad',
  ThreeColumns: 'Website_CuratedAuction_ThreeColumns',
  ThreeColumnsOneRow: 'Website_CuratedAuction_ThreeColumns',
  TwoRowsTwoColumns: 'Website_CuratedAuction_TwoRowsTwoColumns',
  TwoRows: 'Website_CuratedAuction_TwoRows',
  TwoLotsOneRow: 'Website_CuratedAuction_TwoLotsOneRow'
};

export const getCloudinaryTransformation = (transformation) => {
  if (typeof cloudinaryTransformations[transformation] === 'undefined') {
    console.error(`Cloudinary Transformation ${transformation} does not exist`);
    return 'error';
  }
  return cloudinaryTransformations[transformation];
};

class PhillipsCloudinary extends Component {
  constructor(props) {
    super(props);
    this.imgRef = null;
    this.handleLoad = this.handleLoad.bind(this);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    if (this.imgRef.complete && !this.state.loaded) {
      this.handleLoad(this.imgRef);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.publicId !== nextProps.publicId) {
      this.setState({
        'loaded': false
      });
    }
  }

  getImageSource() {
    // set protocol dynamically ?
    // switch imageSource to cname once configured
    return this.props.useTransformation
      ? cloudinaryConfig.url(
        this.props.publicId,
        {
          transformation: getCloudinaryTransformation(this.props.transformation),
          version: this.props.version
        }
      )
      : cloudinaryConfig.url(
        this.props.publicId,
        {
          width: this.props.width,
          height: this.props.height,
          crop: this.props.crop
        }
      );
  }

  handleLoad(e) {
    const event = has('target')(e) ? e : { 'target': e, 'type': 'load' };
    if (!this.state.loaded) {
      this.props.onLoad(event);
      this.setState({ loaded: true });
    }
  }

  render() {
    const src = this.getImageSource();
    if (!this.props.useTransformation) {
      console.log('src: ', src);
    }
    return (
      <img
        alt={this.props.alt}
        data-pin-url={src}
        onError={this.props.onError}
        onLoad={this.handleLoad}
        src={src}
        title={this.props.alt}
        ref={(el) => { this.imgRef = el; }}
      />
    );
  }
}

PhillipsCloudinary.defaultProps = {
  alt: 'no alt text provided',
  width: 250,
  height: 320,
  crop: 'scale',
  version: '1',
  angle: 0,
  effect: '',
  overlay: '',
  transformation: 'AuctionLotsView',
  useTransformation: true
};

PhillipsCloudinary.propTypes = {
  alt: PropTypes.string,
  publicId: PropTypes.string.isRequired,
  version: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  crop: PropTypes.string,
  transformation: PropTypes.string,
  useTransformation: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default PhillipsCloudinary;
