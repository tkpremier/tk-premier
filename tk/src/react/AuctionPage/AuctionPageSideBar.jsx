import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import find from 'lodash/find';
import PhillipsTimer from '../PhillipsTimer/PhillipsTimer';
import auctionTimeState from '../utils/auctionTimeState';
import RegistrationLink, { showRegistrationLink } from './RegistrationLink';
import LiveSaleroomLink, { showSaleroomLink } from './LiveSaleroomLink';
import Share from '../Share/Share';
import Expandable from '../Expandable/Expandable';
import AuctionFilter from './AuctionFilter';
import CalendarLink from '../CalendarLink/CalendarLink';
import InfoBox from '../utils/InfoBox';
import Link from '../PhillipsVirtualGallery/Link';
import { NewsletterSignup } from '../NewsletterSignup/Signup';
import { auctionPropTypes, lotPropTypes } from '../PropTypes/proptypes';
import sendAnalytics from '../../utils/sendAnalytics';
import { isTimedAuctionLive } from '../../utils/auctionLiveState';


const buildCatalogueLinks = (props) => {
  const phillipsDownloadUri = '/download/catalog';
  const catalogueLinks = [];
  if (!isNull(props.catalogueDigitalUrl) && props.catalogueDigitalUrl.length > 0) {
    catalogueLinks.push(
      <a
        href={props.catalogueDigitalUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        View e-Catalogue
      </a>
    );
  }
  if (props.showCatalogueDownloadLink) {
    catalogueLinks.push(
      <a
        target="_blank"
        rel="noopener noreferrer"
        id="linkDownloadCatalog"
        href={`${phillipsDownloadUri}/${props.saleNumber}`}
      >
        Download Catalogue
      </a>
    );
  }
  return catalogueLinks;
};

const submitAnalytics = () => {
  sendAnalytics({
    eventCategory: 'Consignment Click',
    eventAction: 'Clicked Consignment Promotion',
    eventLabel: window.location.href
  });
};

const SideBar = (props) => {
  // const [eventObj, showModal] = useState();
  const {
    deviceInfo,
    endDate,
    saleRegistrations,
    startDate,
    timeZone,
    user
  } = props;
  const { deviceTypes, isMobile } = deviceInfo;
  const saleType = props.saleTypeID === 2 ? 'exhibition' : 'auction';
  const showModal = e => props.toggleModal({ show: true, type: e.target.name });
  const isSubscribedNewsletter = Boolean(find(user.messageCategories, mId => mId.messageId === 11));

  return (
    <aside className="col-xs-12 col-md-3 auction-page__sidebar" id="primaryAside">
      {isMobile && showSaleroomLink(props)
        ? (
          <LiveSaleroomLink
            amApiUrl={props.amApiUrl}
            auctionMobilityAuctionRowId={props.auctionMobilityAuctionRowId}
            locationName={props.locationName}
          />
        )
        : null
      }
      {props.lots.length > 0 && props.saleTypeID === 3 && isTimedAuctionLive({ endDate, startDate, timeZone })
        ? (
          <section className="auction-timer">
            <PhillipsTimer
              liveMessage="Auction ends in:"
              endMessage="Auction has ended:"
              endDate={endDate}
              timeZone={timeZone}
            />
          </section>
        )
        : null
      }
      {props.lots.length > 0 && !props.isExhibitionLanding
        ? (
          <AuctionFilter
            auctionTimeState={props.timeState}
            deviceTypes={deviceTypes}
            filterDimensions={props.filterData.filterDimensions}
            saleNumber={props.saleNumber}
            saleType={saleType}
            urlQueries={props.urlQueries}
          />
        )
        : null
      }
      {showRegistrationLink(props)
        ? (
          <RegistrationLink
            amApiUrl={props.amApiUrl}
            saleNumber={props.saleNumber}
            saleRegistrations={saleRegistrations}
            saleTypeId={props.saleTypeID}
            auctionMobilityAuctionRowId={props.auctionMobilityAuctionRowId}
          />
        )
        : null
      }
      <section className="info-section col-xs-12">
        <ul className="short-list" id="auction-info">
          <Expandable
            className="header"
            header={`${saleType} Info`}
            expanded={props.isDesktop}
            isRoot
          >
            <div
              className="auction-details"
              dangerouslySetInnerHTML={{ __html: props.auctionDetails }}
            />
            {(!props.isExhibitionLanding
              && props.saleTypeID === 1
              && props.timeState === auctionTimeState.upcoming
            )
              ? (
                <CalendarLink
                  startDateTime={props.startDate}
                  timeZone={props.timeZone}
                  title={props.auctionTitle}
                  description={props.auctionDetails.replace(/<\/?[^>]+(>|$)/g, '')}
                  location={props.locationName}
                />
              )
              : null
            }
            <ul className="filter-list">
              {props.lots.length > 0 && props.saleTypeID !== 2 ?
                <li>
                  <button
                    className="highlights"
                    name="highlights"
                    onClick={showModal}
                    type="button"
                  >Highlights</button>
                </li> :
                null
              }
              {props.showPrintCatalogueSection || (props.saleTypeID !== 2 && props.saleTypeID !== 3)
                ? (
                  <Expandable className="catalogues" header="Catalogues">
                    <p>
                      {buildCatalogueLinks(props)}
                      {props.showPrintCatalogueSection
                        ? (
                          <a
                            href={`/catalogues/buy/filter/Department=${props.departmentName}/sort/newest`}
                          >
                            Purchase Catalogue
                          </a>
                        )
                        : null
                      }
                      <a href="mailto:catalogues@phillips.com">catalogues@phillips.com</a><br />
                      + 1 212 940 1240 New York<br />
                      + 44 20 7318 4010 London<br />
                      + 852 2318 2000 Hong Kong
                    </p>
                  </Expandable>
                )
                : null
              }
              {!isNull(props.extraInfo) && (!props.isExhibitionLanding && props.saleTypeID !== 2) ?
                <Expandable className="contact" header="Contact">
                  <div dangerouslySetInnerHTML={{ __html: props.extraInfo }} />
                </Expandable> :
                null
              }
              {!props.isExhibitionLanding && props.saleTypeID !== 2 ?
                <li className="share" key="Share">
                  <Share displayHorizontal path={`https://www.phillips.com/auctions/${saleType}/${props.saleNumber}`} />
                </li> :
                null
              }
            </ul>
          </Expandable>
          {props.isExhibitionLanding && props.lots.length > 0 ?
            (<a href={`/auctions/auction/${props.saleNumber}`} className="button">Browse Exhibition</a>) :
            null
          }
        </ul>
        {props.virtualGalleries && props.virtualGalleries.length > 0
          ? props.virtualGalleries.map(gallery => (
            <Link galleryId={gallery} href={`/v-gallery?galleryId=${gallery}`} />
          ))
          : null}
        {props.lots.length === 0 && props.saleTypeID === 1
          ? (
            <InfoBox className="sell-consignment">
              <h3>Sell with us.</h3>
              <p>We are inviting consignment submissions for our upcoming sale.</p>
              <a href="/sell" onClick={submitAnalytics}>Submit Now</a>
            </InfoBox>
          )
          : null
        }
        {props.lots.length > 0 && props.saleTypeID === 1 && !isSubscribedNewsletter
          ? (
            <InfoBox className="sell-consignment newsletter-signup">
              <NewsletterSignup
                pageType="sale page"
                propToSendAnalytics="saleNumber"
                saleNumber={props.saleNumber}
              />
            </InfoBox>
          )
          : null
        }

      </section>
    </aside>
  );
};

SideBar.defaultProps = {
  isDesktop: true,
  lots: [],
  virtualGalleries: []
};

SideBar.propTypes = {
  ...auctionPropTypes,
  isDesktop: PropTypes.bool,
  lots: PropTypes.arrayOf(
    PropTypes.shape(lotPropTypes)
  ),
  virtualGalleries: PropTypes.arrayOf(PropTypes.string)
};

export default SideBar;
