import { connect } from 'react-redux';
import { hideModal } from './actions';
import PhillipsModal from './PhillipsModal';

const mapStateToProps = ({ modal }) => ({ modal });

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => {
      dispatch(hideModal());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhillipsModal);
