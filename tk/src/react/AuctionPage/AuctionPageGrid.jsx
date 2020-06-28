import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import has from 'lodash/has';
import isUndefined from 'lodash/isUndefined';
import flatten from 'lodash/fp/flatten';
import { LotsContainer } from '../CuratedView/CuratedAuctionContainers';
import AuctionPageSort from './AuctionPageSort.container';
import PhillipsLot from '../PhillipsLot/PhillipsLot';
import FlocklerBanner from '../FlocklerBanner/FlocklerBanner';
import { lotPropTypes } from '../PropTypes/proptypes';

const classCellCount = {
  'single-cell': 1,
  'two-columns-one-row': 2,
  'three-columns': 3,
  'twoRowsTwoColumnsFeatureLeft': 3,
  'twoRowsTwoColumnsFeatureRight': 3,
  'onerow_twocolumns-left': 1.5,
  'onerow_twocolumns-right': 1.5,
  'twoRowsTwoColumnsFeatureCenter': 3
};

const gridItemComponentType = {
  'Container': LotsContainer,
  'Flockler': FlocklerBanner
};

const AuctionPageGrid = (props) => {
  const isTablet = props.deviceTypes.indexOf('tablet') > -1;
  const widgetEnabled = props.saleTypeId === 3 && props.auctionBidPartner === 1 && !props.endSale;
  const showCuratedView = props.listViewType === 'catalogue';
  let gridItemComponents = props.items.map((item) => {
    if (has(item, 'componentType')) {
      const GridItemComponent = gridItemComponentType[item.componentType];
      return (
        <GridItemComponent
          {...item}
          auctionTimeState={props.auctionTimeState}
          fetchedLotRowIds={props.fetchedLotRowIds}
          fetchLotRowIds={props.fetchLotRowIds}
          fetchLotWidgetData={props.fetchLotWidgetData}
          isDesktop={props.isDesktop}
          isWatch={props.isWatch}
          saleTypeId={props.saleTypeId}
          showCuratedView={showCuratedView}
          widgetEnabled={widgetEnabled}
        />
      );
    }
    // showBidButton for AM Widget
    const showBidButton = widgetEnabled
      ? item.auctionMobilityLotRowId !== '0'
      : false;
    const showBidButtonPlaceholder = widgetEnabled && !showBidButton;
    const itemClasses = {
      'col-xs-12': item.isBanner,
      lot: true
    };

    const displayTypeClassName = showCuratedView
      ? item.auctionLotDisplayTypeName
      : 'single-cell';
    return (
      <li
        key={`auction-grid-${item.lotNumberFull}`}
        className={classNames(itemClasses, displayTypeClassName)}
      >
        <PhillipsLot
          {...item}
          fetchedLotRowIds={props.fetchedLotRowIds}
          fetchLotRowIds={props.fetchLotRowIds}
          fetchLotWidgetData={props.fetchLotWidgetData}
          isDesktop={isTablet}
          isLot
          isWatch={props.isWatch}
          saleTypeId={props.saleTypeId}
          showBidButton={showBidButton}
          showCuratedView={showCuratedView}
          showBidButtonPlaceholder={showBidButtonPlaceholder}
          filterEnabled={props.filterEnabled}
          widgetEnabled={widgetEnabled}
        />
      </li>
    );
  });
  if (props.flocklerBanners.length > 0 && props.showBanners) {
    // get index of lot that the banners will be mapped AFTER in grid items array
    const bannerIndices = [];
    // counter for every 6 grid spaces
    let count = 0;
    gridItemComponents.forEach((comp, i) => {
      const countName = has(comp.props, 'containerType')
        ? comp.props.containerType
        : comp.props.className.split('lot ')[1];
      const cellCount = classCellCount[countName];
      count += cellCount;
      if (count % 6 === 0 && count !== 0) {
        if (bannerIndices.length >= props.flocklerBanners.length) {
          return false;
        }
        // add lot index to bannerIndices array
        bannerIndices.push(i);
        // reset count
        count = 0;
      }
      return count;
    });
    // mix flockler banners into lots array
    gridItemComponents = props.flocklerBanners.reduce((comps, banner, index) => {
      // set banner index in lotComponents array
      const bannerIndex = isUndefined(bannerIndices[index]) ?
        (comps.length + 1) : bannerIndices[index] + (index + 1);
      comps.splice(
        bannerIndex, 0,
        <li className="col-xs-12" key={`auction-grid-flockler-${banner.flocklerId}`}><FlocklerBanner {...banner} isBanner /></li>
      );
      return comps;
    }, gridItemComponents);
  }
  return (
    <div className="auction-page-grid">
      <header className="page-header row">
        <AuctionPageSort
          lots={props.lots}
          showCuratedViewToggle={props.enableCuratedAuction}
          saleTypeId={props.saleTypeId}
          saleNumber={props.saleNumber}
        />
      </header>
      <ul
        className={classNames('standard-grid border-top col-xs-12',
          {
            'row': !showCuratedView,
            'has-sold-lots': !(props.auctionTimeState === 2),
            'widget-enabled': widgetEnabled
          }
        )}
      >
        {flatten(gridItemComponents).map(gridItemComponent => gridItemComponent)}
      </ul>
    </div>
  );
};

AuctionPageGrid.defaultProps = {
  auctionBidPartner: 1,
  filterEnabled: false,
  auctionTimeState: 1,
  enableCuratedAuction: false,
  endSale: false,
  flocklerBanners: [],
  items: [],
  isDesktop: false,
  isWatch: false,
  lots: [],
  lotSections: [],
  saleNumber: '',
  saleTypeId: 1,
  showBanners: true
};

AuctionPageGrid.propTypes = {
  auctionBidPartner: PropTypes.number,
  auctionTimeState: PropTypes.number,
  deviceTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  enableCuratedAuction: PropTypes.bool,
  endSale: PropTypes.bool,
  fetchedLotRowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchLotRowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchLotWidgetData: PropTypes.func.isRequired,
  filterEnabled: PropTypes.bool,
  flocklerBanners: PropTypes.arrayOf(
    PropTypes.object
  ),
  isDesktop: PropTypes.bool,
  isWatch: PropTypes.bool,
  items: PropTypes.array,
  listViewType: PropTypes.string.isRequired,
  lots: PropTypes.arrayOf(
    PropTypes.shape(lotPropTypes)
  ),
  lotSections: PropTypes.array,
  saleNumber: PropTypes.string,
  saleTypeId: PropTypes.number,
  showBanners: PropTypes.bool
};

export default AuctionPageGrid;
