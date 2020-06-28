import { connect } from 'react-redux';
import isUndefined from 'lodash/fp/isUndefined';
import serialize from 'form-serialize';
import HeroEditor from './HeroEditor';
import { editComponent, updateComponent } from '../actions';
import { makeEditingData } from '../selectors';
import { editingState } from '../setInitialState';
import loadImageFromFile from '../../utils/loadImageFromFile';


const makeMapStateToProps = () => {
  const getEditingData = makeEditingData();
  return ({
    carousel, departmentId, editingComponent, hero
  }, { componentType = 'hero' }) => {
    return {
      componentType,
      editingComponentType: editingComponent.componentType,
      departmentId,
      ...getEditingData({ carousel, departmentId, editingComponent, hero }, componentType)
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  // TODO: wire in Dept ID
  let payload = {
    componentType: 'hero',
    editing: true,
    saving: true,
    saved: false,
    method: 'POST',
    url: ''
    // noBody
  };
  return {
    handleSubmit(e, ckEditor, imageInput, imagePath, departmentId) {
      // e.persist();
      e.preventDefault();
      let formData = serialize(e.target, { hash: true });
      formData = { ...formData, description: ckEditor.getValue() };
      if (imageInput.files.length > 0) {
        const images = {
          imageType: 'DepartmentHero',
          files: imageInput.files
        };
        formData = { ...formData, images };
      } else {
        formData.imagePath = imagePath;
      }
      payload.url = `/api/departments/${departmentId}/hero`;
      payload.saving = true;
      payload.data = formData;
      dispatch(updateComponent({ ...payload, departmentId: departmentId }));
    },
    handleEdit: (e, departmentId) => {
      e.preventDefault();
      if (e.target.value === 'cancel') {
        // TODO: wire in deptId
        return dispatch(editComponent(editingState(departmentId)));
      }
      if (!isUndefined(e.target.files)) {
        const dispatchEdit = (src) => {
          payload = {
            ...payload,
            data: {
              imagePath: src.target.result
            },
            saving: false
          };
          return dispatch(editComponent(payload));
        };
        loadImageFromFile(e.target.files[0], dispatchEdit);
      } else {
        return dispatch(editComponent({ ...payload, saving: false }));
      }
    }
  };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(HeroEditor);
