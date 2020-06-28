import React from 'react';
import classNames from 'classnames';
import isNull from 'lodash/isNull';
import LotDetailItem, { LotEssay } from './DetailItem';
import { JewelsDetails, WatchDetails } from './JewelsWatches';
import ArtistBio from './Maker';
import StickyDetails from './StickyDetails';
import { additionalContentLotPropTypes } from '../proptypes';
import ConditionReportContainer from '../../ConditionReport/ConditionReport.container';
import PhillipsTranslations from '../../PhillipsTranslations/PhillipsTranslations';
import setLineBreaks from '../../utils/setLineBreaks';
import { isTimedAuctionLive } from '../../../utils/auctionLiveState';
import PhillipsVideo from '../../PhillipsVideo/PhillipsVideo';

const enableConditionReport = ({
  auctionTimeState,
  endDate,
  isNoLot,
  saleTypeId,
  startDate,
  timeZone
}) => !isNoLot
    ? auctionTimeState === 1
    || auctionTimeState === 2
    || (saleTypeId === 3 && isTimedAuctionLive({ endDate, startDate, timeZone }))
    : false;

const LotPageDetails = (props) => {
  return props.additionalContent.length > 0
    ? (
      <StickyDetails
        {...props}
        enableConditionReport={enableConditionReport(props)}
      />
    )
    : (
      <div className="lot-page__details">
        <ul className="lot-page__details__list">
          {enableConditionReport(props)
            ? (<ConditionReportContainer {...props} key="conditionReport" />)
            : null}
          {!isNull(props.webDescription) && props.webDescription.length > 0
            ? (
              <LotDetailItem
                className="web-description"
                header="Description"
                key="web-description"
                value={props.webDescription}
              />
            )
            : null
          }
          {props.videoSource.length > 0 && !props.videoAboveTheFold
            ? (
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
            )
            : null
          }
          {props.department === 'Jewelry' ? <JewelsDetails {...props} key="jewelsDetails" /> : null}
          {props.department === 'Watches' || props.isWatch ? <WatchDetails {...props} key="watchesDetails" /> : null}
          {props.provenance
            ? (
              <LotDetailItem
                header="Provenance"
                value={props.getTranslatedString('provenance', props.currentLanguage)}
                key="provenance"
              />
            )
            : null
          }
          {props.exhibited
            ? (
              <LotDetailItem
                header="Exhibited"
                value={props.getTranslatedString('exhibited', props.currentLanguage)}
                key="exhibited"
              />
            )
            : null
          }
          {props.literature && props.department !== 'Watches' && !props.isWatch
            ? (
              <LotDetailItem
                header="Literature"
                value={props.getTranslatedString('literature', props.currentLanguage)}
                key="literature"
              />

            )
            : null
          }
          {props.essay || props.cEssay
            ? <LotEssay essay={props.getTranslatedString('essay', props.currentLanguage)} key="essay" />
            : null
          }
          {(!isNull(props.artistBiography) && props.artistBiography.length > 0)
            ? (
              <ArtistBio
                key="makerBio"
                name="makerBio"
                makerNameTranslated={props.getTranslatedString('makerName', props.currentLanguage)}
                makerName={props.makerName}
                makerId={props.makerId}
                artistBiography={props.artistBiography}
                artistBirthYear={props.artistBirthYear}
                artistDeathYear={props.artistDeathYear}
                artistNationality={props.artistNationality}
                department={props.department}
              />
            )
            : null
          }
        </ul>
      </div>
    );
};
LotPageDetails.defaultProps = {
  additionalContent: []
};

LotPageDetails.propTypes = additionalContentLotPropTypes;

export default PhillipsTranslations(LotPageDetails);
