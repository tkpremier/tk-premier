import React, { useState, Fragment } from 'react';
import classNames from 'classnames';
import FeedList from './FeedList.container';
import SortFilter from './SortFilter';

const Layout = ({ isMobile }) => {
  const [mobileSortFilterOpened, toggleMobileSortFilter] = useState(false);
  const deviceType = isMobile ? 'mobile' : 'tablet';
  return (
    <div className="row editorial-hub__feed__row">
      <h1 className="editorial-hub__h1 col-xs-12 editorial-hub__feed__h1">Browse Articles &amp; Videos</h1>
      <aside className={`col-xs-12 col-sm-4 col-md-3 sortfilter__container sortfilter__container--${deviceType}`}>
        {isMobile
          ? (
            <button
              className="sortfilter__btn sortfilter__btn--mobile"
              type="button"
              title="Click button to open filter menu"
              onClick={() => toggleMobileSortFilter(!mobileSortFilterOpened)}
            >
              Sort &amp; Filters
            </button>
          )
          : (
            <SortFilter
              isMobile={isMobile}
            />
          )
        }
      </aside>
      {!isMobile || (isMobile && !mobileSortFilterOpened)
        ? (
          <FeedList
            isMobile={isMobile}
          />
        )
        : (
          <Fragment>
            <button
              className={classNames('sortfilter__btn sortfilter__btn--close sortfilter__btn--mobile',
                { 'sortfilter__btn--close--opened': mobileSortFilterOpened })}
              onClick={() => toggleMobileSortFilter(!mobileSortFilterOpened)}
              title="Click button to close filter menu"
              type="button"
            >
              &#x2715;
            </button>
            <SortFilter
              isMobile={isMobile}
            />
          </Fragment>
        )}
    </div>
  );
};

export default Layout;
