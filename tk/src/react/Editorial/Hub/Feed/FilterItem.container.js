import { connect } from 'react-redux';
import FilterItem from '../../../PhillipsFilter/FilterItem';
import { getFilterItemData } from './selectors';

const filterItemData = getFilterItemData();

const mapStateToProps = (state, ownProps) => ({
  ...filterItemData(state, ownProps)
});

export default connect(mapStateToProps)(FilterItem);
