import React from 'react';
import PropTypes from 'prop-types';
import getPhillipsBackboneProperty from '../utils/getPhillipsBackboneProperty'; 

const shippingQuoteString = 'Shipping Quote';
const className = 'lot-page__shipping-quote';

const openRegister = () => {
  getPhillipsBackboneProperty('Events')
    .then(eventEmitter => eventEmitter.trigger('openRegister'));
};

const ShippingQuote = ({
  email,
  loggedIn,
  lotNumberFull,
  lowEstimate,
  saleNumber
}) => (
  loggedIn
    ? (
      <a
        className={className}
        href={`https://app.shiparta.com/shipping-calculator/phillips/${saleNumber}?user=${email}&item=${lotNumberFull.trim()},${lowEstimate}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {`${shippingQuoteString}`}
      </a>
    )
    : (
      <button
        className={className}
        onClick={openRegister}
        type="button"
      >
        {`${shippingQuoteString}`}
      </button>
    )
);

ShippingQuote.propTypes = {
  email: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  lotNumberFull: PropTypes.string.isRequired,
  saleNumber: PropTypes.string.isRequired
};

export default ShippingQuote;
