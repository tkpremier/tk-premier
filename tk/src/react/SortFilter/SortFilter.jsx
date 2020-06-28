import React, { PureComponent, createRef, Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import * as Scroll from 'react-scroll';
import classNames from 'classnames';
import startCase from 'lodash/startCase';
import isUndefined from 'lodash/isUndefined';
import DefaultFilterItem from '../PhillipsFilter/FilterItem.container';
import { parseFilterQuery } from '../utils/filterQueryUtils';

const SortFilter = ({
  deviceType,
  FilterItem,
  SortContainer
}) => {
  const { filterData, urlQueries } = useSelector(state => state);
  const { filterDimensions } = filterData;
  const { filter, sort } = urlQueries;
  const filterObject = parseFilterQuery(filter);
  const [activeDimensions, setActive] = useState(Object.keys(filterObject));
  const handleToggle = (e) => {
    const { dimension } = e.target.dataset;
    const newActiveDimensions = [...activeDimensions];
    if (newActiveDimensions.indexOf(dimension) > -1) {
      newActiveDimensions.splice(newActiveDimensions.indexOf(dimension), 1)
    } else {
      newActiveDimensions.push(dimension);
    }
    setActive(newActiveDimensions);
  }
  const mobileRef = useRef(null);
  return (
    <section
      className={`row sortfilter sortfilter--${deviceType}`}
      ref={mobileRef}
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
                  sort
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
        {filterDimensions.map(({ dimension, enabled, label, items }, i) => (
          <Fragment key={`filter-${dimension}`}>
            <button
              className={classNames({
                'sortfilter__filter-list__header__btn': true,
                'sortfilter__filter-list__header__btn--mobile': deviceType === 'mobile',
                'sortfilter__filter-list__header__btn--enabled': activeDimensions.indexOf(dimension) > -1 || enabled,
                'sortfilter__filter-list__header__btn--border-top': i > 0
              })}
              data-dimension={dimension}
              key={`button-${dimension}`}
              onClick={handleToggle}
              type="button"
            >
              {isUndefined(label) ? startCase(dimension) : startCase(label)}
            </button>
            <ul
              className={`sortfilter__filter-list sortfilter__filter-list--${deviceType}`}
            >
              {items.map(item => (
                <FilterItem
                  key={`${dimension}-${item.label}`}
                  payload={item}
                  dimension={dimension}
                  item={item}
                  hide={!(activeDimensions.indexOf(dimension) > -1 || enabled)}
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
  FilterItem: DefaultFilterItem
};

SortFilter.propTypes = {
  deviceType: PropTypes.string.isRequired,
  FilterItem: PropTypes.element,
  SortContainer: PropTypes.element.isRequired
};

export default SortFilter;
