import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNull } from 'lodash/fp';

const PureCheckbox = ({ arg, id, isChecked, label, disabled, onChange }) => (
  <div
    className="phillips-box"
  >
    <input
      id={id}
      name={id}
      className="hidden phillips-box__hidden"
      type="checkbox"
      checked={isChecked}
      disabled={disabled}
      onChange={isNull(onChange) ? null : onChange.bind(null, arg)}
      value="on"
    />
    <label
      className={classNames('phillips-box__check-box', { 'phillips-box__check-box--disabled': disabled })}
      htmlFor={id}
    />
    <label
      className={classNames('phillips-box__label',
        {
          'phillips-box__label--disabled': disabled,
          'phillips-box__label--active': isChecked
        }
      )}
      htmlFor={id}>
      {label}
    </label>
  </div>
);

PureCheckbox.defaultProps = {
  arg: null,
  disabled: false,
  isChecked: false,
  onChange: null
};

PureCheckbox.propTypes = {
  arg: PropTypes.shape({}),
  disabled: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isChecked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default PureCheckbox;
