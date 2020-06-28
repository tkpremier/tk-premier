import React, { useCallback, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import has from 'lodash/has';
import { elementSave, elementDelete } from '../../actions/actions';
import getInputList from './utils/getinputlist';
import { InputCreator } from './utils/createInput';

const EditorFormHooks = ({ formType, elementType }) => {
  const type = formType === 'delete'
    ? 'delete'
    : elementType;
  const inputRefs = [];
  const { makersList, selectedElement } = useSelector(state => state);
  const inputData = getInputList(type, makersList)(selectedElement);
  // const inputData = useSelector(state => getInputList(type, state.makersList)(state.selectedElement));
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = inputRefs.reduce((o, { name, ref }) => {
        o[name] = has(ref.current, 'getValue') ? ref.current.getValue() : ref.current.value;
        return o;
      }, {});
      if (formType === 'delete') {
        dispatch(elementDelete(elementType, data));
      } else {
        dispatch(elementSave(elementType, data));
      }
    },
    [dispatch, inputRefs, formType, elementType]
  );
  return (
    <form onSubmit={onSubmit} className={elementType}>
      {inputData.map((data) => {
        const ref = createRef();
        inputRefs.push({ 'name': data.propName, 'ref': ref });
        return (
          <InputCreator
            ref={ref}
            input={data}
          />
        );
      })}
      <input type="submit" />
    </form>
  );
};
// <form onSubmit={onSubmit} className={elementType}>
//   {inputData.map((data) => {
//     const ref = createRef();

//     const Input = createInput(data, ref);
//     console.log('Input: ', Input);
//     inputRefs.push(ref);
//     return Input;
//   })}
//   <input type="submit" />
// </form>

// class EditorForm extends Component {

//   shouldComponentUpdate(nextProps) {
//     const findId = find(data => data.propName === 'id');
//     const currentId = parseInt(findId(this.props.inputData).propValue, 10);
//     const nextId = parseInt(findId(nextProps.inputData).propValue, 10);
//     return currentId !== nextId;
//   }

//   render() {
//     const { inputData, elementType, onSubmit } = this.props;
//     const formInputs = inputData.map(data => createInput(data));
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       const data = mapValues((ref) => {
//         let newValue;
//         if (isElement(ref)) {
//           newValue = ref.value;
//         } else {
//           newValue = ref.getValue();
//         }
//         return newValue;
//       })(this.refs);
//       onSubmit(data);
//     };
//     return (
//       <form onSubmit={handleSubmit} className={elementType}>
//         <input type="submit" />
//       </form>
//     );
//   }
// }

// EditorForm.propTypes = {
//   elementType: PropTypes.string.isRequired,
//   inputData: PropTypes.array.isRequired,
//   onSubmit: PropTypes.func.isRequired
// };

export default EditorFormHooks;
