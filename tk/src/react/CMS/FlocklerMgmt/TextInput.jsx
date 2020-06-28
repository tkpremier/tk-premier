import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: '8px',
    marginRight: '8px'
  }
})
const TextInput = ({
  classes,
  fullWidth,
  id,
  label,
  rowsMax,
  multiLine,
  name,
  onChange,
  readOnly,
  value,
  ...props
}) => {
  const [val, setVal] = useState(value);
  const [defaultValue, setDef] = useState(value);
  const handleChange = (e) => {
    setVal(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };
  useEffect(() => {
    if (value !== defaultValue) {
      setDef(value);
      setVal(value);
    }
  }, [value, defaultValue]);
  return (
    <TextField
      className={classes.textField}
      fullWidth={fullWidth}
      InputProps={{
        readOnly
      }}
      id={id}
      label={label}
      margin="none"
      multiline={multiLine}
      name={name}
      onChange={handleChange}
      rowsMax={rowsMax}
      value={val}
      {...props}
    />
  )
};

TextInput.defaultProps = {
  fullWidth: false,
  id: '',
  rowsMax: '4',
  multiLine: false,
  name: '',
  readOnly: false,
  label: '',
  onChange: null,
  type: 'text',
  value: ''
};

TextInput.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  multiLine: PropTypes.bool,
  rowsMax: PropTypes.string,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default withStyles(styles)(TextInput);
