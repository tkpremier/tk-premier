import { connect } from 'react-redux';
import PrivateServices from './PrivateServices';

const mapStateToProps = (state, { loginRequired = false }) => ({
  ...state,
  loginRequired
});

export default connect(mapStateToProps)(PrivateServices);
