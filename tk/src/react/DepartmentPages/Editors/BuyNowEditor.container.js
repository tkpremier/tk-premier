import { connect } from 'react-redux';
import DeptCarouselEditor from './DeptCarouselEditor';
import { editComponent, updateComponent, updatePosition } from '../actions';
import { editingState } from '../setInitialState';
import { createDisplayOrderList, getEditingData } from '../selectors';

const makeMapStateToProps = () => {
  return (state, { componentType = 'buyNowCarousel', position }) => {
    const {
      buyNowCarousel,
      departmentId,
      departmentName,
      editable,
      editingComponent
    } = state;
    const { active, carouselItems, carouselDesc, carouselId, carouselTitle } = buyNowCarousel[0];
    return {
      ...getEditingData(state, componentType),
      active,
      carouselId,
      componentType,
      carouselItems,
      currentCarouselTitle: carouselTitle,
      departmentId,
      departmentName,
      displayOrderList: createDisplayOrderList(carouselItems.length),
      editable,
      editingComponentType: editingComponent.componentType,
      editingCarouselDesc: carouselDesc,
      editingCarouselTitle: carouselTitle,
      editingCarouselItem: editingComponent.componentType === componentType
        && editingComponent.isCarouselItem,
      position
    };
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  let options = {
    componentType: 'buyNowCarousel',
    editing: true,
    saving: true,
    saved: false,
    method: 'POST'
  };
  return {
    deleteItem: (payload) => {
      const { formData } = payload;
      const { carouselId, itemUniqueId: carouselItemId, lotNumber, saleNumber } = formData;
      options.data = {
        ...formData,
        carouselItemId,
        lotNumber,
        saleNumber
      };
      options.method = 'DELETE';
      options.url = `/api/carousel/carouselItem?carouselId=${carouselId}&carouselItemId=${carouselItemId}`;
      dispatch(updateComponent(options));
    },
    updatePosition: (payload) => {
      dispatch(updatePosition(payload));
    },
    updateComponent: (payload) => {
      const { formData } = payload;
      let { active } = formData;
      active = Boolean(parseInt(active, 10));
      const { carouselItems, desc, carouselId } = ownProps.buyNowCarousel;
      options.data = {
        ...formData,
        active,
        carouselItemId: formData.itemUniqueId,
        carouselId,
        carouselItems,
        desc,
        carouselDesc: desc,
        carouselType: 'lot',
        carouselArea: 'department',
        displayOrder: parseInt(formData.displayOrder, 10)
      };
      options.method = parseInt(carouselId, 10) === 0 ? 'POST' : 'PUT';

      options.url = payload.isCarouselItem
        ? '/api/carousel/carouselItem/'
        : '/api/carousel/carousel';
      dispatch(updateComponent(options));
    },
    handleCancel: (e, deptId) => {
      e.persist();
      e.preventDefault();
      dispatch(editComponent(editingState(deptId)));
    }
  };
};

export default connect(makeMapStateToProps, mapDispatchToProps)(DeptCarouselEditor);
