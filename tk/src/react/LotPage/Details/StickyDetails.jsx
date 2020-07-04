import React, { useEffect, useRef, useState } from 'react';
import * as Scroll from 'react-scroll';
import { StickyContainer, Sticky } from 'react-sticky';
import isNull from 'lodash/isNull';
import camelCase from 'lodash/camelCase';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { titleCase } from 'title-case';
import AdditionalContent from './AdditionalContent';
import LotDetailItem, { LotEssay } from './DetailItem';
import { JewelsDetails, WatchDetails } from './JewelsWatches';
import ArtistBio from './Maker';
import { additionalContentLotPropTypes } from '../proptypes';
import ConditionReportContainer from '../../ConditionReport/ConditionReport.container';
import PhillipsTranslations from '../../PhillipsTranslations/PhillipsTranslations';
import PhillipsVideo from '../../PhillipsVideo/PhillipsVideo';

const { Link, ScrollElement } = Scroll;

const getDetails = props => validators =>
  Object.keys(validators)
    .filter(key => validators[key])
    .map(name => {
      switch (name) {
        case 'conditionReport':
          return <ConditionReportContainer {...props} id="condition-report" key="condition-report" />;
        case 'video':
          return (
            <li className="lot-page__details__list__item">
              <h4 className="lot-page__details__list__item__header">Video</h4>
              <PhillipsVideo
                className={classNames({ 'phillips-video--square-format': props.videoSquareAspectRatio })}
                description={props.videoDescription}
                source={props.videoSource}
                showCaption
                title={props.videoTitle}
              />
            </li>
          );
        case 'webDescription':
          return (
            <LotDetailItem
              className="lot-page__details__list__item lot-page__details__list__item--web-description"
              key="web-description"
              header="Description"
              value={props.webDescription}
            />
          );
        case 'jewelsDetails':
          return <JewelsDetails {...props} />;
        case 'watchesDetails':
          return <WatchDetails {...props} />;
        case 'provenance':
          return (
            <LotDetailItem
              key="provenance"
              header="Provenance"
              value={props.getTranslatedString('provenance', props.currentLanguage)}
            />
          );
        case 'exhibited':
          return (
            <LotDetailItem
              header="Exhibited"
              key="exhibited"
              value={props.getTranslatedString('exhibited', props.currentLanguage)}
            />
          );
        case 'literature':
          return (
            <LotDetailItem
              header="Literature"
              key="literature"
              value={props.getTranslatedString('literature', props.currentLanguage)}
            />
          );
        case 'essay':
          return <LotEssay essay={props.essay} key="essay" />;
        case 'makerBio':
          return (
            <ArtistBio
              makerNameTranslated={props.getTranslatedString('makerName', props.currentLanguage)}
              makerName={props.makerName}
              makerId={props.makerId}
              artistBiography={props.artistBiography}
              artistBirthYear={props.artistBirthYear}
              artistDeathYear={props.artistDeathYear}
              artistNationality={props.artistNationality}
              department={props.department}
            />
          );
        default:
          return null;
      }
    });

const OriginalContent = props => (
  <li
    className="lot-page__details__list__item lot-page__details__list__item--lot-details"
    key="lot-details"
    name={props.name}
  >
    <ul className="lot-page__details__list lot-page__details__list--sticky">{props.children}</ul>
  </li>
);
const StickyDetails = props => {
  const children = [];
  const validators = {
    conditionReport: props.enableConditionReport,
    video: props.videoSource.length > 0 && !props.videoAboveTheFold,
    webDescription: !isNull(props.webDescription) && props.webDescription.length > 0,
    jewelsDetails: props.department === 'Jewelry',
    watchesDetails: props.department === 'Watches',
    provenance: props.provenance,
    exhibited: props.exhibited,
    literature: props.literature && props.department !== 'Watches',
    essay: props.essay,
    makerBio: !isNull(props.artistBiography) && props.artistBiography.length > 0
  };
  const lotDetails = getDetails(props);
  const navLinks = [];
  const stickyNavRef = useRef(null);
  const [heights, setHeight] = useState({
    clearanceHeight: 96,
    navHeight: 26
  });
  useEffect(() => {
    const { clearanceHeight, navHeight } = heights;
    // const height = document.querySelector('#primaryHeader').offsetHeight
    //   + document.querySelector('.sale-title-banner').offsetHeight;
    const height = 0;
    const newNavHeight = isNull(stickyNavRef.current) ? navHeight : stickyNavRef.current.offsetHeight;
    if (height !== clearanceHeight || newNavHeight !== navHeight) {
      setHeight({
        clearanceHeight: height,
        navHeight: newNavHeight
      });
    }
  }, [props.lotNumberFull]);
  const { clearanceHeight, navHeight } = heights;
  const topOffset = navHeight + clearanceHeight;
  if (props.additionalContent.length > 0) {
    props.additionalContent.forEach(content => {
      children.push(
        <AdditionalContent {...content} key={`${content.objectNumber} - ${content.componentContainerId}`} />
      );
      navLinks.push(titleCase(content.title));
    });
  }
  if (lotDetails(validators).length > 0) {
    const ScrollOriginalContent = ScrollElement(OriginalContent);
    children.push(
      <ScrollOriginalContent key={`${props.lotNumberFull} lot-detail`} name="lotDetails-stickyNav">
        {lotDetails(validators)}
      </ScrollOriginalContent>
    );
    navLinks.push('Lot Details');
  }

  return (
    <StickyContainer className="lot-page__details sticky-container sticky-container--details-container">
      <div ref={stickyNavRef}>
        <Sticky topOffset={-clearanceHeight} bottomOffset={clearanceHeight}>
          {stickyProps => {
            const styles = stickyProps.isSticky
              ? {
                  ...stickyProps.style,
                  top: stickyProps.style.top + clearanceHeight,
                  borderBottom: '1px solid #ccc',
                  borderTop: 'none'
                }
              : stickyProps.style;
            return (
              <ul
                className="sticky-container__sticky-wrapper sticky-container__sticky-wrapper--details-nav"
                style={styles}
              >
                {navLinks.map(title => {
                  const to = title.indexOf('Bio') > -1 ? 'makerBio-stickyNav' : `${camelCase(title)}-stickyNav`;
                  return (
                    <li className="sticky-container__sticky-wrapper__sticky-wrapper-item" key={title}>
                      <Link
                        className="sticky-container__sticky-wrapper__sticky-wrapper-item__link"
                        activeClass="sticky-container__sticky-wrapper__sticky-wrapper-item__link--active"
                        duration={300}
                        to={to}
                        offset={-topOffset - 16}
                        smooth
                        spy
                      >
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            );
          }}
        </Sticky>
      </div>
      <ul className="lot-page__details__list lot-page__details__list--has-nav">{children}</ul>
    </StickyContainer>
  );
};
StickyDetails.defaultProps = {
  additionalContent: []
};
StickyDetails.propTypes = {
  ...additionalContentLotPropTypes,
  enableConditionReport: PropTypes.bool.isRequired
};

export default PhillipsTranslations(StickyDetails);
