import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'redux-first-router-link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SortContainer from '../../../BuyNow/Sort.container';
import FilterItemContainer from './FilterItem.container';
import { parseFilterQuery } from '../../../utils/filterQueryUtils';

const SortFilter = ({ isMobile }) => {
  const deviceType = isMobile ? 'mobile' : 'tablet';
  const { filter, filterDimensions, sort } = useSelector(({ filterData, urlQueries }) => ({
    filter: urlQueries.filter,
    filterDimensions: filterData.filterDimensions,
    sort: urlQueries.sort
  }));
  const filterObject = parseFilterQuery(filter);
  const [opened, setOpened] = useState(false);
  const [activeDimensions, setActiveDimensions] = useState(Object.keys(filterObject));
  const handleFilterToggle = (e) => {
    const { dimension } = e.target.dataset;
    const newActiveDimensions = [...activeDimensions];
    if (newActiveDimensions.indexOf(dimension) > -1) {
      newActiveDimensions.splice(newActiveDimensions.indexOf(dimension), 1);
    } else {
      newActiveDimensions.push(dimension);
    }
    setActiveDimensions(newActiveDimensions);
  };
  return (
    <section
      className={classNames(`sortfilter row sortfilter--${deviceType}`, {
        'sortfilter--opened': opened
      })}
    >
      <div
        className={`row sortfilter__controls sortfilter__controls--${deviceType}`}
      >
        <h3 className={classNames(`sortfilter__h3 sortfilter__h3--${deviceType}`, { 'sortfilter__h3--hide': deviceType === 'tablet' })}>Sorts</h3>
        <SortContainer
          deviceType={deviceType}
        />
        {filter && filter.length > 0
          ? (
            <Link
              className={`sortfilter__controls__clear-filters sortfilter__controls__clear-filters--${deviceType}`}
              to={{
                type: (sort && sort.length > 0)
                  ? 'ROUTES_SORT'
                  : 'ROUTES_DEFAULT',
                payload: {
                  filter: '',
                  sort: sort
                }
              }}
            >
              Clear All Selected Filters
            </Link>
          )
          : null
        }
        {deviceType === 'mobile' || filterDimensions.length > 1
          ? (
            <h3 className={classNames('sortfilter__h3', `sortfilter__h3--${deviceType}`)}>Filters</h3>
          )
          : null
        }
        {filterDimensions.map(({ dimension, enabled, items, label }, i) => (
          <Fragment key={`filter__fragment--${dimension}`}>
            <button
              className={classNames('sortfilter__filter-list__header__btn', {
                'sortfilter__filter-list__header__btn--enabled': activeDimensions.indexOf(dimension) > -1,
                'sortfilter__filter-list__header__btn--mobile': isMobile,
                'sortfilter__filter-list__header__btn--border-top': i > 0
              })}
              data-dimension={dimension}
              key={`${dimension}-btn`}
              onClick={handleFilterToggle}
              type="button"
            >
              {label}
            </button>
            <ul
              className={`sortfilter__filter-list sortfilter__filter-list--${deviceType}`}
              key={`${dimension}-ul`}
            >
              {items.map(item => (
                <FilterItemContainer
                  {...item}
                  dimension={dimension}
                  payload={{ ...item }}
                  hide={!(activeDimensions.indexOf(dimension) > -1)}
                  key={`${item.label}`}
                />
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

SortFilter.defaultProps = {
  isMobile: false
};

SortFilter.propTypes = {
  isMobile: PropTypes.bool
};

export default SortFilter;
