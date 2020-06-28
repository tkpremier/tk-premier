import React, { Component, Fragment } from 'react';
import { findIndex, trim, isUndefined, isNull, find, has, startsWith } from 'lodash/fp';
import { StickyContainer, Sticky } from 'react-sticky';
import classNames from 'classnames';
import { changeLot, changeLotNoMaker } from './actions';
import LotPageAside from './LotPageAside';
import LotPageDetails from './Details';
import LotPageImage from './LotPageImage';
import LotPageMeta from './LotPageMeta';
import LotPageNavigation from './LotPageNavigation';
import ViewInRoom from './ViewInRoom';
import { widgetConnect } from '../BidButtons/actions';
import InquireForm from '../BidButtons/Inquire/Form';
import FavoriteLot from '../FavoriteLot/FavoriteLot';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import PhillipsLotList from '../LotList/LotList.container';
import PhillipsGrid from '../PhillipsGrid/PhillipsGrid';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import PhillipsLot from '../PhillipsLot/PhillipsLot';
import PhillipsModal from '../PhillipsModal/PhillipsModal';
import OfferModalContainer from '../PhillipsModal/OfferModalContainer';
import { loggedIn } from '../PhillipsUser/actions';
import LoginPaywall from '../PhillipsUser/Forms';
import bindUserModel from '../PhillipsUser/bindUserModel';
import Share from '../Share/Share';
import SaleBanner from '../SaleBanner/SaleBanner';
import getPhillipsBackboneProperty from '../../utils/getPhillipsBackboneProperty';
import handleMql from '../../utils/handlemql';
import getAmWidget from '../utils/getAmWidget';
import lotPagePropTypes from './proptypes';

const showLanguageToggle = ({ departmentName, departments, locationName, isChineseTranslate }) => {
  return isChineseTranslate
    || (
      locationName === 'Hong Kong'
      && (
        departmentName === 'Contemporary'
        || departments.filter(dept => dept.departmentID === 1)
      )
    );
};

class LotPage extends Component {

  bbUserModel = null

  state = {
    showViewInRoom: false,
    isMobile: false
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    getPhillipsBackboneProperty('user').then((userModel) => {
      bindUserModel(userModel, dispatch);
      if (userModel.loggedIn && !user.loggedIn) {
        dispatch(loggedIn(userModel.toJSON()));
      }
      this.bbUserModel = userModel;
    });
    getPhillipsBackboneProperty('Events').then((event) => {
      event.on('loginSuccess logoutSuccess', () => {
        if (this.props.auction.saleTypeID === 3 && this.props.auction.auctionBidPartner === 1) {
          location.reload(true);
        }
      });
    });
    if (typeof matchMedia !== 'undefined') {
      handleMql('screen and (min-width: 768px)', this.setIsMobile);
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('keyup', (event) => {
        const currentIndex = findIndex((lot) => {
          return lot.lotNumberFull === this.props.currentLot.lotNumberFull;
        })(this.props.lots);
        const totalCount = this.props.lots.length;
        switch (event.which) {
          case 37: {
            const prevLot = isUndefined(this.props.lots[currentIndex - 1])
              ? this.props.lots[totalCount - 1]
              : this.props.lots[currentIndex - 1];
            const { makerName, saleNumber, lotNumberFull, isNoLot } = prevLot;
            const makerUrl = isNoLot ? 'No Lot' : makerName;

            // /${maker}/${saleNumber}/${lotNumberFull}
            // uriEncoder(maker) transform happens in ./routesMap.js
            // dispatch action to change url
            dispatch(!makerName || makerName.toUpperCase() === 'NOARTIST'
              ? changeLotNoMaker({
                saleNumber,
                lotNumberFull: trim(lotNumberFull)
              })
              : changeLot({
                makerName: makerUrl,
                saleNumber,
                lotNumberFull: trim(lotNumberFull)
              })
            )
            break;
          }
          case 39: {
            const nextLot = isUndefined(this.props.lots[currentIndex + 1])
              ? this.props.lots[0]
              : this.props.lots[currentIndex + 1];
            const { makerName, saleNumber, lotNumberFull, isNoLot } = nextLot;
            const makerUrl = isNoLot ? 'No Lot' : makerName;
            // /${maker}/${saleNumber}/${lotNumberFull}
            // uriEncoder(maker) transform happens in ./routesMap.js
            // dispatch action to change url

            dispatch(!makerName || makerName.toUpperCase() === 'NOARTIST'
              ? changeLotNoMaker({
                saleNumber,
                lotNumberFull: trim(lotNumberFull)
              })
              : changeLot({
                makerName: makerUrl,
                saleNumber,
                lotNumberFull: trim(lotNumberFull)
              })
            );
            break;
          }
          default: {
            // do nothing
          }
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (trim(nextProps.currentLot.lotNumberFull) !== trim(this.props.currentLot.lotNumberFull)) {
      window.scroll(0, 0);
      this.setState(state => ({
        isMobile: state.isMobile,
        showViewInRoom: false
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // check to see if it's Timed Auction with AM
    if (this.props.auction.saleTypeID === 3 && this.props.auction.auctionBidPartner === 1) {
      // check to see if isMobile or if it's desktop and re-initializing
      if (
        (!has('detailLotWidget')(window) && (this.state.isMobile || prevState.isMobile === this.state.isMobile))
        || (prevProps.currentLot.auctionMobilityLotRowId !== this.props.currentLot.auctionMobilityLotRowId)
        || (startsWith('widgetConnect')(this.props.bidButton.status)
          && prevProps.bidButton.status !== this.props.bidButton.status
          && !(prevProps.bidButton.status === '' && this.props.bidButton.status === 'widgetConnectSuccess')
        )
      ) {
        this.setAmWidget();
      }
    }
    return !isNull(this.bbUserModel)
      ? (this.props.user.loggedIn && !this.bbUserModel.loggedIn)
        ? this.bbUserModel.trigger('reduxUpdate', this.props.user)
        : null
      : null;
  }

  setAmWidget() {
    const { dispatch } = this.props;
    if (!has('detailLotWidget')(window)) {
      getAmWidget()
        .then(({ AmWidget }) => {
          window.detailLotWidget = new AmWidget({
            auctionId: this.props.currentLot.auctionMobilityAuctionRowId,
            url: window.localStorage.getItem('amApiUrl'),
            wrapperPrefix: 'detail-am-target',
            layout: 'detail',
            lots: this.props.auctionMobilityLotRowIds
          });
          window.detailLotWidget.init();
          window.detailLotWidget.setWidgetHandler('system', ({ websocket_state }) => {
            switch (websocket_state) {
              case 'errored':
                dispatch(widgetConnect('ERROR'));
                break;
              case 'disconnected':
                dispatch(widgetConnect('FAIL'));
                break;
              case 'connected':
                dispatch(widgetConnect('SUCCESS'));
                break;
              default:
                break;
            }
          });
        })
        .catch((error) => {
          console.log('AM Error: ', error);
        });
    } else {
      window.detailLotWidget.loadLots([this.props.currentLot.auctionMobilityLotRowId]);
    }
  }

  setIsMobile = (mql) => {
    if (mql.matches) {
      if (this.state.isMobile) {
        this.setState(state => ({ ...state, isMobile: false }));
      } else {
        if (this.props.auction.saleTypeID === 3 && this.props.auction.auctionBidPartner === 1) {
          this.setAmWidget();
        }
      }
      return false;
    }
    if (!this.state.isMobile) {
      this.setState(state => ({ ...state, isMobile: true }));
    }
    return this.state.isMobile;
  }

  getModal = (type) => {
    switch (type) {
      case 'cloudinary':
        return (
          <PhillipsModal
            {...this.props.modal}
            customClasses={['phillips-modal--image']}
          >
            <PhillipsImage
              alt={this.props.modal.alt}
              cloudinary
              imagePath={this.props.modal.imagePath}
              transformation="TwoRows"
            />
          </PhillipsModal>
        )
      case 'html':
        return (
          <PhillipsModal
            {...this.props.modal}
            customClasses={['phillips-modal--html']}
          >
            <div dangerouslySetInnerHTML={{ __html: this.props.modal.html }} />
          </PhillipsModal>
        );
      case 'offer':
        return (
          <PhillipsModal
            {...this.props.modal}
            customClasses={['offer-modal']}
          >
            <OfferModalContainer />
          </PhillipsModal>
        );
      case 'iframe':
        return (
          <PhillipsModal
            {...this.props.modal}
            customClasses={['phillips-modal--iframe']}
          >
            <iframe
              allow="fullscreen"
              height={this.props.modal.height}
              name={this.props.modal.name}
              src={this.props.modal.src}
              title={this.props.modal.name}
              width={this.props.modal.width}
            />
          </PhillipsModal>
        );
      case 'inquire':
        return (
          <PhillipsModal
            {...this.props.modal}
            customClasses={['phillips-modal--inquire']}
          >
            <InquireForm {...this.props.currentLot} formOpen />
          </PhillipsModal>
        );

      default: return null;
    }
  }

  render() {
    const { loginRequired, user } = this.props;
    let languageToggle = null;
    let stickyBtmOffset = 125;
    const toggleViewInRoom = (e) => {
      e.preventDefault();
      this.setState(state => ({ ...state, showViewInRoom: !state.showViewInRoom }));
    };

    let auctionMobilityLotRowIds = this.props.lots.map(lot => {
      if (has('auctionMobilityLotRowId')(lot)) {
        return lot.auctionMobilityLotRowId;
      }
    });
    auctionMobilityLotRowIds = auctionMobilityLotRowIds.slice(0, 10);
    if (showLanguageToggle(this.props.auction)) {
      languageToggle = <LanguageToggle />;
      // adding language toggle height to sticky container bottom offset so it doesn't cut off contact info
      stickyBtmOffset = 125 + 66;
    }
    // swipe event handler to navigate through lots
    // const handleSwipe = (e) => {
    //   if (e.direction === 2 || e.direction === 4) {
    //     const int = e.direction === 2 ? 1 : -1;
    //     const currentIndex = findIndex((lot) => {
    //       return lot.lotNumberFull === this.props.currentLot.lotNumberFull;
    //     })(this.props.lots);
    //     const { maker, saleNumber, lotNumberFull, isNoLot } = this.props.lots[currentIndex + int];
    //     const makerUrl = (isNoLot) ? 'No Lot' : maker;
    //
    //     this.props.dispatch(changeLot({
    //       maker: makerUrl,
    //       saleNumber,
    //       lotNumberFull: trim(lotNumberFull)
    //     }));
    //   }
    // };
    const viewInRoomInfo = find(image => image.isViewInRoom === true)(
      this.props.currentLot.lotImages
    );
    return loginRequired && !user.loggedIn
      ? (
        <div className="main-container">
          <LoginPaywall user={user} />
        </div>
      )
      : (
        <div
          className={classNames('lot-page main-container', { viewInRoom: this.state.showViewInRoom })}
        >
          {/* boolean to add client-side metatag updates via react-helmet */}
          {this.props.isServer ? null : (
            <LotPageMeta {...this.props.currentLot} auction={this.props.auction} />
          )}
          {this.props.auction.saleTypeID !== 5
            ? (
              <SaleBanner
                currentLanguage={this.props.currentLanguage}
                {...this.props.auction}
                truncateTitle
              />
            )
            : null
          }
          {this.props.modal.show
            ? this.getModal(this.props.modal.type)
            : null
          }

          {this.state.showViewInRoom ? (
            <ViewInRoom
              image={viewInRoomInfo.imagePath}
              width={this.props.currentLot.width}
              height={this.props.currentLot.height}
              transformation="LotDetailMainImage"
              cloudinary={this.props.auction.useCloudinary}
              description={this.props.currentLot.description}
              onClose={toggleViewInRoom}
            />
          ) : null}
          <div className="container content-area has-sale-banner">
            <div className="col-xs-12">
              <div className="lot-detail-content row">
                <div className="left-column col-xs-12 col-md-7">
                  {this.state.isMobile && this.props.auction.saleTypeID !== 5
                    ? (
                      <div className="page-controls">
                        <LotPageNavigation
                          saleNumber={this.props.auction.saleNumber}
                          lots={this.props.lots}
                          currentLotNumberFull={this.props.currentLot.lotNumberFull}
                          dispatch={this.props.dispatch}
                        />
                        {languageToggle}
                      </div>
                    )
                    : null
                  }
                  {this.props.currentLot.isNoLot
                    ? null
                    : (
                      <LotPageImage
                        {...this.props.currentLot}
                        imagePath={this.props.currentLot.lotImages[0].imagePath}
                        isMobile={this.state.isMobile}
                      />
                    )
                  }
                  {this.props.currentLot.isNoLot === false ? (
                    <PhillipsLotList
                      key={`lot-list-main-${this.props.currentLot.lotNumberFull.trim()}-${this.props.currentLot.saleNumber}`}
                      lot={this.props.currentLot}
                    >
                      {eventHandlers => (
                        <div className="phillips-social">
                          <FavoriteLot
                            {...this.props.currentLot}
                            onPress={eventHandlers.onPress}
                            onMouseEnter={eventHandlers.onMouseEnter}
                            onMouseLeave={eventHandlers.onMouseLeave}
                          />
                          {viewInRoomInfo && !this.state.isMobile ? (
                            <div
                              role="button"
                              tabIndex={0}
                              className="view-in-room-button"
                              onClick={toggleViewInRoom}
                            >
                              <span className="icon" />
                              <span className="tooltip">View in Room</span>
                            </div>
                          ) : null}
                          <Share path={this.props.currentLot.detailLink} />
                        </div>
                      )}
                    </PhillipsLotList>
                  ) : null}
                  {this.state.isMobile ? (
                    <LotPageAside
                      {...this.props.currentLot}
                      auctionBidPartner={this.props.auction.auctionBidPartner}
                      auctionContactEmail={this.props.auction.contactEmail}
                      auctionTimeState={this.props.auction.timeState}
                      conditionRequestEmail={this.props.auction.conditionRequestEmail}
                      currentLanguage={this.props.currentLanguage}
                      endDate={this.props.auction.endDate}
                      endSale={this.props.auction.endSale}
                      isMobile={this.state.isMobile}
                      saleTypeId={this.props.auction.saleTypeID}
                      showAdvanceBidButton={this.props.currentLot.showAdvanceBidButton}
                      startDate={this.props.auction.startDate}
                    />
                  ) : null}

                  <LotPageDetails
                    {...this.props.currentLot}
                    auctionTimeState={this.props.auction.timeState}
                    conditionRequestEmail={this.props.auction.conditionRequestEmail}
                    currentLanguage={this.props.currentLanguage}
                    endDate={this.props.auction.endDate}
                    saleTypeId={this.props.auction.saleTypeID}
                    showAdvanceBidButton={this.props.currentLot.showAdvanceBidButton}
                    startDate={this.props.auction.startDate}
                    timeZone={this.props.auction.timeZone}
                  />
                </div>
                {this.state.isMobile
                  ? null
                  : (
                    <div
                      className={classNames('right-column col-xs-12 col-md-5', {
                        'widget-enabled':
                          this.props.auction.saleTypeID === 3 &&
                          this.props.auction.auctionBidPartner === 1
                      })}
                    >
                      <div className="page-controls">
                        {this.props.auction.saleTypeID !== 5
                          ? (
                            <LotPageNavigation
                              saleNumber={this.props.saleNumber}
                              lots={this.props.lots}
                              currentLotNumberFull={this.props.currentLot.lotNumberFull}
                              dispatch={this.props.dispatch}
                            />
                          )
                          : null
                        }
                        {languageToggle}
                      </div>
                      <StickyContainer className="sticky-container">
                        <Sticky
                          topOffset={-95}
                          bottomOffset={stickyBtmOffset}
                        >
                          {(props) => {
                            let styles = props.style;
                            if (props.isSticky) {
                              styles = { ...styles, top: styles.top + 95 };
                            }
                            return (
                              <div className="sticky-container__sticky-wrapper" style={styles}>
                                <LotPageAside
                                  {...this.props.currentLot}
                                  currentLanguage={this.props.currentLanguage}
                                  auctionTimeState={this.props.auction.timeState}
                                  showAdvanceBidButton={this.props.currentLot.showAdvanceBidButton}
                                  saleTypeId={this.props.auction.saleTypeID}
                                  startDate={this.props.auction.startDate}
                                  endDate={this.props.auction.endDate}
                                  endSale={this.props.auction.endSale}
                                  auctionBidPartner={this.props.auction.auctionBidPartner}
                                  conditionRequestEmail={this.props.auction.conditionRequestEmail}
                                  isMobile={this.state.isMobile}
                                />
                              </div>
                            );
                          }}
                        </Sticky>
                      </StickyContainer>
                    </div>
                  )
                }
              </div>
            </div>
            {this.props.auction.saleTypeID !== 5
              ? (
                <Fragment>
                  <div className="auction-grid-header col-xs-12">
                    <h2 dangerouslySetInnerHTML={{ __html: this.props.auction.auctionTitle }} />
                    <p dangerouslySetInnerHTML={{ __html: this.props.auction.auctionDetailsSmall }} />
                  </div>
                  <div className="auction-grid col-xs-12">
                    <PhillipsGrid columns={{ lg: 3, md: 4, sm: 6, xs: 6 }}>
                      {this.props.lots.map(lotData => (
                        <PhillipsLot
                          key={`grid-${lotData.lotNumberFull.trim()}-${lotData.saleNumber}`}
                          currentLanguage={this.props.currentLanguage}
                          useCloudinary={this.props.auction.useCloudinary}
                          hasRouter
                          lazyLoadOffset={0}
                          {...lotData}
                          auctionMobilityLotRowIds={auctionMobilityLotRowIds}
                          saleTypeId={this.props.auction.saleTypeID}
                        />
                      ))}
                    </PhillipsGrid>
                  </div>
                </Fragment>
              )
              : null
            }
          </div>
        </div>
      );
  }
}

LotPage.defaultProps = {
  auctionMobilityLotRowIds: [],
  currentLanguage: 'en-US',
  modal: {
    payload: {},
    show: false,
    type: ''
  }
};

LotPage.propTypes = lotPagePropTypes;

export default LotPage;
