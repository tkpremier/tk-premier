import React, { Fragment, forwardRef } from 'react';
import {
  ImageInput,
  RadioInput,
  SelectInput,
  CheckboxInput,
  AutoCompleteInput
} from '../../../components/forminputs/forminputs';
import ReactCkeditor from '../../../components/reactckeditor';

// todo: convert this switch to an object literal
const createInput = (input, ref = null) => {

  switch (input.type) {
    case 'delete': {
      return (
        <div key={Math.random() * 100}>
          <p>Are you sure you want to delete {input.elType} {input.propValue}?</p>
          <input
            ref={ref}
            type="hidden"
            value={input.propValue}
            name={input.propName}
            disabled
          />
        </div>
      );
    }
    case 'json': {
      return (
        <div className="hidden" key={Math.random() * 100}>
          <input
            ref={ref}
            className="hidden"
            type="text"
            name={input.propName}
            value={input.propValue}
            disabled
          />
        </div>
      );
    }
    case 'hidden': {
      return (
        <div key={Math.random() * 100}>
          <input
            ref={ref}
            name={input.propName}
            type={input.type}
            value={input.propValue}
            disabled
          />
        </div>
      );
    }
    case 'select': {
      return (
        <div className="select-input" key={Math.random() * 100}>
          <label htmlFor={input.propName}>
            {`${input.label || input.propName}:`}
          </label>
          <select
            name={input.propName}
            defaultValue={input.propValue}
            ref={ref}
            id={input.propName}>
            <option value="" key="0">Please choose</option>
            {input.list.map(opt => (
              <option
                key={opt.value}
                value={opt.value}
              >
                {opt.desc}
              </option>
            ))}
          </select>
        </div>
      );
    }
    case 'markup': {
      return (
        <div className="medium-wrapper" key={Math.random() * 100}>
          <label htmlFor={input.propName}>
            {input.label || input.propName}
            :
          </label>
          <ReactCkeditor
            name={input.propName}
            data={input}
            ref={ref}
          />
        </div>
      );
    }
    case 'radio': {
      return (
        <RadioInput
          {...input}
          ref={ref}
          key={Math.random() * 100}
          name={input.propName}
        />
      );
    }
    case 'checkbox': {
      return (
        <div key={Math.random() * 100}>
          <label htmlFor={input.propName}>
            {input.label || input.propName}
            :
          </label>
          <CheckboxInput name={input.propName} />
        </div>
      );
    }
    case 'ImageInput': {
      return (
        <ImageInput
          {...input}
          ref={ref}
          key={Math.random() * 100}
          name={input.propName}
        />
      );
    }
    case 'AutoComplete': {
      return (
        <AutoCompleteInput
          ref={ref}
          initialValue={input.propValue}
          key={Math.random() * 100}
          name={input.propName}
          {...input}
        />
      );
    }
    // case 'email':
    // case 'address':
    default: {
      return (
        <div key={Math.random() * 100}>
          <label htmlFor={input.propName}>
            {`${input.label || input.propName}:`}
          </label>
          <input
            ref={ref}
            readOnly={input.readOnly || false}
            disabled={input.disabled || false}
            type={input.type}
            defaultValue={input.propValue}
            name={input.propName}
          />
        </div>
      );
    }
  }
};

export const InputCreator = forwardRef(({children, input, onSubmit, elementType}, ref) => {
  return createInput(input, ref);
});

export default createInput;
