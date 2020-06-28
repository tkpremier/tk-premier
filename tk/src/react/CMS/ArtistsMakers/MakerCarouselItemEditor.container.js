import { connect } from 'react-redux';
import { manageCarousel, setCarouselCount } from '../../ArtistsMakers/actions/index';
import { manageMaker } from '../../ArtistsMakers/MakerCarouselItem/actions';
import Editor from './MakerItemEditor';

const mapStateToProps = (state = {}) => {
  const {
    data,
    isFetching,
    isNew
  } = state.makerCarousels;
  const {
    editable
  } = state;
  return { data, isFetching, editable, isNew };
};

const mapDispatchToProps = {
  manageCarousel,
  setCarouselCount,
  manageMaker
};

const MakerCarouselCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

export default MakerCarouselCont;
