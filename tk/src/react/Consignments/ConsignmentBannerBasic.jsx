import React from 'react';
import PropTypes from 'prop-types';
import sendAnalytics from '../../utils/sendAnalytics';

const ConsignmentBannerBasic = (props) => {
  const submitConsignAnalytics = (consignBannerId) => {
    sendAnalytics({
      eventCategory: 'Consignment Click',
      eventAction: `Clicked Consignment Promotion, Homepage Banner: ${consignBannerId}`,
      eventLabel: 'www.phillips.com'
    });
  };

  const imageStyle = {
    backgroundImage: `url('${props.backgroundUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%'
  };

  return (
    <div className="container">
      <div className="sell-consignment consignment-home row col-xs-12" style={imageStyle}>
        <div className="col-xs-12 col-md-9">
          <div className="col-xs-12">
            <h3>{props.sellText}</h3>
          </div>
          <div className="row horizontal-copy col-xs-12">
            <p>{props.consignmentText}</p>
          </div>
        </div>
        <div className="horizontal-layout col-xs-12 col-md-3">
          <a
            href="/sell"
            onClick={submitConsignAnalytics(props.bannerId)}
          >
            {props.submitText}
          </a>
        </div>
      </div>
    </div>
  );
};

ConsignmentBannerBasic.defaultProps = {
  backgroundUrl: '',
  bannerId: '0',
  consignmentText: 'We are inviting consignments for our upcoming auctions.',
  submitText: 'Submit now',
  sellText: 'Sell with us.'
};

ConsignmentBannerBasic.propTypes = {
  backgroundUrl: PropTypes.string,
  bannerId: PropTypes.string,
  consignmentText: PropTypes.string,
  submitText: PropTypes.string,
  sellText: PropTypes.string
};

export default ConsignmentBannerBasic;
