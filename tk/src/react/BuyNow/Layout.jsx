import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isNull from 'lodash/isNull';
import BuyNowFilterItem from './BuyNowFilterItem.container';
import SortContainer from './Sort.container';
import CuratedViewToggle from '../CuratedView/CuratedToggle';
import Expandable from '../Expandable/Expandable';
import LotGrid from '../PhillipsGrid/LotGrid.container';
import { loggedIn } from '../PhillipsUser/actions';
import bindUserModel from '../PhillipsUser/bindUserModel';
import PhillipsUserForm from '../PhillipsUser/Forms';
import { auctionPropTypes } from '../PropTypes/proptypes';
import SortFilter from '../SortFilter/SortFilter';
import getPhillipsBackboneProperty from '../../utils/getPhillipsBackboneProperty';
import handleMql from '../../utils/handlemql';

const Layout = ({ loginRequired, sale }) => {
  const bbUser = useRef(null);
  const mqlRef = useRef(null);
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const [deviceType, setDeviceType] = useState('tablet');
  const [mobileFilterOpened, toggleMobileFilter] = useState(false);
  useEffect(() => {
    const updateDeviceType = (mql) => {
      if (mql.matches) {
        if (deviceType !== 'tablet') {
          setDeviceType('tablet');
        }
      } else if (deviceType !== 'mobile') {
        setDeviceType('mobile');
      }
    };
    if (typeof matchMedia !== 'undefined') {
      mqlRef.current = handleMql('screen and (min-width: 480px)', updateDeviceType);
    }
    getPhillipsBackboneProperty('user').then((userModel) => {
      bbUser.current = userModel;
      bindUserModel(bbUser.current, dispatch);
      if (bbUser.current.loggedIn && !user.loggedIn) {
        dispatch(loggedIn(bbUser.current.toJSON()));
      }
    });
    return () => {
      mqlRef.current.removeListener(updateDeviceType);
    };
  }, [deviceType]);
  useEffect(() => {
    if (!isNull(bbUser.current) && (user.loggedIn && !bbUser.current.loggedIn)) {
      bbUser.current.trigger('reduxUpdate', user);
    }
  }, [user, bbUser]);
  const auctionTitle = sale.alternativeAuctionTitle === null || sale.alternativeAuctionTitle === ''
    ? sale.auctionTitle
    : sale.alternativeAuctionTitle;
  const style = {
    backgroundImage: `url(https://assets.phillips.com/image/upload/t_Website_DepartmentHero/v${sale.cloudinaryBannerVersion}/auctions/${sale.saleNumber}/${sale.saleNumber}.jpg)`
  };
  return loginRequired && !user.loggedIn
    ? (
      <div className="main-container">
        <PhillipsUserForm user={user} />
      </div>
    )
    : (
      <Fragment>
        <div className="banner">
          <div
            className="image banner__image banner__image--buy-now"
            style={style}
          />
          <div className="content-body container">
            <h1 className="banner__headline">{auctionTitle}</h1>
          </div>
        </div>
        <div className="main-container">
          <div className="container content-area">
            <div className="upcoming-lots row">
              <aside className={`col-xs-12 col-sm-3 sortfilter__container sortfilter__container--${deviceType}`}>
                {sale.enableCuratedAuction
                  ? <CuratedViewToggle />
                  : null
                }
                {deviceType === 'tablet'
                  ? (
                    <SortFilter
                      deviceType={deviceType}
                      FilterItem={BuyNowFilterItem}
                      SortContainer={SortContainer}
                    />
                  )
                  : (
                    <button
                      className={classNames('sortfilter__btn sortfilter__btn--mobile')}
                      type="button"
                      title="Click button to open filter menu"
                      onClick={() => toggleMobileFilter(!mobileFilterOpened)}
                    >
                      Sort &amp; Filters
                    </button>
                  )
                }
                <section className="info-section sale-info--buy-now">
                  <ul className="short-list" id="auction-info">
                    <Expandable
                      className="header info"
                      header="Sale Info"
                      expanded={deviceType === 'tablet'}
                    >
                      <div
                        className="auction-details"
                        dangerouslySetInnerHTML={{
                          __html: sale.auctionDetails
                        }}
                      />
                    </Expandable>
                  </ul>
                </section>
              </aside>
              <section
                className={`col-xs-12 col-sm-9 phillips-grid__container phillips-grid__container--${deviceType} `}
              >
                {mobileFilterOpened
                  ? (
                    <Fragment>
                      <button
                        className={classNames('sortfilter__btn sortfilter__btn--close sortfilter__btn--mobile', {
                          'sortfilter__btn--close--opened': mobileFilterOpened
                        })}
                        onClick={() => toggleMobileFilter(false)}
                        title="Click button to close filter menu"
                        type="button"
                      >
                        &#x2715;
                      </button>
                      <SortFilter
                        deviceType="mobile"
                        FilterItem={BuyNowFilterItem}
                        SortContainer={SortContainer}
                      />
                    </Fragment>
                  )
                  : (
                    <Fragment>
                      <section
                        className={`featured__section featured__section--buy-now featured__section--${deviceType}`}
                        dangerouslySetInnerHTML={{
                          __html: sale.buyNowTitle.concat('', sale.buyNowDesc)
                        }}
                      />
                      <LotGrid />
                    </Fragment>
                  )
                }
              </section>
            </div>
          </div>
        </div>
      </Fragment>
    );
};


Layout.propTypes = {
  loginRequired: PropTypes.bool.isRequired,
  sale: PropTypes.shape(auctionPropTypes).isRequired
};

export default Layout;
