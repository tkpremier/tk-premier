import { connect } from 'react-redux';
import MakerCarouselList from './MakerCarouselList';
import { fetchMakers } from './actions';
import { manageCarousel, addNewMaker, saveCarousel, deleteCarousel } from './actions/makercarousels';

const mapStateToProps = (state = {}) => {
  const {
    makerCarousels,
    editable
  } = state;
  const {
    editorResponse
  } = makerCarousels;
  return { makerCarousels, editable, editorResponse };
};

const mapDispatchToProps = {
  manageCarousel,
  addNewMaker,
  saveCarousel,
  deleteCarousel,
  fetchMakers
};


const MakerCarouselCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(MakerCarouselList);

export default MakerCarouselCont;
