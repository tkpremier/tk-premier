import { connect } from 'react-redux';
import BuyNowCarousel from '../PhillipsCarousel/BuyNowCarousel';
import { makeCarouselChildren } from './selectors';

const getChildren = makeCarouselChildren();

const makeMapStateToProps = () => (state, ownProps) => ({
  ...getChildren(state, ownProps)
});

export default connect(makeMapStateToProps)(BuyNowCarousel);
