import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';
import DisplayComponent from '../components/displaycomponent';
import breakpoints from '../utils/breakpoints';

class PhillipsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: 0,
      itemWidth: 278,
      wrapperWidth: 1110,
      itemsPerSlide: 5
    };
  }

  componentDidMount() {
    breakpoints((mql) => {
      const setNumItems = (size) => {
        const sizes = { xl: 4, lg: 3, md: 2, sm: 1, xs: 1 };
        return sizes[size];
      };
      this.calcWidth(setNumItems(mql.size));
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length > this.props.data.length) {
      const el = findDOMNode(this);
      const itemWidth = Math.ceil(el.offsetWidth / this.state.itemsPerSlide);
      this.setState({ wrapperWidth: itemWidth * (this.props.data.length + 1) });
    }
  }

  calcWidth(itemsPerSlide) {
    const el = findDOMNode(this);
    const itemWidth = Math.ceil(el.offsetWidth / itemsPerSlide);
    if (itemsPerSlide !== this.state.itemsPerSlide) {
      this.setState({
        itemsPerSlide: itemsPerSlide,
        itemWidth: itemWidth,
        wrapperWidth: itemWidth * (this.props.data.length + 1)
      });
    }
  }

  render() {
    const { data, Child } = this.props;

    const style = {
      width: `${this.state.wrapperWidth}px`,
      transform: `translateX(-${this.state.itemWidth * this.state.curIndex}px)`,
      transition: 'transform 500ms ease'
    };
    const changeIndex = (int) => {
      const curIndex = this.state.curIndex;
      this.setState({ curIndex: curIndex + int });
    };

    const children = data.map(childProps => (
      <li
        style={{ width: `${this.state.itemWidth}px` }}
      >
        <Child
          {...childProps}
          editable={this.props.editable}
          imageTransformation="HomePageCarousel"
          showLotNumber={false}
          lotListDisabled
        />
        {/*<Child*/}
          {/*editable={this.props.editable}*/}
          {/*{...props}*/}
          {/*style={{ width: `${this.state.itemWidth}px` }}*/}
          {/*key={props.id}*/}
          {/*totalCount={data.length}*/}
          {/*carouselId={this.props.id}*/}
          {/*showLotList={false}*/}
          {/*imageWidth={this.state.itemWidth - 20}*/}
        {/*/>*/}
      </li>
    ));

    const headline = this.props.name;
    const prevDisabled = this.state.curIndex <= 0;
    const nextDisabled = this.state.curIndex >= children.length - this.state.itemsPerSlide;
    const handleSwipe = e => {
      if (e.deltaX > 0) {
        if (!prevDisabled) { changeIndex(-1); }
      } else {
        if (!nextDisabled) { changeIndex(1); }
      }
    }
    return (
      <div className="phillips-carousel">
        <DisplayComponent if={children.length > this.state.itemsPerSlide}>
          <div
            className={prevDisabled ? 'disabled arrow prev' : 'arrow prev'}
            onClick={prevDisabled ? null : () => changeIndex(-1)}
          />
          <div
            className={nextDisabled ? 'disabled arrow next' : 'arrow next'}
            onClick={nextDisabled ? null : () => changeIndex(1)}
          />
        </DisplayComponent>
        <h2>{headline}</h2>
        <div className="carousel-wrapper">
          <Hammer onSwipe={handleSwipe}>
            <ul className="carousel-track" style={style}>
              {children}
            </ul>
          </Hammer>
        </div>
      </div>
    );
  }
}

PhillipsCarousel.defaultProps = {
  id: 0,
  data: []
}

PhillipsCarousel.propTypes = {
  id: PropTypes.number,
  carouselType: PropTypes.string,
  Child: PropTypes.element.isRequired,
  active: PropTypes.bool,
  name: PropTypes.string,
  data: PropTypes.array,
  editable: PropTypes.bool,
  onSelect: PropTypes.func
};

export default PhillipsCarousel;
