import { connect } from 'react-redux';
import Switch from './DepartmentSwitch';

const mapStateToProps = (state = {}, ownProps = {}) => {
  return state;
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Switch);
