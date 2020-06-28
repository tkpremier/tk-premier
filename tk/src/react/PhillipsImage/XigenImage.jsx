import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import { has } from 'lodash/fp';

const transformationDictionary = {
  AuctionCatalogBuy: '&width=200',
  AuctionHighlightsGalleryInPage: '&width=590&height=472&sizemode=fitpadded&align=center',
  AuctionHighlightsGalleryModal: '&width=900&height=500&sizemode=fitpadded&align=center',
  AuctionInlinePopup: '/464/535/true/true/true/fitpadded/right',
  AuctionLotsView: '/464/593/true/true/true/fitpadded/bottom',
  MyPhillipsLotsView: '/220/281/true/true/true/fitpadded/left',
  HomePageCarousel: '/220/281/true/true/true/fitpadded/bottom',
  AuctionLotsViewSmaller: '/172/220/true/true/true/fitpadded/bottom',
  AuctionMidBannerImg: '&width=1039&height=831',
  AuctionPastBannerGallery: '&width=308&height=222',
  AuctionPastGallery: '&width=308&height=222&sizemode=fitpadded&align=right',
  AuctionThumbOnLocation: '&width=250',
  LotDetailAltImageFullSize: '&width=410&height=550&padx=false&pady=true',
  LotDetailAlternateThumbs: '&width=120&height=400',
  LotDetailAlternateThumbsMainImage: '/120/400',
  LotDetailImageCustomSize: '/{0}/{1}/true/true/true/fitpadded/top',
  LotDetailMainImage: '/605/550/false/false/false',
  LotDetailMainImageSmaller: '/410/550/false/false/false',
  LotDetailSideImage: '/325/220/false/false/false',
  LotDetailZoomImage: '/2000/4000',
  LotDetailZoomImageAlt: '&width=2000&height=4000',
  PastAuctionBannerImage: '&width=960&height=767',
  SearchResultsLots: '&width=175&height=170&padx=true&pady=true',
  VideoImage: '&width=219&height=219&sizemode=fitpadded&align=center&background-color=#ccc;',
  // Curated Auction Transformations
  SingleCell: '/464/593/true/true/true/fitpadded/bottom',
  TwoColumnsOneRow: '/928',
  ThreeColumns: '/1392',
  ThreeColumnsOneRow: '/1392/593',
  TwoRowsTwoColumns: '/928/1186',
  TwoRows: '/464/1186',
  TwoLotsOneRow: '/650/593'
};

class XigenImage extends Component {
  constructor() {
    super();
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
    if (nextProps.imagePath !== this.props.imagePath) {
      this.setState({
        loaded: false
      });
    }
  }

  getImageSource() {
    const diskStationTransforms = [
      'LotDetailAltImageFullSize',
      'LotDetailAlternateThumbs',
      'AuctionHighlightsGalleryInPage',
      'AuctionHighlightsGalleryModal',
      'AuctionPastGallery'
    ];
    let imageUrl = this.props.imagePath;
    if (this.props.transformation) {
      const transformation = transformationDictionary[this.props.transformation];
      if (typeof transformation === 'undefined') {
        console.warn(`transformation ${this.props.transformation} does not exist in dictionary`);
      } else {
        imageUrl = `${imageUrl}${transformation}`;
        if (includes(diskStationTransforms, this.props.transformation)) {
          imageUrl = `https://www.phillips.com/Xigen/image.ashx?path=${imageUrl}`;
        }
      }
    } else {
      imageUrl = `${imageUrl}/${this.props.width}/${this.props.height}`;
    }

    return imageUrl;
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
    return (
      <img
        alt={this.props.alt}
        className="xigen-image"
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


XigenImage.defaultProps = {
  transformation: false,
  constrain: false,
  padX: false,
  padY: false,
  sizeMode: null,
  align: null,
  backgroundColor: null
};

XigenImage.propTypes = {
  imagePath: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default XigenImage;
