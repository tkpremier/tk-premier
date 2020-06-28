import React from 'react';
import { Typeahead } from 'react-typeahead';

const name = 'name';

const TypeaheadWrapper = props => (
  <div className="typeahead-wrapper">
    <Typeahead
      options={props.options}
      displayOption={props.displayOption}
      valueProp={props.valueProp}
      maxVisible={props.maxVisible}
      inputProps={{ name }}
      value={props.value}
      filterOption={props.filterOption}
      onOptionSelected={props[props.onOptionSelected]}
    />
    <input
      type="hidden"
      name={props.hiddenName}
      value={props.hiddenValue}
    />
  </div>
);

export default TypeaheadWrapper;
