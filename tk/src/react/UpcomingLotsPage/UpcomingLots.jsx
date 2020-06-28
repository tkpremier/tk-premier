import React, { Fragment, PureComponent } from 'react';
import { isNull } from 'lodash/fp';
import classNames from 'classnames';
import SortContainer from './Sort.container';
import SortFilter from '../SortFilter/SortFilter';
import PhillipsImage from '../PhillipsImage/PhillipsImage';
import PhillipsLot from '../PhillipsLot/PhillipsLot';
import handleMql from '../utils/handleMql';


class UpcomingLots extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deviceType: 'tablet',
      mobileFilterOpened: false
    };
    this.setDeviceType = this.setDeviceType.bind(this);
  }

  componentDidMount() {
    if (typeof matchMedia !== 'undefined') {
      handleMql('screen and (min-width: 480px)', this.setDeviceType);
    }
  }

  setDeviceType(mql) {
    const { deviceType } = this.state;
    if (mql.matches) {
      if (deviceType === 'mobile') {
        this.setState(state => ({ ...state, deviceType: 'tablet', mobileFilterOpened: false }));
      }
    } else if (deviceType === 'tablet') {
      this.setState(state => ({ ...state, deviceType: 'mobile' }));
    }
  }

  render() {
    const {
      auctions,
      filterData,
      gridLots,
      hasFeaturedSale,
      tags,
      upcomingLotsDesc,
      upcomingLotsTitle,
      urlQueries
    } = this.props;
    const { deviceType, mobileFilterOpened } = this.state;
    const featuredAuctionString = urlQueries.saleNumbers.length > 1
      ? 'Featured Auctions'
      : 'Featured Auction';
    return (
      <div className="container content-area">
        <div className="upcoming-lots row">
          {hasFeaturedSale
            ? (
              <section className="col-xs-12 featured__section">
                {!isNull(upcomingLotsTitle) && upcomingLotsTitle.length > 0
                  ? (
                    <Fragment>
                      <h1>{upcomingLotsTitle}</h1>
                      <p className="col-xs-12 col-sm-6">{upcomingLotsDesc}</p>
                    </Fragment>
                  )
                  : null
                }
                <h2 className="col-xs-12 featured__section__auctions__h2">
                  {featuredAuctionString}
                </h2>
                <ul className="row featured__section__auctions">
                  {auctions.map(({ bannerImagePath, auctionTitle, auctionDetailsSmall }) => (
                    <li className="col-xs-12 col-sm-6 featured__section__auctions__auction">
                      <PhillipsImage
                        className="featured__section__auctions__auction__img"
                        cloudinary
                        imagePath={bannerImagePath}
                        transformation="AuctionThumb"
                        useTransformation
                        version={2}
                      />
                      <div className="featured__section__auctions__auction__info">
                        <h2 className="col-xs-12 featured__section__auctions__h2 featured__section__auctions__auction__info__h2">{auctionTitle}</h2>
                        <p className="featured__section__auctions__auction__info__p">{auctionDetailsSmall}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )
            : null
          }
          <aside
            className={`col-xs-12 col-sm-3 sortfilter__container sortfilter__container--${deviceType}`}
          >
            {deviceType === 'tablet'
              ? (
                <SortFilter
                  deviceType={deviceType}
                  filterDimensions={filterData.filterDimensions}
                  tags={tags}
                  SortContainer={SortContainer}
                  urlQueries={urlQueries}
                />
              )
              : (
                <button
                  className="sortfilter__btn sortfilter__btn--mobile"
                  type="button"
                  title="Click button to open filter menu"
                  onClick={() => { this.setState(state => ({ ...state, mobileFilterOpened: !mobileFilterOpened })) }}
                >
                  Sort & Filters
                </button>
              )
            }
          </aside>
          <section className={`col-xs-12 col-sm-9 phillips-grid__container phillips-grid__container--${deviceType} `}>
            {this.state.mobileFilterOpened
              ? (
                <Fragment>
                  <button
                    className={classNames("sortfilter__btn sortfilter__btn--close sortfilter__btn--mobile", { 'sortfilter__btn--close--opened': mobileFilterOpened })}
                    onClick={() => { this.setState(state => ({ ...state, mobileFilterOpened: !mobileFilterOpened })) }}
                    title="Click button to close filter menu"
                    type="button"
                  >
                    &#x2715;
                  </button>
                  <SortFilter
                    deviceType={deviceType}
                    filterDimensions={filterData.filterDimensions}
                    tags={tags}
                    SortContainer={SortContainer}
                    urlQueries={urlQueries}
                  />
                  <p>SortFilter</p>
                </Fragment>
              )
              : (
                <ul className="phillips-grid">
                  {gridLots.map(lot => (
                    <li className="col-xs-6 col-sm-4">
                      <PhillipsLot
                        {...lot}
                        imageTransformation="AuctionLotsView"
                        showLotNumber={false}
                        showSaleTitle
                      />
                    </li>
                  ))}
                </ul>
              )
            }
          </section>
        </div>
      </div>
    );
  }
}

export default UpcomingLots;
