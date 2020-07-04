import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Sticky = props => {
  const ref = createRef(null);
  // useEffect(() => {
  //   $(ref.current).draggable({ containment: '.homepage' });
  // }, []);
  // const onClose = () => {
  //   $(ref.current).remove();
  // };
  const imgSrc = !props.source.includes('http')
    ? `https://www.phillips.com/Xigen/image.ashx?path=${decodeURIComponent(this.props.source)}`
    : props.source;
  return (
    <div className="sticky" ref={ref}>
      <div className="sticky__header">
        <button className="sticky__close" type="button" />
      </div>
      <a href={props.wrappingLink} title={props.altText}>
        <img className="sticky__img" src={imgSrc} alt={props.altText} title={props.altText} />
      </a>
    </div>
  );
};

Sticky.defaultProps = {
  altText: '',
  source: '',
  wrappingLink: ''
};

Sticky.propTypes = {
  altText: PropTypes.string,
  source: PropTypes.string,
  wrappingLink: PropTypes.string
};

export default Sticky;
