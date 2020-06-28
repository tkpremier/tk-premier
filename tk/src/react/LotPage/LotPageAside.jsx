import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LotPageBidButton from './LotPageBidButton.container';
import ShippingQuote from './ShippingQuote.container';
import { additionalContentLotPropTypes } from './proptypes';
import uriEncoder from '../../utils/uriencoder';
import formatEstimate from '../utils/formatEstimate';
import FollowArtist from '../FollowArtist/FollowArtist';
import PhillipsTranslations from '../PhillipsTranslations/PhillipsTranslations';
import { lotDescPropTypes } from '../PropTypes/proptypes';
import setLineBreaks from '../utils/setLineBreaks';
import sendAnalytics from '../../utils/sendAnalytics';

const AdditionalLotInfo = props => (
  <p className="lot-detail-header__additional-info">
    {props.circa
      ? (
        <Fragment>
          <span dangerouslySetInnerHTML={{ __html: props.circa }} />
          <br />
        </Fragment>
      )
      : null
    }
    {props.artistInscription
      ? (
        <Fragment>
          <span
            dangerouslySetInnerHTML={{ __html: setLineBreaks(props.artistInscription) }}
          />
          <br />
        </Fragment>
      ) : null}
    {props.medium
      ? (
        <Fragment>
          <span
            dangerouslySetInnerHTML={{
              __html: setLineBreaks(props.medium)
            }}
          />
          <br />
        </Fragment>
      )
      : null
    }
    {props.dimensions
      ? (
        <Fragment>
          <span
            dangerouslySetInnerHTML={{
              __html: setLineBreaks(props.dimensions)
            }}
          />
          <br />
        </Fragment>
      )
      : null
    }
    {props.sigEdtMan
      ? (
        <Fragment>
          <span
            dangerouslySetInnerHTML={{
              __html: setLineBreaks(props.sigEdtMan)
            }}
          />
          <br />
        </Fragment>
      )
      : null
    }
  </p>
);

AdditionalLotInfo.defaultProps = {
  dimensions: ''
}

AdditionalLotInfo.propTypes = {
  ...lotDescPropTypes
};

const ContactInfo = ({ contact }) => (
  <div className="contact">
    <div>
      <strong>Contact Specialist</strong>
      <br />
      <span dangerouslySetInnerHTML={{ __html: contact }} />
    </div>
  </div>
);

ContactInfo.defaultProps = {
  contact: ''
};

ContactInfo.propTypes = {
  contact: PropTypes.string
};


const LotSoldPrice = (props) => {
  // online-only sale 
  if (props.isOnlineSale && props.soldOnline) {
    return (<p className="lot-detail-header__sold">BIDDING NO LONGER AVAILABLE</p>);
  }
  // selling exhibitions or make an offer sale
  if (props.saleTypeId === 4) {
    return props.showSoldPrice ? (<p className="lot-detail-header__sold">SOLD</p>) : null;
  }

  if (props.hammerPlusBP > 0) {
    if (!props.showSoldPrice) {
      return (<p className="lot-detail-header__sold">SOLD</p>);
    }
    // buynow aka perpetual
    if (props.saleTypeId === 5) {
      return (<p className="lot-detail-header__sold">SOLD</p>);
    }
    return (<p className="lot-detail-header__sold">sold for {props.currencySign}{formatEstimate(props.hammerPlusBP)}</p>);
  }

  if (props.isSoldOverride && (!props.hammerPlusBP || props.hammerPlusBP <= 0)) {
    return (<p className="lot-detail-header__sold">SOLD</p>);
  }
  return null;
};

const LotEstimates = (props) => {
  let estimate = null;
  if (props.isNoLot) {
    return estimate;
  }
  if (props.saleTypeId === 5 && props.buyNowPrice > 1) {
    return (
      <p className="lot-detail-header__estimate lot-detail-header__estimate--buy-now">
        <strong className="lot-detail-header__estimate__strong">Price</strong>
        &nbsp;
        {props.currencySign}
        {formatEstimate(props.buyNowPrice)}
        &nbsp;
        {props.estimateSpecialChar}
        <br />
      </p>
    );
  }
  if (props.estimateText !== null && props.estimateText.length > 0) {
    return (
      <p className="lot-detail-header__estimate">
        <strong>{props.estimateText}</strong>
      </p>
    );
  }
  if (props.lowEstimate && !props.isExhibition) {
    let otherEstimatesList = null;
    if (props.otherEstimatesList) {
      otherEstimatesList = props.otherEstimatesList.map((est) => {
        const str = props.saleTypeId === 5
          ? est.split('-')[0]
          : est;
        return (
          <span>
            {str}
            <br />
          </span>
        );
      });
    }
    if (props.saleTypeId === 4) {
      if (props.showSaleOffers) {
        estimate = (
          <p className="lot-detail-header__estimate">
            <strong>Asking Price</strong>
            &nbsp;
            {props.currencySign}{formatEstimate(props.lowEstimate)}
            &nbsp;
            {props.estimateSpecialChar}
            <br />
            {otherEstimatesList}
          </p>
        );
      }
    } else {
      estimate = (
        <p className="lot-detail-header__estimate">
          <strong>Estimate</strong>
          <br />
          {props.currencySign}
          {formatEstimate(props.lowEstimate)} - {formatEstimate(props.highEstimate)}
          &nbsp;
          {props.estimateSpecialChar}
          <br />
          {otherEstimatesList}
        </p>
      );
    }
  } else if (!props.isExhibition) {
    const estimateText = `Estimate on Request ${props.estimateSpecialChar}`;
    estimate = (<p>{estimateText}</p>);
  }
  return estimate;
};
const LotPageMaker = ({ makerName, makerId, englishMakerName }) => (
  <div className="lot-page-maker">
    <a href={`/artist/${makerId}/${uriEncoder(englishMakerName)}`}>
      <h1 className="lot-page-maker__name">{makerName}</h1>
    </a>
    <FollowArtist makerId={makerId} makerName={englishMakerName} />
  </div>
);

LotPageMaker.propTypes = {
  makerName: PropTypes.string,
  englishMakerName: PropTypes.string,
  makerId: PropTypes.number
};

const addAmTimerSpace = ({ endSale, saleTypeId, auctionBidPartner }) => {
  return endSale
    // sale is over so return false
    ? !endSale
    // sale is not over so check if sale meets requirements
    : (saleTypeId === 3 && auctionBidPartner === 1);
}

const showBidButton = (
  {
    endSale,
    hammerPlusBP,
    saleTypeId,
    showSaleOffers,
    showAdvanceBidButton,
    isNoLot,
    isSoldOverride
  }) => {
  if (isNoLot === true) {
    return false;
  }

  if (isSoldOverride) {
    return false;
  }

  if (showSaleOffers) {
    return true;
  }

  if (showAdvanceBidButton) {
    if (!endSale) {
      return true;
    }
  }

  if (saleTypeId === 3 || (saleTypeId === 5 && hammerPlusBP === 0)) {
    return true;
  }

  return false;
};

const submitAnalytics = () => {
  sendAnalytics({
    eventCategory: 'Inquire Click',
    eventAction: 'Clicked Inquire Button',
    eventLabel: window.location.href
  });
};

const LotPageAside = (props) => {
  let bidButton = null;
  if (showBidButton(props)) {
    bidButton = (<LotPageBidButton lot={props} />);
  }
  const inquireButton = props.showInquireButton
    ? (
      <a
        className="place-bid-button"
        href={`mailto:${props.conditionRequestEmail}?subject=Inquiry about lot ${props.lotNumber} in ${encodeURIComponent(props.saleTitle)}`}
        onClick={submitAnalytics}
      >
        Inquire
      </a>
    )
    : null;
  let chineseTitle = null;
  if (props.department !== 'Contemporary' && props.cDescription) {
    chineseTitle = (<p className="title">{props.cDescription}</p>);
  }
  const lotInfoClasses = classNames('lot-information', { 'has-am-timer': addAmTimerSpace(props) });
  return (
    <div className="lot-detail-header">
      <div className={lotInfoClasses}>
        {props.saleTypeId !== 5
          ? (
            <p className="lot-detail-header__lot-number">
              {props.lotSpecialChar.length > 0 ?
                <span className="lot-detail-header__lot-symbol">{props.lotSpecialChar}</span> :
                null
              }
              {props.lotNumberFull.trim()}
            </p>
          )
          : null
        }
        {props.preface
          ? (
            <h3
              className="preface"
              dangerouslySetInnerHTML={{
                __html: props.getTranslatedString('preface', props.currentLanguage)
              }}
            />
          )
          : null
        }
        {props.makerId
          ? (
            <LotPageMaker
              makerName={props.getTranslatedString('makerName', props.currentLanguage)}
              englishMakerName={props.makerName}
              makerId={props.makerId}
            />
          )
          : null
        }
        <p className="lot-detail-header__title">
          {props.wReferenceNo ? <span>Ref. {props.wReferenceNo}<br /></span> : null}
          {props.descriptionWithMarkup
            ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: setLineBreaks(
                    props
                      .getTranslatedString('descriptionWithMarkup', props.currentLanguage)
                  )
                }}
              />
            )
            : <em>{props.getTranslatedString('description', props.currentLanguage)}</em>
          }
        </p>
        {chineseTitle}
        {props.department !== 'Jewelry'
          ? (
            <AdditionalLotInfo
              circa={props.getTranslatedString('circa', props.currentLanguage)}
              artistInscription={
                props.getTranslatedString('artistInscription', props.currentLanguage)
              }
              medium={props.getTranslatedString('medium', props.currentLanguage)}
              dimensions={props.dimensions}
              sigEdtMan={props.getTranslatedString('sigEdtMan', props.currentLanguage)}
            />
          )
          : null
        }
        {props.showEstimateText
          ? <LotEstimates {...props} />
          : null
        }
        <LotSoldPrice {...props} />
        {bidButton}
        {inquireButton}
        {props.showShippingLink
          ? <ShippingQuote />
          : null
        }
        {props.extraInfo && props.saleTypeId !== 5
          ? <ContactInfo contact={props.getTranslatedString('extraInfo', props.currentLanguage)} />
          : null
        }
      </div>
    </div>
  );
};

LotPageAside.propTypes = {
  ...additionalContentLotPropTypes
};

export default PhillipsTranslations(LotPageAside);
