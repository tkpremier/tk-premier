import React from 'react';
import PropTypes from 'prop-types';

const InfoBox = props => (
  <section className={props.className}>
    {props.children}
  </section>
);

InfoBox.defaultProps = {
  children: ''
};

InfoBox.propTypes = {
  children: PropTypes.element
};

export default InfoBox;
