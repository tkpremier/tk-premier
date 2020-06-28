import { connect } from 'react-redux';
import { elementSave, elementDelete } from '../../actions/actions';
import EditorForm from './EditorForm';
import getInputList from './utils/getinputlist';

const mapStateToProps = ({ selectedElement, elements, makersList }, { formType, elementType }) => {
  const type = formType === 'delete'
    ? formType
    : elementType;
  const inputData = getInputList(type, makersList)(selectedElement);
  console.log('inputData: ', inputData);
  return { inputData, elementType };
};

const mapDispatchToProps = (dispatch, { formType, elementType }) => {
  return {
    onSubmit: (data) => {
      if (formType === 'delete') {
        dispatch(elementDelete(elementType, data));
      } else {
        dispatch(elementSave(elementType, data));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorForm);
