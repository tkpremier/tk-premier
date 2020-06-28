import React from 'react';
import PropTypes from 'prop-types';

const DisplayComponent = props => {
  let children = null;
  if (props.if) {
    children = props.children;
  }
  return <div>{children}</div>;
};

DisplayComponent.propTypes = {
  if: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.object])
};
export default DisplayComponent;
