import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { LotsContainer } from '../CuratedView/CuratedAuctionContainers';
import FlocklerBanner from '../FlocklerBanner/FlocklerBanner';
import PhillipsLot from '../PhillipsLot/PhillipsLot';


const Lot = (props) => {
  const displayTypeClassName = props.listViewType === 'catalogue'
    ? props.auctionLotDisplayTypeName
    : 'single-cell';
  return (
    <li className={classNames('lot', displayTypeClassName)}>
      <PhillipsLot
        {...props}
        imageTransformation="AuctionLotsView"
        showCuratedView={props.listViewType === 'catalogue'}
        showLotNumber={false}
      />
    </li>
  )
};

const Editorial = props => (
  <li className="col-xs-12"><FlocklerBanner {...props} isBanner /></li>
);


const dict = {
  'Container': LotsContainer,
  'Flockler': Editorial,
  'PhillipsLot': Lot
};

const LotGrid = ({ gridItems, listViewType }) => (
  <ul className="phillips-grid">
    {gridItems.map((item) => {
      const Child = dict[item.componentType];
      return (
        <Child {...item} listViewType={listViewType} />
      );
    })}
  </ul>
);

LotGrid.defaultProps = {
  gridItems: [],
  listViewType: 'grid'
};

LotGrid.propTypes = {
  gridItems: PropTypes.arrayOf(PropTypes.object),
  listViewType: PropTypes.string
};

export default LotGrid;
