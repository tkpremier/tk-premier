import { connect } from 'react-redux';
import { editComponent } from '../actions';
import HighItemEditor from './HighItemEditor';

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleEdit: ({ target }) => {
      const { value } = target;
      const itemUniqueId = ownProps.hasOwnProperty('departmentLotId') ? ownProps.departmentLotId : ownProps.carouselItemId;
      const payload = {
        componentType: ownProps.componentType,
        isCarouselItem: true,
        itemUniqueId,
        editing: true,
        saving: false,
        saved: false,
        data: ownProps,
        method: value
      };
      dispatch(editComponent(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HighItemEditor);
