import React from 'react';
import PropTypes from 'prop-types';

const HighItemEditor = props => (
  <div className="item-editor" id={`item-${props.key}`}>
    {props.children}
    <div className="hover-dash">
      <button
        className="edit"
        value="PUT"
        onClick={props.handleEdit}
        type="button"
      >
        Edit
      </button>
      <button
        className="delete"
        value="DELETE"
        onClick={props.handleEdit}
        type="button"
      >
        Delete
      </button>
    </div>
  </div>
);

HighItemEditor.propTypes = {
  children: PropTypes.element.isRequired,
  handleEdit: PropTypes.func.isRequired
};

export default HighItemEditor;
