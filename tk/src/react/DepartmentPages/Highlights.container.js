import { connect } from 'react-redux';
import Carousel from '../PhillipsCarousel/PhillipsCarousel';
import { carouselChildren } from './selectors';

const makeMapStateToProps = () => ({ buyNowCarousel, carousel, editable }, { componentType = 'carousel' }) => {
  return {
    carouselTitle: carousel.title,
    carouselDesc: carousel.desc,
    children: carouselChildren({ buyNowCarousel, carousel }, componentType),
    editable
  };  
};

const Highlights = connect(
  makeMapStateToProps
)(Carousel);

export default Highlights;
