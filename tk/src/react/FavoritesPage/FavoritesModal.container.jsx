import { connect } from 'react-redux';
import FavoritesModal from './FavoritesModal';
import { deleteLotList } from '../PhillipsUser/actions';
import { closeModal } from '../actions/modal';
import { shareList } from './actions';

const mapStateToProps = (state) => {
  const { userLotList, modal, user } = state;
  return {
    userLotList,
    modal,
    user
  };
}

const mapDispatchToProps = {
  closeModal,
  deleteLotList,
  shareList
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesModal);
