import serialize from 'form-serialize';
import { has, trim, isEmpty } from 'lodash/fp';
import { connect } from 'react-redux';
import DeptCarouselEditor from './DeptCarouselEditor';
import { editComponent, updateComponent, updatePosition } from '../actions';
import { editingState } from '../setInitialState';
import { createDisplayOrderList, getEditingData } from '../selectors';

const makeMapStateToProps = () => (state, { componentType = 'carousel' }) => {
  const {
    carousel,
    departmentId,
    departmentName,
    editable,
    editingComponent
  } = state;
  const { lots, position, title } = carousel;
  return {
    componentType,
    currentCarouselTitle: title,
    departmentId,
    departmentName,
    displayOrderList: createDisplayOrderList(lots.length),
    editable,
    editingCarouselTitle: title,
    ...getEditingData(state, componentType),
    editingComponentType: editingComponent.componentType,
    carouselItems: lots,
    position
  };
};


const mapDispatchToProps = (dispatch) => {
  let options = {
    componentType: 'carousel',
    editing: true,
    saving: true,
    saved: false,
    method: 'POST'
    // url
    // noBody
  }
  return {
    deleteItem: (payload) => {
      const { formData } = payload;
      options.data = {
        ...formData
      };
      options.method = 'DELETE';
      options.url = `/api/departments/${formData.departmentId}/carousel/${formData.departmentLotId}`;
      dispatch(updateComponent(options));
    },
    updatePosition: (payload) => {
      dispatch(updatePosition(payload));
    },
    updateComponent: (payload) => {
      const { formData } = payload;
      const { departmentLotId, lotNumber, saleNumber } = formData;
      options.data = {
        ...formData,
        displayOrder: parseInt(formData.displayOrder, 10),
        active: true
      };
      options.method = parseInt(departmentLotId, 10) === 0 ? 'POST' : 'PUT';

      options.noBody = !(lotNumber && saleNumber);
      const titleChanged = (trim(formData.carouselTitle) !== trim(formData.currentCarouselTitle) || payload.noBody) ? `${formData.carouselTitle}` : '';
      const titleParameter = titleChanged ? `?carouselTitle=${encodeURIComponent(titleChanged)}` : '';
      options.url = `/api/departments/${formData.departmentId}/carousel${titleParameter}`;
      dispatch(updateComponent(options));
    },
    handleCancel: (e, deptId) => {
      e.persist();
      e.preventDefault();
      dispatch(editComponent(editingState(deptId)));
    }
  }
};

export default connect(makeMapStateToProps, mapDispatchToProps)(DeptCarouselEditor);
