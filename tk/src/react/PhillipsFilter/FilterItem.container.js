import { connect } from 'react-redux';
import FilterItem from './FilterItem';
import { makeFilterItemDatas } from './selectors';

const getFilterItemData = makeFilterItemDatas();

const makeMapStateToProps = () => (state, ownProps) => ({
  ...getFilterItemData(state, ownProps)
});

export default connect(makeMapStateToProps)(FilterItem);
