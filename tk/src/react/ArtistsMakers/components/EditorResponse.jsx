import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const EditorResponse = (props) => {
  const responseClass = classNames({
    'spinner': props.status === 'pending',
    'success': props.status === 'success',
    'error': props.status === 'error'
  });

  return (
    <span className={responseClass}>{props.msg}</span>
  );
};

EditorResponse.defaultProps = {
  msg: ''
};

EditorResponse.propTypes = {
  status: PropTypes.string.isRequired,
  msg: PropTypes.string
};

export default EditorResponse;
