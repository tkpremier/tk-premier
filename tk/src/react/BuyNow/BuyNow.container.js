import { connect } from 'react-redux';
import Layout from './Layout';
import { buyNowGridSelector } from './selectors';

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Layout);
