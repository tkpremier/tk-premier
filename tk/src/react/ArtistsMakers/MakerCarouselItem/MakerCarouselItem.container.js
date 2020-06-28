import { connect } from 'react-redux';
import { manageMaker, saveMaker, openDelete, deleteMaker } from './actions';
import MakerCarouselItem from './MakerCarouselItem';


const mapStateToProps = (state = {}) => {
  const {
    data,
    isFetching
  } = state.makerCarousels;
  const {
    editor
  } = state.manageMakerItem;
  const { editable, env } = state;
  return { data, isFetching, editable, editor, env };
};

const mapDispatchToProps = {
  manageMaker,
  openDelete,
  deleteMaker,
  saveMaker
};

const MakerCarouselItemCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(MakerCarouselItem);

export default MakerCarouselItemCont;
