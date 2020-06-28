import { connect } from 'react-redux';
import serialize from 'form-serialize';
import find from 'lodash/fp/find';
import List from './List';
import { toggleEditLotList, updateEditingLots, editListRequest } from '../actions';
import { showModal } from '../../actions/modal';

const mapStateToProps = ({ editingLotList, userLotList }, { id }) => {
  return {
    editingLotList,
    list: find(list => list.id === id)(userLotList)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { id } = props;
  return {
    editList: (e) => {
      dispatch(toggleEditLotList(e.target.dataset.enable, id, e.target.dataset.updateProp));
    },
    deleteList: () => {
      dispatch(showModal({ id }, 'DeleteList'));
    },
    updateList: (e) => {
      e.preventDefault();
      const data = { ...serialize(e.target, { hash: true }), id };
      dispatch(editListRequest(data));
    },
    updateEditingLots: (e) => {
      dispatch(updateEditingLots(e.target.dataset));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
