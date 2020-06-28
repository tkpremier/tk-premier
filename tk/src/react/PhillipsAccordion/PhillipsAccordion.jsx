import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';


const PhillipsAccordion = (props) => {
  const [setOpen, setOpenState] = useState('');
  const [setHeight, setHeightState] = useState('0px');

  const content = useRef(null);

  const toggleAccordion = () => {
    setOpenState(setOpen === '' ? 'is-open' : '');
    setHeightState(setOpen === 'is-open' ? '0px' : `${content.current.scrollHeight}px`);
  };
  useEffect(() => {
    if (props.expanded) {
      setOpenState('is-open');
      setHeightState(`${content.current.scrollHeight}px`);
    }
  }, [props.expanded]);
  return (

    <li className="accordion">
      <button className={`accordion__button ${setOpen}`} onClick={toggleAccordion}>
        {props.title}
      </button>
      <ul className="accordion__content" ref={content} style={{ maxHeight: `${setHeight}` }}>
        {props.children}
      </ul>
    </li>
  );
};

PhillipsAccordion.defaultProps = {
  className: '',
  expanded: ''
};

PhillipsAccordion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  expanded: PropTypes.string,
  title: PropTypes.string.isRequired
};
export default PhillipsAccordion;
