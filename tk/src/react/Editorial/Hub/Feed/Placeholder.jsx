import React, { forwardRef } from 'react';
import { Waypoint } from 'react-waypoint';
import PropTypes from 'prop-types';

const Placeholder = ({ innerRef }) => (
  <div className="row editorial-hub__feed__row" ref={innerRef}>
    <h1 className="editorial-hub__h1  editorial-hub__feed__h1">Browse Articles &amp; Videos</h1>
    <div className="col-xs-12" style={{ 'textAlign': 'center' }}>
      <img
        alt="Loading Articles and Videos"
        src="https://phillips.vo.llnwd.net/v1/web_prod/images/layout/ajax-loader.gif"
      />
    </div>
  </div>
);

Placeholder.defaultProps = {
  innerRef: { current: null }
};

Placeholder.propTypes = {
  innerRef: PropTypes.oneOfType([
    PropTypes.func, PropTypes.shape({ current: PropTypes.element })
  ])
};

const PlaceholderWithRef = forwardRef((props, ref) => <Placeholder innerRef={ref} />);

const PlaceholderWithTracker = ({ onEnter }) => (
  <Waypoint
    onEnter={onEnter}
    bottomOffset="-1500px"
  >
    <PlaceholderWithRef />
  </Waypoint>
);

PlaceholderWithTracker.propTypes = {
  onEnter: PropTypes.func.isRequired
};

export { Placeholder, PlaceholderWithTracker };
