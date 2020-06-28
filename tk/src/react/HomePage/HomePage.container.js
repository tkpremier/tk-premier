import { connect } from 'react-redux';
import find from 'lodash/find';
import isNull from 'lodash/isNull';
import HomePage from './HomePage';
import { defaultProps } from '../PhillipsCarousel/proptypes';

const mapStateToProps = ({ elements }, { editable }) => {
  const { carousels } = elements;
  const buyNowCarousel = editable
    ? (find(carousels, carousel => carousel.buyNowSaleNumber.length > 0) || defaultProps)
    : find(carousels, carousel => carousel.buyNowSaleNumber.length > 0);
  const otherCarousels = carousels.filter(carousel => isNull(carousel.buyNowSaleNumber) || carousel.buyNowSaleNumber.length === 0).sort((a, b) => a.displayOrder - b.displayOrder);
  // first carousel that is not Perpetual (lots or makers);
  const carouselOne = editable ? (otherCarousels[0] || defaultProps) : otherCarousels[0];
  // second carousel that is not Perpetual (lots or makers).  Can be undefined
  const carouselTwo = editable ? (otherCarousels[1] || defaultProps) : otherCarousels[1];
  return {
    buyNowCarousel,
    carouselOne,
    carouselTwo,
    ...elements,
    editable
  };
};

export default connect(mapStateToProps)(HomePage);
