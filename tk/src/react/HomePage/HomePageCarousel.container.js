import { connect } from 'react-redux';
import Carousel from '../PhillipsCarousel/PhillipsCarousel';
import { makeCarouselChildren } from './selectors';

const getChildren = makeCarouselChildren();

const makeMapStateToProps = () => (state, ownProps) => {
  const { carouselType, displayOrder } = ownProps;
  return {
    displayOrder,
    ...getChildren(state, ownProps)
  };
};

const LotCarousel = connect(
  makeMapStateToProps
)(Carousel);

export default LotCarousel;
