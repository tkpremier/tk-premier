import { connect } from 'react-redux';
import ConditionReport from './ConditionReport';

const mapStateToProps = ({ user }) => {
  const loggedIn = user.id.length > 0;
  return { user, loggedIn };
};

export default connect(mapStateToProps)(ConditionReport);
