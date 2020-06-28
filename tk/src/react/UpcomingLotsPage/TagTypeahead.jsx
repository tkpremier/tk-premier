import React from 'react';
import { Typeahead } from 'react-typeahead';

let typeAheadRef = null;

// Typeahead feature to search, and add tags
const TagsTypeahead = ({ tags, toggleFilterByTag }) => (
  <section className="typeahead-wrapper">
    <Typeahead
      displayOption="tagName"
      filterOption="tagName"
      maxVisible={10}
      onOptionSelected={toggleFilterByTag}
      onBlur={() => typeAheadRef.setState({ showResults: false })}
      options={tags}
      placeholder="Search Tags"
      ref={el => typeAheadRef = el}
    />
  </section>
);

export default TagsTypeahead;
