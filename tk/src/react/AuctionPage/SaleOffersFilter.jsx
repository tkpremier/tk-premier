import React from 'react';
import Link from 'redux-first-router-link';
import PropTypes from 'prop-types';
import PhillipsCheckbox from '../PhillipsCheckbox/PhillipsCheckbox';

const SaleOffers = (
  {
    count,
    handleChange,
    filter,
    label,
    payload,
    sort,
    saleNumber,
    saleType,
    status,
    type
  }
) => {
  console.log('active:', status);
  // const active = filter.indexOf('showSaleOffers') > -1;
  // const status = active ? 'active' : 'inactive';
  // let type = sort.length > 0 ? 'ROUTES_SORT' : 'ROUTES_DEFAULT';
  // if (active) {
  //   if (filter.length > 0) {
  //     type = `ROUTES_FILTER${sortAction}`;
  //   }
  // } else {
  //   type = `ROUTES_FILTER${sortAction}`;
  // }
  return (
    <div className="sortfilter__sale-offer">
      <h3 className="sortfilter__h3--sale-offer">Post Auction Offerings</h3>
      <Link
        to={{
          type,
          payload: {
            ...payload,
            filter,
            sort
          }
        }}
      >
        <PhillipsCheckbox
          id="offers"
          label={label}
          isChecked={status === 'active'}
          disabled={status === 'disabled'}
          arg={payload}
        />
      </Link>
    </div>
  );
};

/**
 * {/* <div className="checkbox-wrapper">
          <input
            id="offers"
            type="checkbox"
            name="offers"
            checked={status === 'active'}
            onChange={null}
          />
          <label htmlFor="offers">Show Offerings &#8226; {count} Lots - {status}</label>
      </div>
 */

SaleOffers.propTypes = {
  count: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  saleTypeID: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired
}

export default SaleOffers;