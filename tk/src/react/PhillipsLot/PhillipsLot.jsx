/* eslint-disable react/destructuring-assignment */
import React, { Fragment, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import classNames from 'classnames';
import isNull from 'lodash/isNull';
import NoLot from './NoLot';
import FavoriteLot from '../FavoriteLot/FavoriteLot';
import FollowArtist from '../FollowArtist/FollowArtist';
import LotDescription from './LotDescription';
import PhillipsLotImage from './PhillipsLotImage';
import PhillipsLotList from '../LotList/LotList.container';
import Share from '../Share/Share';
import PhillipsTranslations from '../PhillipsTranslations/PhillipsTranslations';
import { defaultLotProps, lotPropTypes } from '../PropTypes/proptypes';

const PhillipsLot = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { auctionMobilityLotRowId, className, fetchedLotRowIds, fetchLotRowIds, fetchLotWidgetData, hammerPlusBP, isNoLot, saleTypeId, widgetEnabled } = props;
  const showBidButton = widgetEnabled
    ? auctionMobilityLotRowId !== '0'
    : false;
  const showBidButtonPlaceholder = widgetEnabled && !showBidButton;
  const handleEvent = (e) => {
    if (e.target.className === 'phillips-lot' && !props.isNoLot) {
      if (e.type === 'keydown' && e.key !== 'Enter') {
        return false;
      }
      e.preventDefault();
      // eslint-disable-next-line no-restricted-globals
      location.assign(props.detailLink);
    }
    return true;
  };
  const handleIsVisibleChange = (visible) => {
    if (visible !== isVisible && !isVisible) {
      setIsVisible(visible);
    }
  };
  if (showBidButton && !isNoLot && isVisible) {
    if (
      fetchLotRowIds.indexOf(auctionMobilityLotRowId) === -1
      && fetchedLotRowIds.indexOf(auctionMobilityLotRowId) === -1
      && auctionMobilityLotRowId !== '0'
    ) {
      fetchLotWidgetData(auctionMobilityLotRowId);
    }
  }
  const lot = {
    lotNumber: props.lotNumber,
    saleNumber: props.saleNumber,
    lotNumberSuffix: props.lotNumberSuffix,
    lotNumberFull: props.lotNumberFull
  };

  return (
    <VisibilitySensor
      delayedCall
      partialVisibility
      intervalDelay={1000}
      onChange={handleIsVisibleChange}
      scrollCheck
      scrollDelay={500}
    >
      {isNoLot
        ? <NoLot handleEvent={handleEvent} {...props} showBidButtonPlaceholder={showBidButtonPlaceholder} />
        : (
          <div
            className={classNames(
              'phillips-lot',
              className,
              {
                'widget-enabled': showBidButton,
                'phillips-lot--buy-now': saleTypeId === 5
              }
            )}
            onKeyDown={handleEvent}
            onClick={handleEvent}
            role="button"
            tabIndex={0}
          >
            <PhillipsLotImage {...props} isVisible={isVisible} />
            <LotDescription {...props} isVisible={isVisible} showBidButton={showBidButton} showBidButtonPlaceholder={showBidButtonPlaceholder} />
            <div className={classNames('user-actions row', { 'lot-sold': (hammerPlusBP > 0) })}>
              {props.editable || props.hideUserActions
                ? null
                : (
                  <Fragment>
                    {props.lotListDisabled
                      ? (
                        <div className="user-actions-container">
                          {isNull(props.makerId) || props.disableFollow
                            ? null
                            : <FollowArtist makerId={props.makerId} makerName={props.makerName} />
                          }
                          {!props.isExhibition
                            ? <FavoriteLot {...lot} />
                            : null
                          }
                        </div>
                      )
                      : (
                        <PhillipsLotList
                          key={`lot-list-${props.key}`}
                          lot={lot}
                        >
                          {eventHandlers => (
                            <div className="user-actions-container">
                              {isNull(props.makerId) || props.disableFollow
                                ? null
                                : (
                                  <FollowArtist
                                    makerId={props.makerId}
                                    makerName={props.makerName}
                                  />
                                )
                              }
                              {!props.isExhibition
                                ? (
                                  <FavoriteLot
                                    {...lot}
                                    onMouseEnter={eventHandlers.onMouseEnter}
                                    onMouseLeave={eventHandlers.onMouseLeave}
                                  />
                                )
                                : null
                              }
                              {props.enableShare
                                ? <Share path={props.detailLink} />
                                : null
                              }
                            </div>
                          )}
                        </PhillipsLotList>
                      )
                    }
                    {props.showBidButtonPlaceholder
                      ? <div className="bid-button-placeholder" />
                      : null
                    }
                  </Fragment>
                )
              }
            </div>
          </div>
        )
      }
    </VisibilitySensor>
  );
};

PhillipsLot.defaultProps = defaultLotProps;

PhillipsLot.propTypes = lotPropTypes;

export default PhillipsTranslations(PhillipsLot);