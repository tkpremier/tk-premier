import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LotSoldPrice from '../components/LotSoldPrice';
import formatEstimate from '../utils/formatEstimate';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import { defaultLotProps } from '../PropTypes/proptypes';

const showHammer = (props) => {   
  if (props.saleTypeId === 4 && props.lotStatusId === 2) {
    return (<p className="sold">SOLD</p>);
  } 
  if (props.hammerPlusBP > 0) {
    if (!props.showSoldPrice) { 
      return (<p className="sold">SOLD</p>) 
    }
    return (<LotSoldPrice {...props} />);
  }  
  return null;
};

const showEstimate = (props) => {
  let estimate = null;
  if (props.saleNumber === 'NY011118' || props.saleNumber === 'EX010418') {
    return estimate;
  }

  if (props.estimateText !== null && props.estimateText.length > 0) {
    estimate = (
      <p>
        <strong>{props.estimateText}</strong>
      </p>
    )
  } else {
    if (props.lowEstimate) {
      if (props.saleTypeId === 4) {
        if (props.lotStatusId !== 2 && props.showSaleOffers) {
          estimate = (<p>
            <strong>Asking Price</strong>&nbsp;
            {props.currencySign}{formatEstimate(props.lowEstimate)}&nbsp;
            {props.estimateSpecialChar}<br />
          </p>);
        }
      } else {
        estimate = (<p>
          <strong>Estimate</strong>&nbsp;
          {props.currencySign}{formatEstimate(props.lowEstimate)} - {formatEstimate(props.highEstimate)}&nbsp;
          {props.estimateSpecialChar}<br />
        </p>);
      }
    } else if (!props.isExhibition) {
      estimate = <p>Estimate on Request</p>;
    }
  }
  return estimate;
}

const WatchDetails = (props) => {
  return (
    <span className="is-watch">
      {props.wReferenceNo && props.wReferenceNo.length > 0 ?
        (<span>Ref. {props.wReferenceNo} </span>) :
        null
      }
      {props.wReferenceNo && props.wReferenceNo.length > 0 ?
        (<br />) :
        null
      }
      {props.wModelName && props.wModelName.length > 0 ?
        (<span>Model: {props.wModelName} </span>) :
        null
      }
      {props.wModelName && props.wModelName.length > 0 ?
        (<br />) :
        null
      }
    </span>
  );
};

class PhillipsLot extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  render() {
    const isWatch = this.props.saleNumber.indexOf('08') === 2;
    const hammerOrEst = (this.props.hammerPlusBP > 0 || this.props.saleTypeId === 4 && this.props.lotStatusId === 2)
      ? showHammer(this.props)
      : this.props.showEstimateText
        ? showEstimate(this.props)
        : null;
    return (
      <li
        className="phillips-lot"
        style={this.props.style}
      >
        <div className="image">
          <a href={this.props.detailLink} data-image={`${this.props.imagePath}`}>
            <PhillipsImage
              cloudinary={this.props.useCloudinary}
              transformation="HomePageCarousel"
              imagePath={this.props.imagePath}
              version={this.props.imageVersion}
              alt={`${this.props.makerName} - ${this.props.description}`}
              loader={false}
              width={this.props.imageWidth}
            />
          </a>
        </div>
        <div className="description">
          <a href={this.props.detailLink}>
            {this.props.makerId ?
              (<p className="artist"><strong>{this.props.makerName}</strong></p>) :
              null
            }
            {isWatch ?
              <WatchDetails {...this.props} className="is-watch" /> :
              null
            }
            <p className="title"><em>{this.props.description}</em></p>
            {hammerOrEst}
          </a>
        </div>
      </li>
    );
  }
}

PhillipsLot.defaultProps = defaultLotProps;

PhillipsLot.propTypes = {
  displayOrder: PropTypes.number.isRequired,
  saleNumber: PropTypes.string.isRequired,
  saleTypeId: PropTypes.number.isRequired,
  lotNumber: PropTypes.number.isRequired,
  lotStatusId: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  editable: PropTypes.bool,
  onSelect: PropTypes.func,
  imagePath: PropTypes.string,
  detailLink: PropTypes.string,
  lowEstimate: PropTypes.number,
  highEstimate: PropTypes.number,
  currencySign: PropTypes.string,
  description: PropTypes.string,
  maker: PropTypes.string,
  style: PropTypes.object,
  saleTitle: PropTypes.string,
  imageWidth: PropTypes.number,
  showDescription: PropTypes.bool
};

export default PhillipsLot;
