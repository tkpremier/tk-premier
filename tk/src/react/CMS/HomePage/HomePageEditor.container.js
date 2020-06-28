import { connect } from 'react-redux';
import { unselectElement } from '../actions';
import HomePageEditor from './HomePageEditor';

const mapStateToProps = ({ modal }) => ({ modal });

const mapDispatchToProps = { unselectElement };
export default connect(mapStateToProps, mapDispatchToProps)(HomePageEditor);
