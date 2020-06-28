import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash/fp";
import { deptPropTypes } from "../PropTypes/proptypes";
import DeptFeatures from "./DeptFeatures";
import DeptSellBanner from "./DeptSellBanner";
import { DeptAuctions } from "./DeptAuctions";
import Videos from "../VideosContainer/VideosContainer";
import DeptPress from "./DeptPress";
import DeptInsta from "./DeptInsta";
import Accordion from "../Accordion/Accordion";
import DeptEmailSignup from "./DeptEmailSignup";

const Department = (props) => {
  const {
    buyNowCarousel,
    BuyNow,
    carousel,
    departmentId,
    departmentName,
    details,
    editable,
    features,
    hero,
    Hero,
    Highlights,
    instagram,
    pastAuctions,
    pressReleases,
    upcomingAuctions,
    videos
  } = props;
  return (
    <div className="departments" id={kebabCase(departmentName)}>
      <Hero componentType="hero" {...hero} />
      <div className="main-container no-margin-top">
        <div className="container" id="page-nav">
          {departmentId === 1 ? (
            <ul className="row page-nav">
              <li>
                <a
                  href={
                    upcomingAuctions && upcomingAuctions.length > 0
                      ? "#upcomingAuctions-nav"
                      : "#pastAuctions-nav"
                  }
                >
                  Auctions
                </a>
              </li>
              <li>
                <a href="#features-nav">Features</a>
              </li>
              {videos !== undefined && videos.length > 0 ? (
                <li>
                  <a href="#videos-nav">Videos</a>
                </li>
              ) : null}
              <li>
                <a href="#dept-info-nav">Department Info</a>
              </li>
            </ul>

          ) 
          :
          // LATIN AMERICAN DEPARTMENT PAGE AUCTION LINK HIDDEN
           departmentId === 6 ? (
             <ul className="row page-nav">
               <li>
                 <a href="#features-nav">Features</a>
               </li>
               {/* <li>
                <a
                  href={
                    upcomingAuctions && upcomingAuctions.length > 0
                      ? "#upcomingAuctions-nav"
                      : "#pastAuctions-nav"
                  }
                >
                  Auctions
                </a>
              </li> */}
               {videos !== undefined && videos.length > 0 ? (
                 <li>
                   <a href="#videos-nav">Videos</a>
                 </li>
              ) : null}
               <li>
                 <a href="#dept-info-nav">Department Info</a>
               </li>
             </ul>
          ) : (
            <ul className="row page-nav">
              <li>
                <a href="#features-nav">Features</a>
              </li>
              <li>
                <a
                  href={
                    upcomingAuctions && upcomingAuctions.length > 0
                      ? "#upcomingAuctions-nav"
                      : "#pastAuctions-nav"
                  }
                >
                  Auctions
                </a>
              </li>
              {videos !== undefined && videos.length > 0 ? (
                <li>
                  <a href="#videos-nav">Videos</a>
                </li>
              ) : null}
              <li>
                <a href="#dept-info-nav">Department Info</a>
              </li>
            </ul>
          )}
        </div>
        {details && departmentId === 24 ? (
          <section className="container" id="dept-info">
            <span id="dept-info-nav" />
            <div className="row">
              <div className="col-xs-12 col-sm-6 details">
                <h2>{`The ${departmentName} Department`}</h2>
                <Accordion className="description">
                  <span
                    dangerouslySetInnerHTML={{ __html: details.description }}
                  />
                </Accordion>
              </div>
            </div>
          </section>
        ) : null}
        {/* Upcoming auctions for TCA */}
        {departmentId === 1 &&
        upcomingAuctions &&
        upcomingAuctions.length > 0 ? (
          <div className="container">
            <DeptAuctions
              auctionType="upcomingAuctions"
              widthClass={
                upcomingAuctions.length === 3 ? "col-md-4" : "col-md-6"
              }
              data={upcomingAuctions}
              title="Upcoming Auctions"
              ctaText="View Auction Calendar"
              ctaUrl={`/calendar/filter/Department=${departmentName}`}
            />
          </div>
        ) : null}
        {/* Highlights */}
        {carousel.position === 1 ? (
          (!editable && carousel.lots.length > 0) || editable ? (
            <div className="container">
              <Highlights {...carousel} componentType="carousel" />
            </div>
          ) : null
        ) : departmentId === 12 ? (
          <BuyNow
            buyNowCarousel={buyNowCarousel[0]}
            componentType="buyNowCarousel"
            position={1}
          />
        ) : null}
        {features && features.length > 0 ? (
          <div className="container" id="features">
            <span id="features-nav" />
            <DeptFeatures
              data={features}
              title="Features"
              ctaText="Features"
              ctaUrl={`/features/${departmentName
                .replace("&", "")
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            />
          </div>
        ) : null}
        {/* BuyNow Carousel */}
        {departmentId === 12 && carousel.position === 1 ? (
          editable ||
          (buyNowCarousel &&
            buyNowCarousel.length > 0 &&
            buyNowCarousel[0].active) ? (
              <BuyNow
                buyNowCarousel={buyNowCarousel[0]}
                componentType="buyNowCarousel"
                position={2}
              />
          ) : null
        ) : null}
        {/* Sell With Us banner */}
        {!editable && departmentId !== 24 ? (
          <DeptSellBanner
            departmentName={departmentName}
            departmentId={departmentId}
          />
        ) : null}
        <div className="container">
          {/* Upcoming auctions */}
          {upcomingAuctions &&
          upcomingAuctions.length > 0 &&
          departmentId !== 1 ? (
            <DeptAuctions
              auctionType="upcomingAuctions"
              widthClass={
                upcomingAuctions.length === 3 ? "col-md-4" : "col-md-6"
              }
              data={upcomingAuctions}
              title="Upcoming Auctions"
              ctaText="View Auction Calendar"
              ctaUrl={`/calendar/filter/Department=${departmentName}`}
            />
          ) : null}
          {/* PAST AUCTION SECTION : HIDDEN ON LATIN AMERICAN PAGE departmentId 6 */}

          {pastAuctions && pastAuctions.length > 0 && departmentId !== 6 ? (
            <DeptAuctions
              auctionType="pastAuctions"
              widthClass="col-md-4"
              data={pastAuctions}
              title="Past Auctions"
              ctaText="More Past Auctions"
              ctaUrl={
                departmentId === 1
                  ? `/auctions/past/filter/Department=Contemporary`
                  : `/auctions/past/filter/Department=${departmentName}`
              }
            />
          ) : null}
        </div>
        {carousel.position === 2 ? (
          (!editable && carousel.lots.length > 0) || editable ? (
            <div className="container">
              <Highlights carousel={carousel} componentType="carousel" />
            </div>
          ) : null
        ) : null}
        <span id="videos-nav" />
        {videos && videos.length > 0 ? (
          <section className="dept-videos">
            <Videos videos={videos} departmentName={departmentName} />
          </section>
        ) : null}
        <div className="container">
          {/* NEWS AND RESULTS SECTION : HIDDEN ON LATIN AMERICAN PAGE departmentId 6 */}
          {pressReleases && pressReleases.length > 0 && departmentId !== 6 ? (
            <DeptPress
              data={pressReleases}
              title="News and Results"
              ctaText="News and Results"
              ctaUrl={`/press/filter/Department=${departmentName}`}
            />
          ) : null}
        </div>
        {instagram && instagram.photos.length > 0 ? (
          <DeptInsta title="Instagram Feed" data={instagram} />
        ) : null}
        {details && departmentId !== 24 ? (
          <section className="container" id="dept-info">
            <span id="dept-info-nav" />
            <div className="row">
              <div className="col-xs-12 col-sm-6 details">
                <h2>{`The ${departmentName} Department`}</h2>
                <Accordion className="description">
                  <span
                    dangerouslySetInnerHTML={{ __html: details.description }}
                  />
                </Accordion>
                <section className="team-location">
                  {departmentId !== 6 ? (
                    <a
                      href={`/team/filter/DepartmentName=${departmentName}`}
                      className="cta-button"
                    >
                      {`Our ${departmentName} Team`}
                    </a>
                  ) : null}
                  <span className="contacts">
                    <strong>Contact Us:</strong>
                    {details.locations.map((contact) => (
                      <a href={`mailto:${contact.email}`}>{contact.name}</a>
                    ))}
                  </span>
                </section>
              </div>
              <DeptEmailSignup
                departmentId={departmentId}
                departmentName={departmentName}
              />
            </div>
          </section>
        ) : null}
        {/* Sell With Us banner - Online Sales Positioning */}
        {!editable && departmentId === 24 ? (
          <DeptSellBanner departmentName={departmentName} />
        ) : null}
      </div>
    </div>
  );
};

Department.defaultProps = {
  departmentName: ""
};

Department.propTypes = {
  ...deptPropTypes,
  departmentName: PropTypes.string
};

export default Department;
