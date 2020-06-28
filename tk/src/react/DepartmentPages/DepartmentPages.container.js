import { connect } from 'react-redux';
import Department from './DepartmentPages';

const mapStateToProps = (state, { Hero, Highlights }) => ({
  ...state,
  Hero,
  Highlights
});

export default connect(mapStateToProps)(Department);
