import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BidButton from '../BidButtons/BidButton';
import formatEstimate from '../utils/formatEstimate';
import setLineBreaks from '../utils/setLineBreaks';

const LotEstimate = (props) => {
  let estimate = null;
  if (props.saleTypeId === 5 && props.buyNowPrice > 1) {
    estimate = (
      <p className="phillips-lot__description__estimate phillips-lot__description__estimate--buy-now">
        <strong className="phillips-lot__description__estimate__strong">Price</strong>
        &nbsp;
        {props.currencySign}
        {formatEstimate(props.buyNowPrice)}
        &nbsp;
        {props.estimateSpecialChar}
        <br />
      </p>
    );
  } else if (props.estimateText !== null && props.estimateText.length > 0) {
    // if there is estimateText
    estimate = (
      <p className="phillips-lot__description__estimate">
        <strong>{props.estimateText}</strong>
      </p>
    );
  } else if (props.lowEstimate) {
    // if there is a lowEstimate
    if (props.saleTypeId === 4) {
      if (props.showSaleOffers) {
        estimate = (
          <p className="phillips-lot__description__estimate">
            <strong>Asking Price</strong>
            &nbsp;
            {props.currencySign}
            {formatEstimate(props.lowEstimate)}
            &nbsp;
            {props.estimateSpecialChar}
            <br />
          </p>
        );
      }
    } else {
      estimate = (
        <p className="phillips-lot__description__estimate">
          <strong>Estimate</strong>
          &nbsp;
          {props.currencySign}
          {formatEstimate(props.lowEstimate)}
          &nbsp;-&nbsp;
          {formatEstimate(props.highEstimate)}
          &nbsp;
          {props.estimateSpecialChar}
          <br />
        </p>
      );
    }
  } else if (!props.isExhibition) {
    if (props.saleTypeId === 5) {
      estimate = (
        <p className="phillips-lot__description__estimate--buy-now">
          <strong className="phillips-lot__description__estimate__strong">Inquire Now</strong>
        </p>
      );
    }
    estimate = (<p>Estimate On Request</p>);
  }
  return estimate;
};

const showHammer = (props) => {
  if (props.saleTypeId === 4) {
    return props.showSoldPrice ? (<p className="phillips-lot__sold">SOLD</p>) : null;
  }
  if (props.hammerPlusBP > 0) {
    if (!props.showSoldPrice) {
      return (<p className="phillips-lot__sold">SOLD</p>);
    }
    // fix for WEB-4667 [PERPETUAL] - Change sold price text logic to be based on sale number EX080519
    if (props.saleTypeId === 5 || props.saleNumber === 'EX080519') {
      return (<p className="phillips-lot__sold">SOLD</p>);
    }
    return (
      <p className="phillips-lot__sold">
        Sold for {props.currencySign}
        {formatEstimate(props.hammerPlusBP)}
      </p>
    );
  }

  if (props.isSoldOverride && (!props.hammerPlusBP || props.hammerPlusBP <= 0)) {
    return (<p className="phillips-lot__sold">SOLD</p>);
  }
  return null;
};

const toggleEstimateHammer = (props) => {
  return props.hammerPlusBP > 0
    ? showHammer(props)
    : props.showEstimateText
      ? <LotEstimate {...props} />
      : null;
};

const LotDescription = props => (
  <a
    className={classNames('phillips-lot__description',
      {
        'phillips-lot__description--is-watch': props.isWatch,
        'phillips-lot__description--buy-now': props.saleTypeId === 5,
        'phillips-lot__description--has-hammer': (props.hammerPlusBP > 0 || props.saleTypeId === 4)
      })
    }
    href={props.detailLink}
  >
    <span className={classNames("phillips-lot__description__lot-number-wrapper", { 'phillips-lot__description__lot-number-wrapper--pos-abs': !props.showLotNumber })}>
      {props.showLotNumber
        ? (<p className="phillips-lot__lot-number">{props.lotNumberFull.trim()}</p>)
        : null
      }
      {props.videoSource && props.videoSource.length > 0
        ? (
          <img
            className="phillips-lot__has-video"
            src="https://phillips.vo.llnwd.net/v1/web_prod/images/icons/video-icon.svg"
            alt="Video Link"
            title="Video Link"
          />
        )
        : null
      }
      {props.is360View
        ? (
          <img
            className="phillips-lot__has-360"
            src="https://phillips.vo.llnwd.net/v1/web_prod/images/icons/360icons/360icon.png"
            alt="360 View"
            title="360 View"
          />
        )
        : null
      }
    </span>
    {props.makerId
      ? (
        <p
          className={classNames('phillips-lot__description__artist', {
            'phillips-lot__description__artist--buy-now': props.saleTypeId === 5
          })}
          title={`${props.getTranslatedString('makerName', props.currentLanguage)}`}
        >
          {props.getTranslatedString('makerName', props.currentLanguage)}
        </p>
      )
      : null
    }
    <p
      className="phillips-lot__description__title"
      title={`${props.getTranslatedString('description', props.currentLanguage)}`}
    >
            {props.wReferenceNo && props.wReferenceNo.length > 0 && !props.isMixedAuction
        ? (
          <span
            className={classNames({ 'phillips-lot__description__ref-num--buy-now': props.saleTypeId === 5 })}
          >
            Ref. {props.wReferenceNo}
          </span>
        )
        : null
      }
            {props.wReferenceNo && props.wReferenceNo.length > 0 && !props.isMixedAuction
        ? <br />
        : null
      }
            {props.wModelName && props.wModelName.length > 0 && !props.isMixedAuction
        ? <span>Model: {props.wModelName} </span>
        : null
      }
            {props.wModelName && props.wModelName.length > 0 && !props.isMixedAuction
        ? <br />
        : null
      }
            {props.descriptionWithMarkup && (!props.isMixedAuction || (props.isMixedAuction && !props.isWatch)) 
        ? (
          <span
            dangerouslySetInnerHTML={{
              __html: setLineBreaks(
                props.getTranslatedString('descriptionWithMarkup', props.currentLanguage)
              )
            }}
          />
        )
        : <em>{props.getTranslatedString('description', props.currentLanguage)}</em>
      }
    </p>
    {props.toggleEstHammer
      ? toggleEstimateHammer(props)
      : props.showEstimateText
        ? <LotEstimate {...props} />
        : null
    }
    {props.toggleEstHammer
      ? null
      : showHammer(props)
    }
    {props.showSaleTitle
      ? <p className="phillips-lot__sale-info">{`Lot ${props.lotNumber} \u{2022} ${props.saleTitle}`}</p>
      : null
    }
    {props.isNoLot || !props.showBidButton || props.isSoldOverride
      ? null
      : (
        <BidButton
          auctionMobilityLotRowIds={props.auctionMobilityLotRowIds}
          layout="grid"
          lot={{
            ...props,
            saleTypeId: 3,
            auctionBidPartner: 1
          }}
        />
      )
    }
  </a>
);

LotDescription.defaultProps = {
  auctionMobilityLotRowIds: [],
  isWatch: false,
  isNoLot: false,
  showSaleTitle: false,
  showBidButton: false
};

LotDescription.propTypes = {
  auctionMobilityLotRowIds: PropTypes.arrayOf(PropTypes.string),
  isNoLot: PropTypes.bool,
  isWatch: PropTypes.bool,
  saleTypeId: PropTypes.number.isRequired,
  showBidButton: PropTypes.bool,
  showSaleTitle: PropTypes.bool,
  toggleEstHammer: PropTypes.bool.isRequired
};

export default LotDescription;
