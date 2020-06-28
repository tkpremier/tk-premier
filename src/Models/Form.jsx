import React, { useState } from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Form = props => {
  const [driveIds, setDriveIds] = useState(props.initialIds);
  const handleAddDriveId = e => {
    e.preventDefault();
    const { driveId } = serialize(e.target, true);
    driveIds.push(driveId);
    setDriveIds([...driveIds]);
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({
      ...serialize(e.target, true),
      driveIds
    });
  };
  return (
    <div>
      <Paper component="form" onSubmit={handleSubmit}>
        <TextField name="modelName" label="name" id="model-name" />
        <TextField name="platform" label="Platform" id="platform" />
        <Button type="submit">Submit</Button>
      </Paper>
      <Paper component="form" onSubmit={handleAddDriveId}>
        <TextField name="driveId" label="Drive Id" id="drive-ids" fullWidth />
        <Button type="submit">Add Drive Id</Button>
      </Paper>
    </div>
  );
};
Form.defaultProps = {
  initialIds: []
};

Form.propTypes = {
  initialIds: PropTypes.arrayOf(PropTypes.string)
};
export default Form;
