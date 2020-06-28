import React from 'react';
import PropTypes from 'prop-types';

const Img = (props) => {
  const handleImgError = (e) => {
    e.target.src = props.errorHolder;
  };
  return (
    <img src={props.src} onError={handleImgError} alt={props.alt} title={props.title} />
  );
}

Img.defaultProps = {
  alt: '',
  src: '',
  title: ''
};

Img.propTypes = {
  alt: PropTypes.string,
  errorHolder: PropTypes.element,
  src: PropTypes.string,
  title: PropTypes.string
};

export default Img;
