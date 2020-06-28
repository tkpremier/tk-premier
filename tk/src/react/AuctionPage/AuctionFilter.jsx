import React, { Fragment, useState } from 'react';
import Link from 'redux-first-router-link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/fp/kebabCase';
import find from 'lodash/fp/find';
// import AuctionFilterDimension from './AuctionFilterDimension';
import AuctionFilterItem from './AuctionFilterItem.container';
import SaleOffersFilter from './SaleOffersFilter.container';
import { parseFilterQuery } from '../utils/filterQueryUtils';

const AuctionFilter = ({ deviceTypes, filterDimensions, saleType, saleNumber, urlQueries }) => {
  const isMobile = deviceTypes.indexOf('mobile') > -1 && deviceTypes.length === 1;
  const deviceType = deviceTypes.indexOf('mobile') > -1 && deviceTypes.length === 1
    ? 'mobile'
    : 'tablet';
  const postSale = find(({ dimension }) => dimension === 'showSaleOffers')(filterDimensions);
  const dimensions = postSale ? filterDimensions.filter(({ dimension }) => dimension !== 'showSaleOffers') : filterDimensions;
  const { filter, sort } = urlQueries;
  const [activeDimensions, setActiveDimensions] = useState(Object.keys(parseFilterQuery(filter)));
  return (
    <Fragment>
      {postSale
        ? (
          <SaleOffersFilter
            dimension={postSale.dimension}
            payload={{
              ...postSale.items[0],
              saleNumber,
              saleType
            }}
            count={postSale.count}
          />
        )
        : null
      }
      <header className="sortfilter__header--auction-page">
        <h3 className="sortfilter__h3--auction-page">Filters</h3>
        {filter && filter.length > 0
          ? (
            <Link
              className={`sortfilter__controls__clear-filters sortfilter__controls__clear-filters--auction-page sortfilter__controls__clear-filters--${deviceType}`}
              to={{
                type: (sort && sort.length > 0)
                  ? 'ROUTES_SORT'
                  : 'ROUTES_DEFAULT',
                payload: {
                  filter: '',
                  sort: sort,
                  saleNumber,
                  saleType
                }
              }}
            >
              {'(clear all)'}
            </Link>
          )
          : null
        }
      </header>
      {dimensions.map(({ dimension, enabled, label, items }, i) => {
        return (
          <Fragment key={`filter-${dimension}`}>
            <button
              className={classNames(`sortfilter__filter-list__header__btn sortfilter__filter-list__header__btn--auction-page sortfilter__filter-list__header__btn--${kebabCase(dimension)}`, {
                'sortfilter__filter-list__header__btn--mobile': isMobile,
                'sortfilter__filter-list__header__btn--auction-page--enabled': activeDimensions.indexOf(dimension) > -1 || enabled,
                'sortfilter__filter-list__header__btn--border-top': i > 0
              })}
              data-dimension={dimension}
              key={`header-${dimension}`}
              onClick={() => {
                let newActiveDimensions = [...activeDimensions];
                if (activeDimensions.indexOf(dimension) > -1) {
                  newActiveDimensions.splice(activeDimensions.indexOf(dimension), 1)
                } else {
                  newActiveDimensions.push(dimension);
                }
                setActiveDimensions(newActiveDimensions);
              }}
              type="button"
            >
              {isUndefined(label) ? startCase(dimension) : startCase(label)}
            </button>
            <ul
              className={classNames(`sortfilter__filter-list sortfilter__filter-list--auction-page sortfilter__filter-list--${deviceType}`, {
                'sortfilter__filter-list--last-child': i === (filterDimensions.length - 1)
              })}
              key={`list-${dimension}`}
            >
              {items.map(item => (
                <AuctionFilterItem
                  key={`${dimension}-${item.label}`}
                  dimension={dimension}
                  payload={{ ...item, saleNumber, saleType }}
                  hide={dimension === 'isNoReserve' ? (!(activeDimensions.indexOf('price') > -1 || enabled)) : (!(activeDimensions.indexOf(dimension) > -1 || enabled))}
                />
              ))}
            </ul>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

AuctionFilter.propTypes = {
  deviceTypes: PropTypes.arrayOf(PropTypes.string),
  filterDimensions: PropTypes.arrayOf(PropTypes.shape({
    'dimension': PropTypes.string,
    'enabled': PropTypes.bool,
    'items': PropTypes.arrayOf(PropTypes.object),
    'filterBy': PropTypes.oneOf([PropTypes.string, PropTypes.func])
  })),
  saleOffers: PropTypes.number,
  saleNumber: PropTypes.string.isRequired,
  saleType: PropTypes.string.isRequired,
  urlQueries: PropTypes.shape({ 'filter': '', 'sort': '' }).isRequired,
  hasCheckboxFilter: PropTypes.bool,
  currencySign: PropTypes.string
};

export default AuctionFilter;
