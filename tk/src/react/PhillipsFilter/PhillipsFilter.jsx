import React, { Fragment, useState } from 'react';
import Link from 'redux-first-router-link';
import classNames from 'classnames';
import isUndefined from 'lodash/fp/isUndefined';
import startCase from 'lodash/fp/startCase';
import FilterItem from './FilterItem.container';
import filterDataPropTypes, { defaultFilterData } from './proptypes';
import { parseFilterQuery } from '../utils/filterQueryUtils';

const PhillipsFilter = ({ deviceTypes, filterDimensions, urlQueries }) => {
  const [ activeDimensions, setActiveDimensions ] = useState(Object.keys(parseFilterQuery(urlQueries.filter)));
  const isMobile = deviceTypes.length === 1 && deviceTypes[0] === 'mobile';
  const deviceType = isMobile ? 'mobile' : 'tablet';
  return (
    <Fragment>
      {urlQueries.filter && urlQueries.filter.length > 0
        ? (
          <Link
            className={`sortfilter__controls__clear-filters sortfilter__controls__clear-filters--${deviceType}`}
            to={{
              type: (urlQueries.sort && urlQueries.sort.length > 0)
                ? 'ROUTES_SORT'
                : 'ROUTES_DEFAULT',
              payload: {
                filter: '',
                sort: urlQueries.sort
              }
            }}
          >
            {'Clear All Selected Filters'}
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
        <Fragment>
          <button
            className={classNames({
              'sortfilter__filter-list__header__btn': true,
              'sortfilter__filter-list__header__btn--mobile': deviceType === 'mobile',
              // 'sortfilter__filter-list__header__btn--enabled': activeDimensions.indexOf(dimension) > -1 || enabled,
              'sortfilter__filter-list__header__btn--border-top': i > 0
            })}
            data-dimension={dimension}
            onClick={() => {
              let newActiveDimensions = [...activeDimensions];
              newActiveDimensions = activeDimensions.indexOf(dimension) > -1
                ? newActiveDimensions.splice(activeDimensions.indexOf(dimension), 1)
                : newActiveDimensions.push(dimension);
              setActiveDimensions(newActiveDimensions);
            }}
            type="button"
          >
            {isUndefined(label) ? startCase(dimension) : startCase(label)}
          </button>
          <ul
            className={`sortfilter__filter-list sortfilter__filter-list--${deviceType}`}
          >
            {items.map(item => (
              <FilterItem
                dimension={dimension}
                payload={item}
                hide={!(activeDimensions.indexOf(dimension) > -1 || enabled)}
              />
            ))}
          </ul>
        </Fragment>
      ))}
    </Fragment>
  );
};

PhillipsFilter.defaultProps = defaultFilterData;

PhillipsFilter.propTypes = filterDataPropTypes;

export default PhillipsFilter;
