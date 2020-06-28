import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import EditorModal from './EditorModal';
import { unselectElement } from '../actions';

const Editor = ({ children }) => {
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();
  // callBack version
  const onHide = useCallback(
    () => dispatch(unselectElement()),
    [dispatch]
  );
  return (
    <div className="editor">
      {children}
      <EditorModal onHide={onHide} {...modal} />
    </div>
  );
};

Editor.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  modal: PropTypes.shape(PropTypes.object).isRequired,
  unselectElement: PropTypes.func.isRequired
};

export default Editor;
