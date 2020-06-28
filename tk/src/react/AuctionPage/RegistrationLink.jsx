import React from 'react';
import isUndefined from 'lodash/isUndefined';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import { isAuctionLive } from '../../utils/auctionLiveState';
import { saleRegistration } from '../PropTypes/proptypes';

export const showRegistrationLink = props => isAuctionLive(props, 0, 'greaterThan', 'endDate')
  && props.lots.length > 0
  ? (props.auctionMobilityAuctionRowId !== '0' && props.showRegistrationLink)
  : false;

const Pending = () => (
  <section className="row registration">
    <h3>Your registration is pending.</h3>
    <p>
      Please contact our Bids department with any questions.
    </p>
  </section>
);

const Registered = ({ paddleNumber, widgetEnabled }) => (
  <section className="row registration">
    <h3>You are registered for bidding in this sale.</h3>
    <p>
      Your paddle number is&nbsp;
      <strong>{paddleNumber}</strong>
      .&nbsp;
      {widgetEnabled
        ? 'Place your max bids now.'
        : 'You can place advance bids now or bid live on the day of the sale.'
      }
    </p>
  </section>
);

const RegistrationLink = ({
  amApiUrl,
  auctionMobilityAuctionRowId,
  saleNumber,
  saleTypeId,
  saleRegistrations
}) => {
  const registration = find(saleRegistrations, reg => reg.saleNumber === saleNumber);
  return !isUndefined(registration)
    ? registration.registrationStatus !== 3
      ? <Pending />
      : <Registered paddleNumber={registration.paddleNumber} widgetEnabled={saleTypeId === 3 && auctionMobilityAuctionRowId !== '0'} />
    : (
      <section className="row registration">
        <h3>Registration is open.</h3>
        <p>
          {saleTypeId === 3
            ? 'Register now to bid online.'
            : 'Register now to place advance bids or bid live in our digital saleroom.'}
        </p>
        <a href={`${amApiUrl}register-to-bid/${auctionMobilityAuctionRowId}`}>Register to Bid</a>
      </section>
    );
};

RegistrationLink.defaultProps = {
  saleRegistrations: []
};

RegistrationLink.propTypes = {
  amApiUrl: PropTypes.string.isRequired,
  saleNumber: PropTypes.string.isRequired,
  saleTypeId: PropTypes.number.isRequired,
  saleRegistrations: PropTypes.arrayOf(PropTypes.shape(saleRegistration)),
  auctionMobilityAuctionRowId: PropTypes.string.isRequired
};

export default RegistrationLink;
