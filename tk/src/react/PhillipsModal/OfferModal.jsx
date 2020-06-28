import React from 'react';
import PropTypes from 'prop-types';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import { defaultLotProps, lotPropTypes, user } from '../PropTypes/proptypes';
import formatEstimate from '../utils/formatEstimate';
import uriEncoder from '../utils/uriencoder';

const OfferConfirmation = (props) => {
  const followUpMsg = props.saleTypeId === 4
    ? 'A specialist will follow up with you within three days.'
    : 'A specialist will follow up with you.';
  const response = props.offerStatus === 'rejected'
    ? (
      <p>
        {props.firstName}, your offer of&nbsp;
        <strong>
          {props.currencySign}{formatEstimate(props.offer)}
        </strong> is below the minimum threshold.
      </p>
    )
    : (
      <p>
        {props.firstName}, your offer of&nbsp;
        <strong>
          {props.currencySign}{formatEstimate(props.offer)}
        </strong> has been {props.offerStatus}.<br />
        {followUpMsg}
      </p>
    );
  return (
    <div className="offer-confirmation col-xs-12">
      {response}
    </div>
  );
};

const LotInfo = (props) => {
  const handlePriceEstimate = props.saleTypeId === 4 ?
    <span>
      <strong>Asking Price</strong> {props.currencySign}{formatEstimate(props.lowEstimate)}
    </span> :
    <span><strong>Estimate</strong> {props.currencySign}{formatEstimate(props.lowEstimate)}-{formatEstimate(props.highEstimate)}</span>
  return (
    <div className="offer-lot-info col-xs-12">
      <div className="image col-xs-12 col-lg-4">
        <PhillipsImage
          alt={props.description}
          imagePath={props.imagePath}
          transformation="LotDetailMainImage"
          cloudinary={props.cloudinary}
        />
      </div>
      <div className="info col-xs-12 col-lg-8">
        <p className="sale-title"><strong>{props.title}</strong></p>
        <p className="lot-info">
          <span className="lot-number"><strong>{props.lotNumberFull}</strong></span><br />
          <a href={`/artist/${props.makerId}/${uriEncoder(props.makerName)}`}><strong>{props.makerName}</strong></a><br />
          <em>{props.description}</em>{props.circa ? `, ${props.circa}` : null}<br />
          {props.estimateText !== null && props.estimateText.length > 0
            ? (<span><p><strong>{props.estimateText}</strong></p></span>)
            : handlePriceEstimate
          }
        </p>
      </div>
    </div>
  );
}

const OfferModal = props => (
  <div className="row">
    <div className={`offer-status ${props.offerStatus} col-xs-12`}>
      <div className="offer-header col-xs-12">
        <h2>Offer Status</h2>
        <OfferConfirmation
          firstName={props.user.firstName}
          offerStatus={props.offerStatus}
          offer={props.offer}
          currencySign={props.lot.currencySign}
          saleTypeId={props.lot.saleTypeId}
        />
      </div>
    </div>
    <LotInfo
      estimateText={props.lot.estimateText}
      imagePath={props.lot.imagePath}
      cloudinary={props.lot.useCloudinary}
      title={props.lot.saleTitle}
      lowEstimate={props.lot.lowEstimate}
      highEstimate={props.lot.highEstimate}
      description={props.lot.description}
      circa={props.lot.circa}
      makerId={props.lot.makerId}
      makerName={props.lot.makerName}
      currencySign={props.lot.currencySign}
      lotNumberFull={props.lot.lotNumberFull}
      saleTypeId={props.lot.saleTypeId}
    />
  </div>
);

OfferModal.defaultProps = {
  lot: defaultLotProps,
  offer: 0,
  show: false,
  offerStatus: 'rejected',
  user: {
    firstName: '',
    lastName: '',
    email: '',
    id: ''
  }
};

OfferModal.propTypes = {
  lot: PropTypes.shape(lotPropTypes),
  offer: PropTypes.number,
  show: PropTypes.bool,
  offerStatus: PropTypes.string,
  user: PropTypes.shape(user.user)
}

export default OfferModal;
