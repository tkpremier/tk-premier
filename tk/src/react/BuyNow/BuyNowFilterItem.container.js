import { connect } from 'react-redux';
import FilterItem from '../PhillipsFilter/FilterItem';
import { getBuyNowFilterItemData } from './selectors';

const getFilterItemData = getBuyNowFilterItemData();

const makeMapStateToProps = () => (state, ownProps) => ({
  ...getFilterItemData(state, ownProps)
});

export default connect(makeMapStateToProps)(FilterItem);
