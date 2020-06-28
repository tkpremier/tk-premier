import React, { Component } from 'react';
import has from 'lodash/has';
import each from 'lodash/each';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import MakerCarouselItemCont from './MakerCarouselItem/MakerCarouselItem.container';
import breakpoints from '../utils/breakpoints';
import CarouselEditor from '../CMS/ArtistsMakers/CarouselEditor';

const DisplayComponent = ({ valid, children }) => {
  let html = null;
  if (valid) {
    html = (
      <div>
        {children}
      </div>
    );
  }
  return html;
};

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.domNode = null;

    this.setCarouselRef = (element) => {
      this.domNode = element;
    };
    this.state = {
      curIndex: 0,
      itemWidth: 375,
      wrapperWidth: 375,
      itemsPerSlide: 1
    };
  }

  componentDidMount() {
    breakpoints((mql) => {
      const setNumItems = (size) => {
        const sizes = {
          xl: this.getCountPerSlide(this.props.makerCarouselItems.length),
          lg: this.getCountPerSlide(this.props.makerCarouselItems.length),
          md: this.getCountPerSlide(this.props.makerCarouselItems.length),
          sm: 1,
          xs: 1
        };
        return sizes[size];
      };
      this.calcWidth({
        itemsPerSlide: setNumItems(mql.size),
        itemCount: this.props.makerCarouselItems.length
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.makerCarouselItems.length !== this.props.makerCarouselItems.length) {
      this.calcWidth({
        itemsPerSlide: this.getCountPerSlide(nextProps.makerCarouselItems.length),
        itemCount: nextProps.makerCarouselItems.length
      });
    }
  }

  getCountPerSlide(count) {
    if (count > 0 && count < 3) {
      return 3;
    } else if (count > 6) {
      return 6;
    }
    return count;
  }

  calcWidth({ itemsPerSlide, itemCount }) {
    const itemWidth = Math.ceil(this.domNode.offsetWidth / itemsPerSlide);
    const resetIndex = itemsPerSlide < itemCount ? this.state.curIndex : 0;
    this.setState({
      itemsPerSlide: itemsPerSlide,
      itemWidth: itemWidth,
      wrapperWidth: itemWidth * (itemCount),
      curIndex: resetIndex
    });
  }
  render() {
    const data = this.props.makerCarouselItems;
    const children = data.map((props) => {
      return (
        <MakerCarouselItemCont
          {...props}
          key={has(props, 'keyId') ? props.keyId : props.id}
          makerCarouselId={this.props.id}
          makerCarouselCount={this.props.makerCarouselItems.length}
          style={{ width: `${this.state.itemWidth}px` }}
          showViewAll={this.props.showViewAll}
        />
      );
    });
    const changeIndex = (int) => {
      const curIndex = this.state.curIndex;
      this.setState({ curIndex: curIndex + int });
    };
    // carousel touch events START
    const touch = {
      startX: 0,
      startY: 0,
      curX: 0,
      curY: 0
    };
    const onTouchStart = (e) => {
      const touchEvent = e.touches[0];
      [touch.startX, touch.startY] = [touchEvent.clientX, touchEvent.clientY];
    };
    const onTouchMove = (e) => {
      const touchEvent = e.touches[0];
      [touch.curX, touch.curY] = [touchEvent.clientX, touchEvent.clientY];
    };
    const onTouchEnd = () => {
      const delta = touch.curX - touch.startX;
      if (Math.abs(delta) > 50) {
        if (delta > 0 && this.state.curIndex > 0) {
          changeIndex(-1);
        } else if (this.state.curIndex < children.length - this.state.itemsPerSlide) {
          changeIndex(1);
        }
      }
      each(touch, (v, key) => {
        touch[key] = 0;
      });
    };
    const onTouchCancel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      each(touch, (v, key) => {
        touch[key] = 0;
      });
    };
    // carousel touch events END
    const style = {
      width: `${this.state.wrapperWidth}px`,
      transform: `translateX(-${this.state.itemWidth * this.state.curIndex}px)`,
      transition: 'transform 500ms ease'
    };
    const headline = this.props.name;
    const prevDisabled = this.state.curIndex <= 0;
    const nextDisabled = this.state.curIndex >= children.length - this.state.itemsPerSlide;
    const viewAll = this.props.showViewAll ?
      (<a href="/follows" className="view-all">View All</a>) :
      null;

    // CMS Carousel save/update methods
    const handleCarouselSave = (e) => {
      e.preventDefault();
      const carouselData = { ...this.props, ...serialize(e.target, { hash: true }) };
      carouselData.active = (carouselData.active === 'true');
      this.props.saveCarousel(this.props.id, carouselData);
    };
    const addNewMaker = (e) => {
      e.preventDefault();
      this.props.addNewMaker(this.props.id);
    }
    const carouselEditor = this.props.editable ?
      (<CarouselEditor
        {...this.props}
        onSubmit={handleCarouselSave}
        handleAddMaker={addNewMaker}
      />) :
      null;
    return (
      <div className="phillips-carousel col-xs-12" ref={this.setCarouselRef}>
        {carouselEditor}
        <div className="row">
          <h2 className="carousel-name">{headline}</h2>
          {viewAll}
        </div>
        <DisplayComponent valid={children.length > this.state.itemsPerSlide}>
          <div
            className={prevDisabled ? 'disabled arrow prev' : 'arrow prev'}
            onClick={prevDisabled ? null : () => changeIndex(-1)}
          />
          <div
            className={nextDisabled ? 'disabled arrow next' : 'arrow next'}
            onClick={nextDisabled ? null : () => changeIndex(1)}
          />
        </DisplayComponent>
        <div className="carousel-wrapper">
          <ul
            className="carousel-track"
            style={style}
          >
            {children}
          </ul>
        </div>
      </div>
    );
  }
};

Carousel.defaultProps = {
  editable: false,
  addNewMaker: () => { },
  saveCarousel: () => { },
  id: 0,
  name: '',
  showViewAll: false,
  makerCarouselItems: []
}

Carousel.propTypes = {
  editable: PropTypes.bool,
  addNewMaker: PropTypes.func,
  saveCarousel: PropTypes.func,
  id: PropTypes.number,
  name: PropTypes.string,
  showViewAll: PropTypes.bool,
  makerCarouselItems: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    birthYear: PropTypes.string,
    deathYear: PropTypes.string,
    displayOrder: PropTypes.number,
    id: PropTypes.number,
    imageSource: PropTypes.string,
    keyId: PropTypes.number,
    lotNumber: PropTypes.number,
    lotNumberSuffix: PropTypes.string,
    makerId: PropTypes.number,
    makerName: PropTypes.string,
    nationality: PropTypes.string,
    saleNumber: PropTypes.string
  }))
}
