import React, { PureComponent } from 'react';
import { Waypoint } from 'react-waypoint';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import isEqual from 'lodash/isEqual';
// import { isEmpty, has, isEqual, find } from 'lodash/fp';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import LiveSaleroomLink, { showSaleroomLink } from './LiveSaleroomLink';
import PhillipsCarousel from '../PhillipsCarousel/PhillipsCarousel';
import PhillipsLot from '../PhillipsLot/PhillipsLot';
import SaleBanner from '../SaleBanner/SaleBanner';
import AuctionPageHero from './AuctionPageHero';
import SideBar from './AuctionPageSideBar';
import AuctionPageGrid from './AuctionPageGrid';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import PhillipsModal from '../PhillipsModal/PhillipsModal';
import PhillipsSlider from '../PhillipsSlider/PhillipsSlider';
import PhillipsVirtualGallery from '../PhillipsVirtualGallery';
import FlocklerBanner from '../FlocklerBanner/FlocklerBanner';
import getDeviceInfo, { allDeviceTypes } from '../utils/getDeviceInfo';
import getAmWidget from '../utils/getAmWidget';
import auctionTimeState from '../utils/auctionTimeState';
import { auctionPropTypes, lotPropTypes, saleRegistration } from '../PropTypes/proptypes';
import getPhillipsBackboneProperty from '../utils/getPhillipsBackboneProperty';
import { loggedIn } from '../PhillipsUser/actions';
import bindUserModel from '../PhillipsUser/bindUserModel';

class AuctionPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSaleBanner: props.timeState === auctionTimeState.past
    };
    this.getModal = this.getModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.setDeviceType = this.setDeviceType.bind(this);
  }

  componentDidMount() {
    const {
      auctionBidPartner,
      dispatch,
      recommendedLots,
      saleTypeID,
      setDeviceType,
      user
    } = this.props;
    getPhillipsBackboneProperty('user').then((userModel) => {
      bindUserModel(userModel, dispatch);
      if (user.id.length === 0) {
        if (userModel.loggedIn) {
          dispatch(loggedIn(userModel.toJSON()));
        }
      } else if (!isEmpty(this.props.lots) && (!recommendedLots || isEmpty(recommendedLots))) {
        this.props.fetchRecommendedLots(user.id, this.props.saleNumber);
      }
    });
    getPhillipsBackboneProperty('Events').then((event) => {
      event.on('loginSuccess logoutSuccess', () => {
        if (saleTypeID === 3 && auctionBidPartner === 1) {
          location.reload(true);
        }
      });
    });
    // check to see which devices are in play
    const newDeviceInfo = getDeviceInfo(this.setDeviceType);
    const currentDeviceInfo = this.props.deviceInfo;
    if (newDeviceInfo.isMobile && !currentDeviceInfo.isMobile) {
      setDeviceType(newDeviceInfo);
    }
    // widget block copied over from componentDidUpdate
    if (this.props.saleTypeID === 3 && this.props.auctionBidPartner === 1) {
      if (!has(window, 'lotWidget')) {
        if (this.props.fetchLotRowIds.length > 0) {
          $(document).ready(() => {
            getAmWidget()
              .then((widget) => {
                const { AmWidget } = widget;
                window.lotWidget = new AmWidget({
                  auctionId: this.props.auctionMobilityAuctionRowId,
                  url: window.localStorage.getItem('amApiUrl'),
                  wrapperPrefix: 'am-target',
                  layout: 'grid',
                  lots: this.props.fetchLotRowIds
                });
                window.lotWidget.init();
                window.lotWidget.setWidgetHandler('system', ({ websocket_state }) => {
                  console.log('Auction Page websocket state: ', websocket_state);
                });
              })
              .catch((error) => {
                console.log('Error: ', error);
              });
          });
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.id !== this.props.user.id) {
      if (nextProps.user.id.length !== 0) {
        this.props.fetchRecommendedLots(nextProps.user.id, this.props.saleNumber);
      } else {
        this.props.clearRecommendedLots();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.saleTypeID === 3 && this.props.auctionBidPartner === 1) {
      if (!has(window, 'lotWidget')) {
        if (this.props.fetchLotRowIds.length > 0) {
          $(document).ready(() => {
            getAmWidget()
              .then((widget) => {
                const { AmWidget } = widget;
                window.lotWidget = new AmWidget({
                  auctionId: this.props.auctionMobilityAuctionRowId,
                  url: window.localStorage.getItem('amApiUrl'),
                  wrapperPrefix: 'am-target',
                  layout: 'grid',
                  lots: this.props.fetchLotRowIds
                });
                window.lotWidget.init();
                window.lotWidget.setWidgetHandler('system', ({ websocket_state }) => {
                  console.log('Auction Page websocket state: ', websocket_state);
                });
              })
              .catch((error) => {
                console.log('error fetching AmWidget instance: ', error);
              });
          });
        }
        return;
      }
      // window.lotWidget.loadLots(this.props.fetchLotRowIds);
      if (!isEqual(this.props.fetchLotRowIds, prevProps.fetchLotRowIds) && this.props.fetchLotRowIds.length > 0) {
        try {
          window.lotWidget
            .loadLots(this.props.fetchLotRowIds);
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  }

  setDeviceType(e) {
    // MediaQueryListEvent
    const { matches, media } = e;
    const { deviceInfo, setDeviceType } = this.props;
    const {
      deviceTypes: deviceTypesOld,
      isMobile: isMobileOld,
      isTablet: isTabletOld
    } = deviceInfo;
    const deviceTypes = [...deviceTypesOld];
    const matchedType = find(allDeviceTypes, dev => media === dev.query);
    const tabletIndex = deviceTypes.indexOf('tablet');
    const desktopIndex = deviceTypes.indexOf('desktop');
    let isMobile = false;
    let isTablet = true;
    let isDesktop = true;
    if (matchedType) {
      switch (matchedType.type) {
        case 'mobile':
          return false;
        case 'tablet':
          if (matches && tabletIndex === -1) {
            deviceTypes.push('tablet');
            isDesktop = false;
            return setDeviceType({
              deviceTypes,
              isMobile,
              isTablet,
              isDesktop
            });
          }
          if (tabletIndex > -1 && !matches) {
            deviceTypes.splice(tabletIndex, 2);
            isMobile = true;
            isTablet = false;
            isDesktop = false;
            return setDeviceType({
              deviceTypes,
              isMobile,
              isTablet,
              isDesktop
            });
          }
          return false;
        case 'desktop':
          if (matches && desktopIndex === -1) {
            deviceTypes.push('desktop');
            return setDeviceType({
              deviceTypes,
              isMobile: false,
              isTablet: isTabletOld,
              isDesktop: true
            });
          }
          if (!matches && desktopIndex > -1) {
            deviceTypes.splice(desktopIndex, 1);
            return setDeviceType({
              deviceTypes,
              isMobile: isMobileOld,
              isTablet: isTabletOld,
              isDesktop: false
            });
          }
          break;
        default:
          return false;
      }
    }
    return false;
  }

  handleScroll({ currentPosition }) {
    const { showSaleBanner } = this.state;
    return (currentPosition === 'inside' && showSaleBanner)
      || (currentPosition === 'above' && !showSaleBanner)
      ? this.setState({ showSaleBanner: !showSaleBanner })
      : false;
  }

  recommendedLots(recLots) {
    return recLots.length > 0
      ? (
        <div className="recommended-lots">
          <h3>Lots that might interest you ({recLots.length})</h3>
          <p>Based on artists you follow and lots you have liked</p>
          <PhillipsCarousel sizes={{ xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
            {recLots.map(lot => (
              <PhillipsLot
                key={`recommended-lots-${lot.lotNumberFull}`}
                {...lot}
                lotListDisabled
                saleTypeId={this.props.saleTypeID}
                useLazyLoad={false}
              />
            ))}
          </PhillipsCarousel>
        </div>
      ) : null;
  }

  highlightsLanguageToggle = () => {
    const onChange = (e) => {
      switch (e.target.checked) {
        case true: {
          this.props.setLanguage('ch');
          break;
        }
        default: {
          this.props.setLanguage('en');
        }
      }
    };
    return (
      <div
        className="language-select col-xs-12 col-md-3"
      >
        <span>
          <p>Language</p>
        </span>
        <div className="toggle-wrapper">
          <span
            className="toggle-lang"
            data-lang="en"
            onClick={() => this.props.setLanguage('en')}
            role="button"
            tabIndex={0}
          >
            <p>English</p>
          </span>
          <input
            type="checkbox"
            id="lang"
            name="lang"
            className="switch"
            checked={(this.props.language === 'ch')}
            onChange={onChange}
          />
          <label htmlFor="lang" />
          <span
            className="hong-kong toggle-lang"
            data-lang="ch"
            onClick={() => this.props.setLanguage('ch')}
            role="button"
            tabIndex={0}
          >
            <p>中文</p>
          </span>
        </div>
      </div>
    );
  }

  getModal(type) {
    switch (type) {
      case 'highlights':
        return (
          <PhillipsModal
            {...this.props.modal}
            customClasses={['phillips-modal--highlights']}
          >
            <PhillipsSlider
              animation="fade"
              pagination={this.props.highlights.length > 1}
              arrows={this.props.highlights.length > 1}
            >
              {this.props.highlights.map(highlight => (
                <div className="auction-highlight" key={highlight.version}>
                  <PhillipsImage
                    alt={highlight.title.replace(/<\/?[^>]+(>|$)/g, '')}
                    imagePath={highlight.image}
                    cloudinary={this.props.useCloudinary}
                    description={this.props.language === 'en' ? highlight.title : highlight.cTitle}
                    transformation="AuctionHighlightsGalleryModal"
                    version={highlight.version}
                  />
                  <span
                    className="highlights-caption"
                    dangerouslySetInnerHTML={{ __html: this.props.language === 'en' ? highlight.title : highlight.cTitle }}
                  />
                </div>
              ))}
            </PhillipsSlider>
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
      default: return null;
    }
  }

  handleSideBarLanguageProps = () => (
    {
      ...this.props,
      ...(this.props.language === 'ch' ?
        {
          auctionDetails: this.props.cAuctionDetails ? this.props.cAuctionDetails : this.props.auctionDetails,
          auctionTitle: this.props.cAuctionTitle ? this.props.cAuctionTitle : this.props.auctionTitle,
          extraInfo: this.props.cExtraInfo ? this.props.cExtraInfo : this.props.extraInfo
        } : null)
    }
  )

  render() {
    const { showSaleBanner } = this.state;
    const showHero = this.props.timeState !== auctionTimeState.past;
    const isWatch = this.props.saleNumber.indexOf('08', 2) === 2;
    const { isTablet, deviceTypes } = this.props.deviceInfo;
    const siderBarProps = this.handleSideBarLanguageProps();
    const showEditorials = this.props.urlQueries.filter.length === 0;
    return (
      <div className="auction-page">
        {showSaleBanner
          ? (
            <SaleBanner
              saleNumber={this.props.saleNumber}
              auctionTitle={this.props.auctionTitle}
              auctionDetailsSmall={this.props.auctionDetailsSmall}
            />
          )
          : null
        }
        {showHero
          ? (
            <Waypoint
              onPositionChange={this.handleScroll}
            >
              <AuctionPageHero
                title={this.props.language === 'ch' && this.props.cAuctionTitle ? this.props.cAuctionTitle : this.props.auctionTitle}
                auctionDetails={this.props.auctionDetailsSmall}
                image={this.props.bannerImage}
                previousSale={this.props.previousSale}
                nextSale={this.props.nextSale}
              />
            </Waypoint>
          )
          : null
        }
        <div className="main-container">
          <div
            className={classNames('container content-area has-left-aside',
              { 'has-banner': showHero, 'has-sale-banner': !showHero })
            }
          >
            {this.props.locationName === 'Hong Kong' && this.props.saleTypeID === 1 && !this.props.enableOnlineCatalogue ?
              (
                <div className="row">
                  {this.highlightsLanguageToggle()}
                </div>
              ) : null
            }
            <div className="row">
              <SideBar
                {
                ...siderBarProps
                }
              />
              <div className="has-grid col-xs-12 col-md-9">
                {this.props.iosBannerDesktop && this.props.iosBannerMobile
                  ? (
                    <div className="auction-banner">
                      <a
                        href={this.props.isDesktop ?
                          this.props.iosBannerDesktopUrl :
                          this.props.iosBannerMobileUrl}
                      >
                        <picture>
                          <source
                            srcSet={this.props.iosBannerDesktop}
                            media="(min-width: 480px)"
                          />
                          <img
                            alt="auction banner"
                            title="auction banner"
                            src={this.props.iosBannerMobile}
                          />
                        </picture>
                      </a>
                    </div>
                  )
                  : null
                }
                {isTablet && showSaleroomLink(this.props)
                  ? (
                    <LiveSaleroomLink
                      amApiUrl={this.props.amApiUrl}
                      auctionMobilityAuctionRowId={this.props.auctionMobilityAuctionRowId}
                      locationName={this.props.locationName}
                    />
                  )
                  : null
                }
                {this.recommendedLots(this.props.recommendedLots)}
                {!isEmpty(this.props.lots) && !this.props.isExhibitionLanding
                  ? (
                    <AuctionPageGrid
                      auctionBidPartner={this.props.auctionBidPartner}
                      auctionMobilityAuctionRowId={this.props.auctionMobilityAuctionRowId}
                      auctionTimeState={this.props.timeState}
                      endDate={this.props.endDate}
                      endSale={this.props.endSale}
                      eventTimeWithOffset={this.props.eventTimeWithOffset}
                      fetchedLotRowIds={this.props.fetchedLotRowIds}
                      fetchLotRowIds={this.props.fetchLotRowIds}
                      fetchLotWidgetData={this.props.fetchLotWidgetData}
                      filterEnabled={!showEditorials}
                      flocklerBanners={this.props.flocklerBanners}
                      isWatch={isWatch}
                      items={this.props.auctionGridLots}
                      listViewType={this.props.listViewType}
                      lots={this.props.lots}
                      saleNumber={this.props.saleNumber}
                      showBanners={showEditorials}
                      deviceTypes={deviceTypes}
                      saleTypeId={this.props.saleTypeID}
                      startDate={this.props.startDate}
                      timeZone={this.props.timeZone}
                    />
                  )
                  : (
                    <PhillipsSlider
                      animation="fade"
                      pagination={this.props.highlights.length > 1}
                      arrows={this.props.highlights.length > 1}
                    >
                      {this.props.highlights.map(highlight => (
                        <div className="auction-highlight" key={highlight.version}>
                          <PhillipsImage
                            alt={highlight.title.replace(/<\/?[^>]+(>|$)/g, '')}
                            imagePath={highlight.image}
                            cloudinary={this.props.useCloudinary}
                            description={this.props.language === 'en' ? highlight.title : highlight.cTitle}
                            transformation="AuctionHighlightsGalleryModal"
                            version={highlight.version}
                            hideLoader
                          />
                          <span
                            className="highlights-caption"
                            dangerouslySetInnerHTML={{ __html: this.props.language === 'en' ? highlight.title : highlight.cTitle }}
                          />
                        </div>
                      ))}
                    </PhillipsSlider>
                  )
                }
                {!this.props.enableOnlineCatalogue
                  && this.props.flocklerBanners.length > 0
                  ? (this.props.flocklerBanners
                    .filter(banner => banner.language === this.props.language)
                    .map(banner => (
                      <FlocklerBanner
                        key={banner.flocklerId}
                        articleUrl={banner.articleUrl}
                        id={banner.flocklerId}
                        coverUrl={banner.coverUrl}
                        title={banner.title}
                        dateString={banner.dateString}
                        section={banner.section}
                        summary={banner.summary}
                      />
                    )))
                  : null
                }
              </div>
            </div>
          </div>
        </div>
        {this.props.modal.show
          ? this.getModal(this.props.modal.type)
          : null
        }
      </div>
    );
  }
}

AuctionPage.defaultProps = {
  extraInfo: '',
  filterParameters: {},
  filterQuery: '',
  hasSections: false,
  highlights: [],
  lots: [],
  lotSections: [],
  saleRegistrations: [],
  showCuratedView: false,
  sortQuery: '',
  auctionBidPartner: 1,
  auctionMobilityRowId: '0'
};

AuctionPage.propTypes = {
  ...auctionPropTypes,
  highlights: PropTypes.arrayOf(
    PropTypes.object
  ),
  hasSections: PropTypes.bool,
  lotSections: PropTypes.arrayOf(PropTypes.object),
  saleRegistrations: PropTypes.arrayOf(PropTypes.shape(saleRegistration)),
  showCuratedView: PropTypes.bool,
  sortQuery: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  filterQuery: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  lots: PropTypes.arrayOf(
    PropTypes.shape(lotPropTypes)
  ),
  modal: PropTypes.shape({
    show: PropTypes.bool,
    type: PropTypes.string
  }).isRequired
};

export default AuctionPage;
