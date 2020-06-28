import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Hammer from 'react-hammerjs';

const Slide = (props) => {
  return (
    <li className={classNames('slide', { active: props.active })} >
      {props.children}
    </li>
  );
};

const Track = (props) => {
  return (
    <ul className="slider-track">
      {props.children}
    </ul>
  );
};

class PhillipsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderWidth: 0,
      currentIndex: this.props.currentIndex
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIndex !== this.state.currentIndex) {
      this.changeIndex(nextProps.currentIndex);
    }
  }

  changeIndex(index) {
    this.setState(state => ({ ...state, currentIndex: index }));
  }

  render() {

    const slides = this.props.children.map((child, index) => {
      return (
        <Slide active={index === this.state.currentIndex}>
          {child}
        </Slide>
      );
    });

    let arrows = null;
    if (this.props.arrows) {
      let disableNext = false;
      let disablePrevious = false;
      if (!this.props.loop) {
        disablePrevious = this.state.currentIndex === 0;
        disableNext = this.state.currentIndex === this.props.children.length - 1;
      }
      const onPrevious = () => {
        if (this.state.currentIndex === 0) {
          this.changeIndex(this.props.children.length - 1);
        } else {
          this.changeIndex(this.state.currentIndex - 1);
        }
      };
      const onNext = () => {
        if (this.state.currentIndex === this.props.children.length - 1) {
          this.changeIndex(0);
        } else {
          this.changeIndex(this.state.currentIndex + 1);
        }
      };
      arrows = (
        <div className="slider-arrows">
          <button
            className="arrow previous"
            disabled={disablePrevious}
            onClick={onPrevious}
          />
          <button
            className="arrow next"
            disabled={disableNext}
            onClick={onNext}
          />
        </div>
      );
    }

    let pagination = null;
    if (this.props.pagination) {
      pagination = (
        <ul className="slider-pagination">
          {
            this.props.children.map((child, index) => {
              const active = this.state.currentIndex === index;
              return (
                <li className="slider-page">
                  <button
                    className={classNames('pagination-dot', { active })}
                    onClick={() => this.changeIndex(index)}
                  />
                </li>
              );
            })
          }
        </ul>
      );
    }
    return (
      <div className={`phillips-slider ${this.props.animation}`}>
        {pagination}
        {arrows}
        <Track>
          {slides}
        </Track>
      </div>
    );
  }
};

PhillipsSlider.defaultProps = {
  currentIndex: 0,
  animation: 'slide',
  arrows: true,
  loop: true,
  pagination: false
};

PhillipsSlider.propTypes = {
  currentIndex: PropTypes.number,
  animation: PropTypes.string,
  arrows: PropTypes.bool,
  loop: PropTypes.bool,
  pagination: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default PhillipsSlider;
