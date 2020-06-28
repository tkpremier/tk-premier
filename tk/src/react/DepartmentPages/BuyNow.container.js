import { connect } from 'react-redux';
import Carousel from '../PhillipsCarousel/BuyNowCarousel';
import { carouselChildren } from './selectors';

const makeMapStateToProps = () => ({ buyNowCarousel, carousel, editable }, { componentType = 'buyNowCarousel', position }) => ({
  children: carouselChildren({ buyNowCarousel, carousel }, componentType),
  editable,
  name: buyNowCarousel[0].title,
  ...buyNowCarousel[0],
  position
});

const BuyNow = connect(
  makeMapStateToProps
)(Carousel);

export default BuyNow;
