import serialize from 'form-serialize';
import { has, trim } from 'lodash/fp';
import { connect } from 'react-redux';
import DeptCarouselEditor from './DeptCarouselEditor';
import { editComponent, updateComponent } from '../actions';
import { editingState } from '../setInitialState';
import { createDisplayOrderList, makeEditingData } from '../selectors';

const getEditingData = makeEditingData();

const makeMapStateToProps = () => (state, { componentType }) => {
  const {
    carousel,
    buyNowCarousel,
    departmentId,
    departmentName,
    editable,
    editingComponent,
    hero
  } = state;

  const editingComponentType = editingComponent.editing && editingComponent.editingComponentType.length > 0 ? editingComponent.editingComponentType : componentType;
  return {
    componentType,
    departmentId,
    departmentName,
    displayOrderList: createDisplayOrderList({ carousel }),
    editable,
    ...getEditingData({ carousel, buyNowCarousel, editingComponent, hero }, editingComponentType)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: ({ componentType, departmentId, departmentLotId, deleting, formData }) => {
      /**
       * deleting
          ? `/api/departments/${departmentId}/${componentType}/${departmentLotId}`
          : `/api/departments/${departmentId}/${componentType}/${
            (trim(formData.carouselTitle) !== trim(formData.currentCarouselTitle)
              || !(has('lotNumber')(formData) && has('saleNumber')(formData)))
              ? `?carouselTitle=${formData.carouselTitle}`
              : ''
       */
      let url = `/api/departments/${departmentId}/${componentType}`;
      switch (componentType) {
        case 'buyNowCarousel':
          url = `/api/carousel/carousel`;
          break;
        case 'carouselItem':
          url = `/api/carousel/carouselItem`;
          break;
        default:
          break;
      }
      // if (deleting) {
      //   url += `/${departmentId}`;
      //   // check if carouselTitime changed || does not have both lotNumber and saleNumber
      // } else if (trim(formData.carouselTitle) !== trim(formData.currentCarouselTitle) || !(has('lotNumber')(formData) && has('saleNumber')(formData))) {
      //   url += `?carouselTitle=${formData.carouselTitle}`;
      // }
      // console.log('ur: ', url);
      const payload = {
        componentType: componentType,
        data: {
          ...formData,
          displayOrder: parseInt(formData.displayOrder, 10),
          active: true,
          departmentLotId
        },
        editing: true,
        saving: true,
        saved: false,
        method: departmentLotId === 0 ? deleting ? 'DELETE' : 'PUT' : 'PST',
        noBody: false,
        url
        // noBody
      };
      dispatch(updateComponent(payload));
    },
    handleCancel: (e) => {
      const { value } = e.target;
      dispatch(editComponent(editingState(value)));
    }
  }
};

export default connect(makeMapStateToProps, mapDispatchToProps)(DeptCarouselEditor);
