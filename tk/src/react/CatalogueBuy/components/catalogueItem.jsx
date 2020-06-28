import React, { Component } from 'react';
import { connect } from 'react-redux';
import CatalogueImage from './catalogueimage';
import { auctionDetailSanitizer } from '../functions/functionIndex';

class CatalogueItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      item, storeForm, openModal, image
    } = this.props;
    const sanitizedDetailSmall = auctionDetailSanitizer(item.auctionDetailsSmall);
    return (
      <li
        className="has-image catalogue row pending"
        id={item.id}
      >
        <CatalogueImage item={item} />
        <div className="content-body col-xs-12 col-sm-9">
          <h2>{item.auctionTitle}</h2>
          {item.saleTypeID == 1 ? <h3>{sanitizedDetailSmall}</h3> : null}
          {item.catalogueSetText ? <div className="grey-box">{item.catalogueSetText}</div> : null}
          {(item.cataloguePrice > 0 && item.showBuyButton)
            ? (
              <div className="grey-box">
                {`$ ${item.cataloguePrice}`}
                <button style={{ marginLeft: '15px' }} onClick={() => openModal(<iframe src={`${storeForm}+${item.catalogueCode}`} />)} className="button open-modal">Add to Cart</button>
              </div>
            ) : null
        }
          <p>
            <a href={`https://www.phillips.com/auctions/auction/${item.saleNumber}`}>Browse Sale</a>
            { item.enableOnlineSale
              ? (
                <a href={`https://www.phillips.com/auctions/auction/${item.saleNumber}`}>
                  {' '}
                  {
                    saleTypeID == 1 ? 'Browse Sale' : null
                }
                </a>
              ) : null
            }
          </p>
        </div>
      </li>

    );
  }
}

const mapStateToProps = state => (state);
export default connect(mapStateToProps, null)(CatalogueItem);
