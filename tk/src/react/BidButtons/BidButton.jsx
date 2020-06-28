import React, { Component, createRef, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import isNull from 'lodash/isNull';
import has from 'lodash/has';
import InquireForm from './Inquire/Form';
import { defaultLotProps, defaultUserProps, lotPropTypes, user as userPropTypes } from '../PropTypes/proptypes';
import getPhillipsBackboneProperty from '../../utils/getPhillipsBackboneProperty';
import sendAnalytics from '../../utils/sendAnalytics';

const getDetailWidgetHtml = (auctionMobilityLotRowId, endSale, status) => {
  const className = classNames('lot-information col-xs-12', { 'widget-connect-failure': status === 'widgetConnectFailure' });
  const htmlArray = [
    `<div class="${className}" id="detail-am-target-${auctionMobilityLotRowId}" lot-id="${auctionMobilityLotRowId}">`
  ];
  if (status === 'widgetConnectFailure') {
    htmlArray.push(`<img src="https://phillips.vo.llnwd.net/v1/web_prod/images/layout/reload_white.svg" alt="Unable to connect to server."/><h3>Network Connection</h3><p>We've detected a network problem with your 
connection. Please reload the page to see updated information.</p></div>`);
  } else {
    if (!endSale) {
      htmlArray.push('<div class="row"><am-timer class="col-xs-12"></am-timer></div><div class="row"><am-lot-status-label class="col-xs-6"></am-lot-status-label><am-reserve-label class="col-xs-6"></am-reserve-label></div>');
    }
    htmlArray.push(`<div 
class="row am-bid"><am-bid-status-label></am-bid-status-label><am-bid-count-label></am-bid-count-label></div><div 
class="row"><am-bid-box class="col-xs-12" v-on:action="onBidConfirmation"></am-bid-box></div><img class="hidden" 
src="https://phillips.vo.llnwd.net/v1/web_prod/images/layout/reload_white.svg" /></div>`);
  }
  return htmlArray.join('');
};

const getWidgetHtml = (auctionMobilityLotRowId, endSale) => `<div class="lot-information col-xs-12" id="am-target-${auctionMobilityLotRowId}" lot-id="${auctionMobilityLotRowId}"><div class="row ${endSale ? 'hide' : ''}"><am-lot-status-label class="col-xs-12"></am-lot-status-label></div><div class="row am-bid"><am-bid-status-label class="col-xs-9"></am-bid-status-label><am-bid-count-label class="col-xs-3"></am-bid-count-label><am-reserve-label 
class="col-xs-12"></am-reserve-label></div></div>`;

class BidButton extends Component {
  constructor(props) {
    super(props);
    this.bbEventRef = createRef();
    this.windowRef = createRef();
    this.lotWidgetWrapper = createRef();
    const widgetHtml = props.layout === 'grid' ?
      getWidgetHtml(props.lot.auctionMobilityLotRowId, props.lot.endSale) :
      getDetailWidgetHtml(props.lot.auctionMobilityLotRowId, props.lot.endSale, props.widgetStatus);
    this.state = {
      offerStatus: props.offerStatus,
      offer: props.offer,
      termsAgreed: false,
      showModal: false,
      error: props.error,
      widgetHtml,
      widgetStatus: props.widgetStatus
    };
    this.getHrefUrl = this.getHrefUrl.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.sendAnalytics = this.sendAnalytics.bind(this);
    this.openFormModal = this.openFormModal.bind(this);
  }

  componentDidMount() {
    const { auctionBidPartner, saleTypeId, showSaleOffers } = this.props.lot;
    getPhillipsBackboneProperty('Events').then((bbEvent) => {
      this.bbEventRef.current = bbEvent;
    });
    if (typeof window !== 'undefined') {
      this.windowRef.current = window;
    }
    if (saleTypeId === 3 && auctionBidPartner === 1 && !showSaleOffers) {
      this.setAmWidget();
    }
  }

  componentWillReceiveProps(nextProps) {
    const widgetHtml = this.props.layout === 'grid'
      ? getWidgetHtml(nextProps.lot.auctionMobilityLotRowId, nextProps.lot.endSale)
      : getDetailWidgetHtml(nextProps.lot.auctionMobilityLotRowId, nextProps.lot.endSale, nextProps.widgetStatus);
    if (nextProps.lot.lotNumberFull.trim() !== this.props.lot.lotNumberFull.trim()) {
      this.setState(state => ({
        ...state,
        offerStatus: '',
        offer: 0,
        error: null,
        widgetHtml
      }));
    } else {
      this.setState(state => ({
        ...state,
        offerStatus: nextProps.offerStatus,
        offer: nextProps.offer,
        error: nextProps.error,
        widgetHtml
      }));
    }
  }

  componentDidUpdate({ lot: prevLot, widgetStatus: prevWidgetStatus }) {
    const { layout, widgetStatus, user } = this.props;
    const { auctionBidPartner, auctionMobilityLotRowId, isMobile, saleTypeId, showSaleOffers } = this.props.lot;
    if (showSaleOffers && typeof localforage !== 'undefined' && user.loggedIn) {
      this.windowRef.current.localforage.getItem('offer').then((offer) => {
        if (offer) {
          this.submitOffer({
            ...user,
            ...prevLot,
            ...offer
          });
        }
      });
      return;
    }
    if (saleTypeId === 3 && auctionBidPartner === 1 && !showSaleOffers) {
      if (!has(this.windowRef.current, 'detailLotWidget') && layout === 'detail') {
        // check to see if isMobile or if it's desktop and re-initializing
        if (isMobile || (prevLot.isMobile === isMobile)) { this.setAmWidget(); };
        return;
      }
      if (prevLot.auctionMobilityLotRowId !== auctionMobilityLotRowId) {
        this.setAmWidget();
        return;
      }
      // if widgetConnectFailure => widgetConnectSuccess || vice versa
      // if '' => widgetConnectSuccess || '' => widgetConnectFailure
      if (prevWidgetStatus.length > 0 && prevWidgetStatus !== widgetStatus) {
        this.setAmWidget();
      }
    }
  }

  getHrefUrl() {
    return this.props.lot.saleTypeId === 5
      ? this.props.lot.saleNumber === 'EX080519'
        ? `mailto:${this.props.contactEmail}?subject=${this.props.lot.description} ${this.props.lot.auctionLotPublicId}`
        : `mailto:${this.props.contactEmail}?subject=Private sale inquiry: ${this.props.lot.description} by ${this.props.lot.makerName} (${this.props.lot.auctionLotPublicId}, ${!isNull(this.windowRef.current) ? this.windowRef.current.location.href : 'placeholder'})`
      : this.props.lot.partnerBidUrl;
  }

  setAmWidget() {
    this.lotWidgetWrapper.current.innerHTML = this.state.widgetHtml;
  }

  setBidButtonText() {
    let bidButtonText = this.props.lot.saleTypeId === 3 ? 'Place Bid' : 'Place Advance Bid';
    if (this.props.lot.auctionBidPartner === 2) {
      if (this.props.lot.partnerBidUrl.indexOf('mailto') > -1) {
        bidButtonText = 'Inquire';
      } else {
        bidButtonText = 'Place Bid on Artsy';
      }
    } else if (this.props.lot.saleTypeId === 5) {
      bidButtonText = 'Inquire';
    }
    return bidButtonText;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { lot, user } = this.props;
    const { conditionRequestEmail } = lot;
    const formData = serialize(e.target, { hash: true });

    const offerData = {
      ...formData,
      emailTo: conditionRequestEmail
    };
    if (!user.loggedIn) {
      if (this.windowRef.current.matchMedia('screen and (min-width: 1024px) and (min-height: 775px)').matches) {
        const deferred = new Promise((resolve, reject) => {
          const deferredObj = { resolve, reject };
          this.bbEventRef.current.trigger('openRegister', deferredObj);
        });
        deferred.then((response) => {
          this.submitOffer({
            ...user,
            ...response,
            ...lot,
            ...offerData
          });
        });
      } else if (typeof localforage !== 'undefined') {
        this.windowRef.current.localforage.setItem('offer', offerData).then(() => {
          this.windowRef.current.location.assign('/signup');
        });
      }
    } else {
      const data = { ...user, ...lot, ...offerData };
      this.submitOffer(data);
    }
  }

  submitOffer(offerData) {
    const { lot, offerReject, submitOffer, user } = this.props;
    const offer = parseInt(offerData.offer, 10);
    const threshold = parseInt(lot.saleOfferThreshold, 10);
    this.windowRef.current.localforage.removeItem('offer');
    if (lot.saleTypeId === 4) {
      if (!this.state.termsAgreed) {
        this.setState(state => ({
          ...state,
          error: {
            message: 'You must agree to terms and conditions to submit an offer for this item'
          }
        }));
      }
    }
    if (threshold <= offer) {
      submitOffer({
        offerData,
        payload: {
          offer,
          user,
          lot
        }
      });
    } else {
      offerReject({
        user,
        lot,
        offer,
        offerStatus: 'rejected',
        error: null
      });
    }
  }

  sendAnalytics() {
    const data = {
      eventCategory: 'Bid Button',
      eventAction: this.setBidButtonText(),
      eventLabel: `${this.props.lot.saleNumber} ${this.props.lot.lotNumber}`
    };
    sendAnalytics(data);
  }

  openFormModal() {
    this.props.showModal({ type: 'inquire' });
    const data = {
      eventCategory: 'Bid Button',
      eventAction: this.props.lot.saleNumber === 'EX080519'
        ? 'Inquire - Perpetual Store'
        : 'Inquire - Private Sales',
      eventLabel: this.props.lot.saleNumber === 'EX080519'
        ? `Perpetual - ${this.props.lot.auctionLotPublicId}`
        : `Private Sales - ${this.props.lot.saleNumber} ${this.props.lot.lotNumber}`
    };
    sendAnalytics(data);
  }

  render() {
    const { layout } = this.props;
    const {
      auctionBidPartner,
      auctionLotPublicId,
      description,
      endSale,
      isMobile,
      lotNumber,
      makerName,
      saleNumber,
      saleTypeId,
      showSaleOffers
    } = this.props.lot;
    const {
      error,
      offerStatus,
      termsAgreed
    } = this.state;
    // AM Online Only (Widget) on SalePage
    if (layout === 'grid') {
      return (
        <div
          ref={this.lotWidgetWrapper}
          className="row widget-wrapper"
        />
      );
    }
    // AM Online Only on LotPage
    if (saleTypeId === 3 && auctionBidPartner === 1) {
      return (
        <Fragment>
          <div
            ref={this.lotWidgetWrapper}
            className="row widget-wrapper"
          />
          <p className={classNames('online-only-disclaimer', { 'hide': endSale || layout === 'grid' })}>
            {'Please note that once you\'ve placed your bid,'}
            <br />
            {'it cannot be cancelled.'}
          </p>
        </Fragment>
      );
    }
    // Private Sales or Perpetual
    if (saleTypeId === 5) {
      return !isMobile
        ? (
          <button
            className="place-bid-button"
            onClick={this.openFormModal}
            type="button"
          >
            Inquire
          </button>
        )
        : (
          <InquireForm
            auctionLotPublicId={auctionLotPublicId}
            isMobile={isMobile}
            lotNumber={lotNumber}
            description={description}
            makerName={makerName}
            saleNumber={saleNumber}
          />
        );
    }
    if (showSaleOffers) {
      const offerMsg = saleTypeId === 4
        ? 'This work is available to buy via private sale. You can submit an offer below.'
        : 'This lot is still available to purchase. Enter an offer amount below and a specialist will follow up with you. Standard buyer\'s premium will be added to your offer.';
      return (
        <div className="sale-offer">
          <p className="offer-message">
            {offerMsg}
          </p>
          <form
            onSubmit={this.handleFormSubmit}
            className="clearfix"
          >
            <div className="input-wrapper">
              <label htmlFor="offer">Make an offer</label>
              <input
                type="number"
                name="offer"
                step="1"
                placeholder={`${this.props.lot.currencySign}0`}
                disabled={this.state.offerStatus === 'pending' || this.state.offerStatus === 'received'}
                required={this.state.offerStatus !== 'pending' || this.state.offerStatus !== 'received'}
              />
            </div>
            {error
              ? <p className="error">{error.message}</p>
              : null
            }
            <button
              disabled={offerStatus === 'pending' || offerStatus === 'received'}
              type="submit"
            >
              {offerStatus.length > 0 ? `offer ${offerStatus}` : 'Submit Offer'}
            </button>
            {saleTypeId === 4
              ? (
                <span className="phillips-box">
                  <input
                    type="checkbox"
                    name="offer-terms"
                    id="offer-terms"
                    className="hidden"
                    value={termsAgreed}
                    onChange={() => {
                      this.setState(state =>
                        ({ ...state, termsAgreed: !termsAgreed, error: null })
                      );
                    }}
                  />
                  <label
                    className="check-box"
                    htmlFor="offer-terms"
                  />
                  <label htmlFor="offer-terms">By checking this box and submitting my offer to buy, I agree to the <a href="https://phillips.vo.llnwd.net/v1/web_prod/docs/forms/perpetual_colors.pdf">terms and conditions</a>.</label>
                </span>
              )
              : null
            }
          </form>
        </div>
      );
    }
    return (
      <a
        className="place-bid-button"
        href={this.getHrefUrl()}
        onClick={this.sendAnalytics}
        title={this.setBidButtonText()}
      >
        {this.setBidButtonText()}
      </a>
    );
  }
}

BidButton.defaultProps = {
  contactEmail: '',
  layout: 'detail',
  lot: defaultLotProps,
  offerReject() { console.log('Please add offerReject handler'); },
  offerStatus: '',
  showModal() { console.log('Please add showModal handler.'); },
  submitOffer() { console.log('Please add submitOffer handler.'); },
  widgetStatus: '',
  user: defaultUserProps.user
};
BidButton.propTypes = {
  contactEmail: PropTypes.string,
  layout: PropTypes.string,
  lot: PropTypes.shape(lotPropTypes),
  offerReject: PropTypes.func,
  offerStatus: PropTypes.string,
  showModal: PropTypes.func,
  submitOffer: PropTypes.func,
  widgetStatus: PropTypes.string,
  user: PropTypes.shape(userPropTypes.user)
};


export default BidButton;
