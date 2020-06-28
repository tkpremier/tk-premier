import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {}
});
const SelectInput = ({
  fullWidth,
  id,
  label,
  margin,
  name,
  options,
  readOnly,
  value
}) => {
  const [val, setVal] = useState(value);
  const [defaultValue, setDef] = useState(value);
  const handleChange = e => setVal(e.target.value);
  useEffect(() => {
    if (value !== defaultValue) {
      setDef(value);
      setVal(value);
    }
  }, [value, defaultValue]);
  return (
    <TextField
      fullWidth={fullWidth}
      InputProps={{
        readOnly
      }}
      select
      id={id}
      label={label}
      margin={margin}
      name={name}
      onChange={handleChange}
      value={val}
    >
      {options.map(item => (
        <MenuItem key={`${name}-${item.label}-${item.value}`} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  )
};

SelectInput.defaultProps = {
  fullWidth: false,
  id: '',
  margin: 'normal',
  name: '',
  readOnly: false,
  label: '',
  value: ''
};

SelectInput.propTypes = {
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) })).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default withStyles(styles)(SelectInput);
