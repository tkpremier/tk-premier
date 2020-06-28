import React, { Component, Fragment } from 'react';
import isNull from 'lodash/isNull';
import LazyLoad from 'react-lazyload';
import { auctionDetailSanitizer } from './functions/functionIndex';
import Share from '../Share/Share';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import Expandable from '../Expandable/Expandable';
import PhillipsAccordion from '../PhillipsAccordion/PhillipsAccordion';


class PastAuctionItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    const { startDate, highlights } = item;
    let transformation = '';
    //replace banner with first highlight if auction date is older than 2014
    if (startDate) {
      var date = new Date(startDate);
      var year = date.getFullYear();
      if (year < 2014 && highlights && highlights.length > 0) {
        item.bannerImage = highlights[0].image;
        item.cloudinaryBannerVersion = highlights[0].version;
        transformation = 'AuctionHighlightsGalleryModal';
      }
    }
    
    const buildCatLinks = () => {
      const phillipsDownloadUri = '/download/catalog';
      const viewCat = (
        <Fragment>
          <a href={item.catalogueDigitalUrl} target="_blank" rel="noopener noreferrer">View e-Catalogue</a>
          <br />
        </Fragment>
      );
      const downloadCat = (
        <Fragment>
          <a href={`${phillipsDownloadUri}/${item.saleNumber}`} target="_blank" rel="noopener noreferrer">Download Catalogue</a>
          <br />
        </Fragment>
      );
      const purchaseCatalogue = (
        <a target="_blank" href={`/catalogues/buy/filter/Department=${item.departmentName}/sort/newest`}>Purchase Catalogue</a>
      );
      const catalogueLinks = [];
      if (!isNull(item.catalogueDigitalUrl) && item.catalogueDigitalUrl.length > 0) {
        catalogueLinks.push(viewCat);
      }
      if (item.showCatalogueDownloadLink) {
        catalogueLinks.push(downloadCat);
      }
      if (item.catalogueCode) {
        catalogueLinks.push(purchaseCatalogue);
      }
      return catalogueLinks;
    };

    return (
      <li className="has-image auction col-xs-12">
        <div className="col-xs-12 col-sm-5 image">
          <a href={`/auctions/auction/${item.saleNumber}`}>
            <LazyLoad>
              <PhillipsImage className="thumb" imagePath={item.bannerImage} version={item.cloudinaryBannerVersion} transformation={transformation}/>
            </LazyLoad>
          </a>
        </div>


        {/* NEW CHANGES BELOW */}

        <div className="content-body col-xs-12 col-sm-7">
          <h2>
            <a href={`/auctions/auction/${item.saleNumber}`}>
              {item.auctionTitle}
            </a>
          </h2>
          {item.auctionDetailsSmall
            ? (
              <h3>
                {auctionDetailSanitizer(item.auctionDetailsSmall)}
              </h3>
            )
            : null}
          <ul className="short-list">
            {item.enableAuctionResults
              ? (
                <PhillipsAccordion title="View Results" key="View Results" className="exhibitions" link={`/auctions/auction/${item.saleNumber}`}>
                  <a href={`/auctions/auction/${item.saleNumber}`}>Online</a>
                  <br />
                  <a href={item.auctionResultsFile}>PDF</a>
                </PhillipsAccordion>
              )
              : null}
            {item.showPrintCatalogueSection || (item.saleTypeID !== 2 && item.saleTypeID !== 3)
              ? (
                <PhillipsAccordion title="Catalogues" key="Catalogues" className="exhibitions" link={`${item.catalogueDigitalUrl}`}>
                  {buildCatLinks()}
                </PhillipsAccordion>
              )
              : null
            }
            {/* {item.enableAuctionResults
              ? (
                <Expandable header="View Results" key="View Results" className="pastauctions" link={`/auctions/auction/${item.saleNumber}`}>
                  <a href={`/auctions/auction/${item.saleNumber}`}>Online</a>
                  <br />
                  <a href={item.auctionResultsFile}>PDF</a>
                </Expandable>
              )
              : null} */}
            {/* {item.showPrintCatalogueSection || (item.saleTypeID !== 2 && item.saleTypeID !== 3)
              ? (
                <Expandable header="Catalogues" key="Catalogues" className="pastauctions" link={`${item.catalogueDigitalUrl}`}>
                  {buildCatLinks()}
                </Expandable>
              )
              : null
            } */}
            <li className="share" key="Share">
              <Share displayHorizontal path={`/auctions/${item.saleType}/${item.saleNumber}`} />
            </li>
          </ul>
        </div>
      </li>
    );
  }
}

export default PastAuctionItem;
