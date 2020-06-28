import React from 'react';

// Tags List that shows the tags selected
const SelectedTagsList = ({ selectedTags, toggleFilterByTag }) => (
  <section className="filtered-by">
    Filtered By:
    <ul>
      {selectedTags.map((tag) => {
        return (
          <li>
            <button
              onClick={toggleFilterByTag.bind(null, tag)}
            >
              {tag.tagName}
            </button>
          </li>
        );
      })}
    </ul>
  </section>
);

export default SelectedTagsList;
