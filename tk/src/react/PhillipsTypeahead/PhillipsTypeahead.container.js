import { connect } from 'react-redux';
import TypeaheadWrapper from './PhillipsTypeahead';
import { setMaker } from '../ArtistsMakers/actions';

const mapStateToProps = (state = {}) => {
  const options = state.autoComplete.data;
  const {
    hiddenValue
  } = state.autoComplete;
  return { options, hiddenValue };
};

const mapDispatchToProps = { setMaker };

const TypeaheadCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeaheadWrapper);

export default TypeaheadCont;
