import React from 'react';
import PropTypes from 'prop-types';

const PrivateServices = (props) => {
  return (
    <div className="private-services-banner container">
      <p className="private-services-banner__title">Private Services</p>
      <div className="private-services-banner__info row">
        <div className="private-services-banner__info__section__private-sales">
          <p className="private-services-banner__info__section__title">Private Sales</p>
          <p>
            Phillips’ Private Sales department provides our clients with a uniquely personalized approach
            to collecting. We utilize innovative, targeted approaches that combine personal relationships
            with collectors and market intelligence.
          </p>
          <a href="/private-sales-department">Learn More</a>
        </div>
        <div className="private-services-banner__info__section__trusts">
          <p className="private-services-banner__info__section__title">Trusts, Estates &amp; Valuations</p>
          <p>
            Phillips’ Trusts, Estates and Valuations Department works with private clients, lawyers,
            bankers, advisors, family offices, and insurance brokers to assist with various aspects
            of collection management.
          </p>
          <a href="/trusts-estates-valuations">Learn More</a>
        </div>
      </div>
    </div>
  );
};

PrivateServices.defaultProps = {

};

PrivateServices.propTypes = {

};

export default PrivateServices;
