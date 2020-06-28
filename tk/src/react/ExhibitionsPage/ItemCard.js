import React from 'react';
import LazyLoad from 'react-lazyload';
import Share from '../Share/Share';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import { auctionDetailSanitizer } from './functionIndex';

const ItemCard = (props) => {
  const { item } = props;
  const auctionDetailsSmall = auctionDetailSanitizer(item.auctionDetailsSmall);
  return (
    <li className="has-image auction" id={item.auctionPublicID}>
      <div className="image-container col-xs-12 col-sm-5">
        <a href={`/auctions/auction/${item.saleNumber}`}>
          <LazyLoad>
            <PhillipsImage className="thumb" imagePath={item.bannerImage} />
          </LazyLoad>
        </a>
      </div>
      <div className="content-body col-xs-12 col-sm-7">
        <h2><a href={`/auctions/auction/${item.saleNumber}`}>{item.auctionTitle}</a></h2>
        <h3><a href={`/auctions/auction/${item.saleNumber}`}>{auctionDetailsSmall}</a></h3>
        <ul className="short-list">
          <li className="share" key="Share">
            <Share displayHorizontal path={`https://www.phillips.com/auctions/${item.saleType}/${item.saleNumber}`} />
          </li>
        </ul>
      </div>
    </li>
  );
};
export default ItemCard;
