import { connect } from 'react-redux';
import FeedList from './FeedList';
import { getListData } from './selectors';

const mapStateToProps = state => getListData(state);

export default connect(mapStateToProps)(FeedList);
