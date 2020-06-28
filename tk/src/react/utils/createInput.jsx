import {
  ImageInput,
  RadioInput,
  SelectInput,
  CheckboxInput,
  AutoCompleteInput
} from '../components/forminputs/forminputs';
import PhillipsCarousel from '../PhillipsCarousel/PhillipsCarousel';
import PhillipsLot from '../PhillipsLot/PhillipsLot';
import ReactCkeditor from '../components/reactckeditor';

// todo: convert this switch to an object literal
const createInput = (input) => {
  let el = null;
  switch (input.type) {
    case 'delete': {
      el = (
        <div key={Math.random() * 100}>
          <p>Are you sure you want to delete {input.elType} {input.propValue}?</p>
          <input
            type="hidden"
            value={input.propValue}
            ref={input.propName}
            disabled
          />
        </div>
      );
      break;
    }
    case 'json': {
      el = (
        <div className="hidden" key={Math.random() * 100}>
          <input
            className="hidden"
            type="text"
            value={input.propValue}
            ref={input.propName}
            disabled
          />
        </div>
      );
      break;
    }
    case 'hidden': {
      el = (
        <div key={Math.random() * 100}>
          <input
            type={input.type}
            value={input.propValue}
            ref={input.propName}
            disabled
          />
        </div>
      );
      break;
    }
    case 'select': {
      el = (
        <div className="select-input" key={Math.random() * 100}>
          <label>{input.label || input.propName}:</label>
          <SelectInput
            list={input.list}
            defaultValue={input.propValue}
            ref={input.propName}
          />
        </div>
      );
      break;
    }
    case 'markup': {
      el = (
        <div className="medium-wrapper" key={Math.random() * 100}>
          <label>{input.label || input.propName}:</label>
          <ReactCkeditor
            data={input}
            ref={input.propName}
          />
        </div>
      );
      break;
    }
    case 'radio': {
      el = (
        <RadioInput {...input} ref={input.propName} />
      );
      break;
    }
    case 'checkbox': {
      el = (
        <div key={Math.random() * 100}>
          <label>{input.label || input.propName}:</label>
          <CheckboxInput ref={input.propName} />
        </div>
      );
      break;
    }
    case 'ImageInput': {
      el = <ImageInput {...input} ref={input.propName} key={Math.random() * 100} />;
      break;
    }
    case 'AutoComplete': {
      el = (
        <AutoCompleteInput
          initialValue={input.propValue}
          ref={input.propName}
          {...input}
        />
      );
      break;
    }
    // case 'email':
    // case 'address':
    default: {
      el = (
        <div key={Math.random() * 100}>
          <label>{input.label || input.propName}:</label>
          <input
            readOnly={input.readOnly || false}
            disabled={input.disabled || false}
            type={input.type}
            defaultValue={input.propValue}
            ref={input.propName}
          />
        </div>
      );
    }
  }
  return el;
};

export default createInput;
