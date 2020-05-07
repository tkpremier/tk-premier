import React, { useState } from 'react';
import serialize from 'form-serialize';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import handleResponse from '../utils/handleResponse';

const Form = () => {
  const [driveIds, setDriveIds] = useState([]);
  const handleAddDriveId = e => {
    e.preventDefault();
    const { driveId } = serialize(e.target, true);
    driveIds.push(driveId);
    setDriveIds([...driveIds]);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const formData = serialize(e.target, true);
    console.log('formData handleSubmit: ', formData);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ...serialize(e.target, true),
        driveIds
      })
    };
    fetch('/api/model', options)
      .then(handleResponse)
      .then(res => console.log('res: ', res))
      .catch(err => console.log('err: ', err));
    // setContent());
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

export default Form;
