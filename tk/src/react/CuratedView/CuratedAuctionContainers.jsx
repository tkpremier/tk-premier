import React from 'react';
import classNames from 'classnames';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import PhillipsLot from '../PhillipsLot/PhillipsLot';
import { lotPropTypes } from '../PropTypes/proptypes';

const containerDictionary = {
  'container_tworows_twocolumns-top_left': { type: 'twoRowsTwoColumnsFeatureRight', maxLots: 3 },
  'container_tworows_twocolumns-btm_left': { type: 'twoRowsTwoColumnsFeatureRight', maxLots: 3 },
  'container_tworows_twocolumns-feature_right': { type: 'twoRowsTwoColumnsFeatureRight', maxLots: 3 },
  'container_tworows_twocolumns-feature_left': { type: 'twoRowsTwoColumnsFeatureLeft', maxLots: 3 },
  'container_tworows_twocolumns-feature_center': { type: 'twoRowsTwoColumnsFeatureCenter', maxLots: 1 },
  'container_tworows_twocolumns-top_right': { type: 'twoRowsTwoColumnsFeatureLeft', maxLots: 3 },
  'container_tworows_twocolumns-btm_right': { type: 'twoRowsTwoColumnsFeatureLeft', maxLots: 3 },
  'container_tworows_threecolumns-feature_left': { type: 'twoRowsThreeColumnsFeatureLeft', maxLots: 5 },
  'container_tworows_threecolumns-feature_middle': { type: 'twoRowsThreeColumnsFeatureMiddle', maxLots: 5 },
  'container_tworows_threecolumns-feature_right': { type: 'twoRowsThreeColumnsFeatureRight', maxLots: 5 },
  'container_tworows_threecolumns-top_left': { type: '', maxLots: 5 },
  'container_tworows_threecolumns-btm_left': { type: '', maxLots: 5 },
  'container_tworows_threecolumns-top_middle': { type: '', maxLots: 5 },
  'container_tworows_threecolumns-btm_middle': { type: '', maxLots: 5 },
  'container_tworows_threecolumns-top_right': { type: '', maxLots: 5 },
  'container_tworows_threecolumns-btm_right': { type: '', maxLots: 5 },
  'container_onerow_twocolumns-left': { type: 'oneRowTwoColumns', maxLots: 2 },
  'container_onerow_twocolumns-right': { type: 'oneRowTwoColumns', maxLots: 2 },
  'container_tworows_twocolumns-feature': { type: 'twoRowsTwoColumnsFeature', maxLots: 1 }
};

export const singlesPartnersArray = [
  ['container_tworows_twocolumns-top_left', 'container_tworows_twocolumns-btm_left'],
  ['container_tworows_twocolumns-top_right', 'container_tworows_twocolumns-btm_right'],
  ['container_tworows_threecolumns-top_left', 'container_tworows_threecolumns-btm_left'],
  ['container_tworows_threecolumns-top_middle', 'container_tworows_threecolumns-btm_middle'],
  ['container_tworows_threecolumns-top_right', 'container_tworows_threecolumns-btm_right']
];

const TwoSinglesContainer = ({ className, fetchLotRowIds, fetchLotWidgetData, fetchedLotRowIds, lots, saleTypeId, widgetEnabled }) => (
  <div className={className}>
    {lots.map(lot => (
      <PhillipsLot
        {...lot}
        className={classNames(lot.auctionLotDisplayTypeName)}
        fetchLotRowIds={fetchLotRowIds}
        fetchLotWidgetData={fetchLotWidgetData}
        fetchedLotRowIds={fetchedLotRowIds}
        isLot
        showCuratedView
        showLotNumber={saleTypeId !== 5}
        widgetEnabled={widgetEnabled}
      />
    ))}
  </div>
);
TwoSinglesContainer.defaultProps = {
  className: '',
  lots: []
};

TwoSinglesContainer.propTypes = {
  className: PropTypes.string,
  fetchedLotRowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchLotRowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchLotWidgetData: PropTypes.func.isRequired,
  lots: PropTypes.arrayOf(
    PropTypes.shape(lotPropTypes)
  )
};
export const LotsContainer = (props) => {
  const { fetchLotRowIds, fetchLotWidgetData, fetchedLotRowIds, lots, widgetEnabled } = props;
  const children = [];
  const featured = find(lots, lot => lot.auctionLotDisplayTypeName.indexOf('feature') > -1);
  const { saleTypeId = 5 } = featured;
  console.log('lots count: ', lots.length, saleTypeId);
  if (lots.length > 1) {
    const firstInSinglesArray = singlesPartnersArray.map(pair => pair[0]);
    const secondInSinglesArray = singlesPartnersArray.map(pair => pair[1]);
    const singles = lots
      .filter(lot => lot.auctionLotDisplayTypeName.indexOf('feature') === -1)
      .reduce((result, lot) => {
        if (firstInSinglesArray.indexOf(lot.auctionLotDisplayTypeName) > -1
          || secondInSinglesArray.indexOf(lot.auctionLotDisplayTypeName) > -1) {
          result.push(lot);
        }
        return result;
      }, []);
    const auctionLotDisplayTypeName = singles.length > 0 ? singles[0].auctionLotDisplayTypeName : '';
    children.push((
      <TwoSinglesContainer
        className={`two_singles_container ${auctionLotDisplayTypeName}`}
        fetchLotRowIds={fetchLotRowIds}
        fetchLotWidgetData={fetchLotWidgetData}
        fetchedLotRowIds={fetchedLotRowIds}
        lots={singles}
        saleTypeId={saleTypeId}
        widgetEnabled={widgetEnabled}
      />
    ));
  }
  const Featured = (
    <PhillipsLot
      {...featured}
      className={featured.auctionLotDisplayTypeName}
      fetchLotRowIds={fetchLotRowIds}
      fetchLotWidgetData={fetchLotWidgetData}
      fetchedLotRowIds={fetchedLotRowIds}
      isLot
      showLotNumber={saleTypeId !== 5}
      showCuratedView
      widgetEnabled={widgetEnabled}
    />
  );
  children.push(Featured);
  return (
    <li className={classNames(`${featured.auctionLotDisplayTypeName}-container`)}>
      {children.map(child => child)}
    </li>
  );
};

LotsContainer.defaultProps = {
  lots: []
};

LotsContainer.propTypes = {
  auctionTimeState: PropTypes.number.isRequired,
  fetchedLotRowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchLotRowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchLotWidgetData: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  lots: PropTypes.arrayOf(
    PropTypes.shape(lotPropTypes)
  ),
  saleTypeId: PropTypes.number.isRequired,
  widgetEnabled: PropTypes.bool.isRequired
};
// aLDTN = auctionLotDisplayTypeName
const setContainerType = aLDTN => containerDictionary[aLDTN].type;

class Container {
  constructor({ auctionLotDisplayTypeName }) {
    this.isLot = false;
    this.componentType = 'Container';
    this.containerType = setContainerType(auctionLotDisplayTypeName);
    this.maxLots = containerDictionary[auctionLotDisplayTypeName].maxLots;
    this.lots = [];
    this.lotNumberFull = [];
  }

  isFilled() {
    return this.lots.length === this.maxLots;
  }

  addLot(lot) {
    if (this.isFilled()) {
      throw new Error('Container is filled');
    } else {
      this.lots.push(lot);
      this.lotNumberFull.push(lot.lotNumberFull);
      if (isEmpty(this.containerType) && !isEmpty(containerDictionary[lot.auctionLotDisplayTypeName].type)) {
        this.containerType = setContainerType(lot.auctionLotDisplayTypeName);
      }
    }
  }
}

export default Container;
