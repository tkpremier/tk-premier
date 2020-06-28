import React, { PureComponent, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import breakpoints from '../utils/breakpoints';

const PhillipsCarouselItem = ({ children, width }) => (
  <li className="phillips-carousel-item" style={{ width }}>
    {children}
  </li>
);

class PhillipsCarousel extends PureComponent {
  state = {
    curIndex: 0,
    itemWidth: 278,
    itemsPerSlide: 4,
    nextDisabled: true,
    prevDisabled: true,
    wrapperWidth: 1110
  }

  constructor(props) {
    super(props);
    this.changeIndex = this.changeIndex.bind(this);
    this.carouselRef = createRef();
  }

  componentDidMount() {
    const setNumItems = size => this.props.sizes[size];
    breakpoints(mql => this.calcWidth(setNumItems(mql.size)));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children.length !== this.props.children.length) {
      this.setState(state => ({
        ...state,
        wrapperWidth:
          Math.ceil(this.carouselRef.current.clientWidth / state.itemsPerSlide) *
          nextProps.children.length
      }));
    }
  }

  calcWidth = (itemsPerSlide) => {
    if (this.carouselRef.current === null) {
      return;
    }
    const itemWidth = Math.ceil(this.carouselRef.current.clientWidth / itemsPerSlide);
    this.setState(state => ({
      ...state,
      itemsPerSlide,
      itemWidth,
      nextDisabled: state.curIndex >= this.props.children.length - itemsPerSlide,
      prevDisabled: state.curIndex <= 0,
      wrapperWidth: itemWidth * this.props.children.length
    }));
  }

  changeIndex(int) {
    let { curIndex } = this.state;
    const { nextDisabled, prevDisabled } = this.state;

    const { children } = this.props;
    if ((int === -1 && prevDisabled) || (int === 1 && nextDisabled)) {
      return null;
    }
    curIndex += int;
    this.setState(state => ({
      ...state,
      curIndex,
      nextDisabled: curIndex >= children.length - state.itemsPerSlide,
      prevDisabled: curIndex <= 0
    }));
    return this;
  }

  render() {
    return (
      <div
        className={classNames('phillips-carousel', this.props.classNames)}
        ref={this.carouselRef}
      >
        {this.props.children.length > this.state.itemsPerSlide ? (
          <Fragment>
            <button
              className={classNames('arrow prev', { disabled: this.state.prevDisabled })}
              onClick={() => this.changeIndex(-1)}
              type="button"
            />
            <button
              className={classNames('arrow next', { disabled: this.state.nextDisabled })}
              onClick={() => this.changeIndex(1)}
              type="button"
            />
          </Fragment>
        ) : null}
        {this.props.carouselTitle.length > 0 ? <h2>{this.props.carouselTitle}</h2> : null}
        <div className="carousel-wrapper">
          <ul
            className="carousel-track clearfix"
            style={{
              width: `${this.state.wrapperWidth}px`,
              transform: `translateX(-${this.state.itemWidth * this.state.curIndex}px)`,
              transition: 'transform 500ms ease'
            }}
          >
            {this.props.children.map(child => (
              <PhillipsCarouselItem width={this.state.itemWidth} key={child.key}>{child}</PhillipsCarouselItem>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

PhillipsCarousel.defaultProps = {
  carouselTitle: '',
  classNames: '',
  sizes: {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  }
};

PhillipsCarousel.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  carouselTitle: PropTypes.string,
  sizes: PropTypes.shape({
    xl: PropTypes.number,
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number
  })
};

export default PhillipsCarousel;
