import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ModalView = (props) => {
  return (
    <iframe width="1082" height="677" src={props.src} />
  )
};

export default ModalView;