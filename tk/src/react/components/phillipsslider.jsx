import React, { Component, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import isFunction from 'lodash/fp/isFunction';
import Hammer from 'react-hammerjs';

const updateTrackStyles = ({ currentIndex, sliderWidth, children }) => {
  return {
    width: `${children.length * sliderWidth}px`,
    height: '100%',
    transition: 'all 500ms ease',
    transform: `translateX(-${sliderWidth * currentIndex}px)`,
    WebkitTransform: `translateX(-${sliderWidth * currentIndex}px)`
  };
};

const Track = (props) => {
  const slides = props.children.map(child =>
    cloneElement(child, { slideWidth: props.sliderWidth }));
  return (
    <div className="track" style={updateTrackStyles(props)}>
      {slides}
    </div>
  );
};
Track.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  currentIndex: PropTypes.number,
  sliderWidth: PropTypes.number
};

const SliderControls = ({ onClick }) => (
  <div className="slider-controls">
    <div
      className="slider-control arrow-box left"
      onClick={() => onClick(-1)}
    >
      <div className="arrow prev prev-arrow" />
    </div>
    <div
      className="slider-control arrow-box right"
      onClick={() => onClick(1)}
    >
      <div className="arrow next next-arrow" />
    </div>
  </div>
);
SliderControls.propTypes = {
  onClick: PropTypes.func
};

const Slider = (props) => {
  const classNames = `phillips-slider ${props.sliderClass} ${props.animation}-animation`;
  let slider = null;
  let controls = null;
  if (props.pagination) {
    const dots = props.children.map((child, i) => {
      const onClick = () => {
        props.changeSlide(i);
      };
      return (
        <li className={i === props.currentIndex ? 'dot active' : 'dot'}>
          <button onClick={onClick} />
        </li>
      );
    });
    controls = (<ul className="slider-pagination">{dots}</ul>);
  }
  const onClick = (int) => {
    let indexToChangeTo = props.currentIndex + int;
    if (indexToChangeTo >= props.children.length) {
      indexToChangeTo = 0;
    } else if (indexToChangeTo < 0) {
      indexToChangeTo = props.children.length - 1;
    }
    props.changeSlide(indexToChangeTo);
  };
  switch (props.animation) {
    case 'slide':
      slider = (
        <div className={classNames}>
          <Track currentIndex={props.currentIndex} sliderWidth={props.sliderWidth}>
            {props.children}
          </Track>
          {props.pagination ? controls : null}
        </div>
      );
      break;
    default:
      // default animation is fade
      slider = (
        <div className={classNames}>
          <SliderControls onClick={onClick} />
          <div className="slides-wrapper">
            {props.children}
          </div>
        </div>
      );
  }
  return slider;
};
Slider.propTypes = {
  currentIndex: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element),
  changeSlide: PropTypes.func,
  animation: PropTypes.string,
  sliderWidth: PropTypes.number,
  sliderClass: PropTypes.string,
  pagination: PropTypes.bool,
  arrows: PropTypes.bool,
  endAutoplay: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

class PhillipsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderWidth: 0,
      currentIndex: props.currentIndex
    };
  }

  componentDidMount() {
    if (isFunction(this.props.onMount)) {
      this.props.onMount(this);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIndex !== this.state.currentIndex) {
      this.setState({ currentIndex: nextProps.currentIndex });
    }
  }

  render() {
    const sliderProps = { ...this.state, ...this.props };
    return (<Slider {...sliderProps} />);
  }
}
PhillipsSlider.defaultProps = {
  currentIndex: 0,
  onMount: (phillipsSlider) => {
    phillipsSlider.setState({
      sliderWidth: findDOMNode(phillipsSlider).offsetWidth
    });
  }
};

PhillipsSlider.propTypes = {
  endAutoplay: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  currentIndex: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element),
  changeSlide: PropTypes.func,
  animation: PropTypes.string,
  onMount: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  sliderClass: PropTypes.string,
  pagination: PropTypes.bool
};

export default PhillipsSlider;
