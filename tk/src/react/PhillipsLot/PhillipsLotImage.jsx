import React from 'react';
import PropTypes from 'prop-types';
import replace from 'lodash/replace';
import startCase from 'lodash/startCase';
import Link from 'redux-first-router-link';
import PhillipsImage from '../PhillipsImage/PhillipsImage';

const ImageLoaderPlaceholder = () => (
  <div
    className="image-loader"
    style={{ width: '100%', height: '320px' }}
  >
    <span className="signal" />
  </div>
);

const PhillipsLotImage = (props) => {
  const displayType = (
    props.showCuratedView
    && props.auctionLotDisplayTypeName !== 'single-cell'
  )
    ? props.auctionLotDisplayTypeName
    : props.imageTransformation;
  const imageTransformation = replace(startCase(displayType), /\s/g, '');
  const makerName = (props.makerName.length > 0)
    ? props.makerName
    : 'NoArtist';

  const lotUrl = !makerName || makerName.toUpperCase() === 'NOARTIST'
    ? {
      type: 'CHANGE_LOT_NO_MAKER',
      payload: {
        saleNumber: props.saleNumber,
        lotNumberFull: props.lotNumberFull.trim()
      }
    }
    : {
      type: 'CHANGE_LOT',
      payload: {
        makerName: makerName,
        saleNumber: props.saleNumber,
        lotNumberFull: props.lotNumberFull.trim()
      }
    };
  return (
    <div className="image">
      {props.hasRouter
        ? (
          <Link
            to={lotUrl}
          >
            {props.isVisible
              ? (
                <PhillipsImage
                  alt={`${props.makerName} - ${props.description}`}
                  imagePath={props.imagePath}
                  transformation={imageTransformation}
                  cloudinary={props.useCloudinary}
                  version={props.imageVersion}
                  width={251}
                  height={320}
                />
              )
              : <ImageLoaderPlaceholder />
            }
          </Link>
        )
        : (
          <a href={props.detailLink} className="detail-link">
            {props.isVisible
              ? (
                <PhillipsImage
                  alt={`${props.makerName} - ${props.description}`}
                  imagePath={props.imagePath}
                  transformation={imageTransformation}
                  cloudinary={props.useCloudinary}
                  version={props.imageVersion}
                  width={251}
                  height={320}
                />
              )
              : <ImageLoaderPlaceholder />
            }
          </a>
        )
      }
    </div>
  );
};

PhillipsLotImage.defaultProps = {
  auctionLotDisplayTypeName: null,
  description: '',
  detailLink: '#',
  hasRouter: false,
  imagePath: '/images/item_placeholder.png',
  imageTransformation: 'SingleCell',
  imageVersion: '1',
  isVisible: false,
  lotNumberFull: '',
  makerName: '',
  saleNumber: '',
  showCuratedView: false,
  useCloudinary: true
};

PhillipsLotImage.propTypes = {
  auctionLotDisplayTypeName: PropTypes.string,
  description: PropTypes.string,
  detailLink: PropTypes.string,
  hasRouter: PropTypes.bool,
  imagePath: PropTypes.string,
  imageTransformation: PropTypes.string,
  imageVersion: PropTypes.string,
  isVisible: PropTypes.bool,
  lotNumberFull: PropTypes.string,
  makerName: PropTypes.string,
  saleNumber: PropTypes.string,
  showCuratedView: PropTypes.bool,
  useCloudinary: PropTypes.bool
};

export default PhillipsLotImage;
