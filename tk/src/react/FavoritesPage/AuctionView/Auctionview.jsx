import React from 'react';
import formatDate from '../../utils/formatdate';
import NavBarCont from './MyFavoritesNavBar';
import PhillipsLot from '../../PhillipsLot/PhillipsLot';

const AuctionView = (props) => {
  const list = props[props.activeView];
  return (
    <section className="panel" id={props.activeView}>
      <NavBarCont />
      {list.map(sale =>
        <SaleView {...sale} key={sale.saleNumber} updateFavoriteLots={props.updateFavoriteLots} />
      )}
    </section>
  )
}

const SaleView = (props) => {
  return (
    <section className="row watched-lots-list" id={props.saleNumber}>
      <a className="col-xs-12 auction-info">
        <h3>{props.saleTitle}</h3>
        <p>
          <span className="location">{props.locationName.toLowerCase()}</span>
          &nbsp;&nbsp;<span className="time">{formatDate(props.startDateTime)}</span>
        </p>
      </a>
      <ul className="col-xs-12">
        {props.lots.map(lot => (
          <li className="col-xs-6 col-sm-3 lot">
            <PhillipsLot
              {...lot}
              imageTransformation="HomePageCarousel"
              showLotNumber={false}
              toggleEstHammer
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default AuctionView;
