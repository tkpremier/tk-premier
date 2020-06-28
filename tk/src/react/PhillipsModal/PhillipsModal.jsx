import React from 'react';
import { useDispatch } from 'react-redux';
import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { hideModal } from './actions';

const PhillipsModal = (props) => {
  const dispatch = useDispatch();
  const handleClose = isNull(props.hideModal) ? () => { dispatch(hideModal()) } : props.hideModal;
  return (
    <div className={classNames('phillips-modal', ...props.customClasses)}>
      <div className="modal-overlay" onClick={handleClose} role="button" />
      <div className="modal">
        <div className="close" onClick={handleClose} />
        <div className="modal-content">
          {props.children}
        </div>
      </div>
    </div>
  )
};

PhillipsModal.defaultProps = {
  customClasses: [],
  hideModal: null
};

PhillipsModal.propTypes = {
  hideModal: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  customClasses: PropTypes.arrayOf(PropTypes.string)
};

export default PhillipsModal;
