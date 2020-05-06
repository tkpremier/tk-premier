import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import serialize from 'form-serialize';
import handleResponse from '../utils/handleResponse';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const ModelRoot = ({ models = [] }) => {
  const classes = useStyles();
  console.log('models: ', models);
  const handleSubmit = e => {
    const formData = serialize(e.target, true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formData)
    };
    e.preventDefault();
    fetch('/api/model', options)
      .then(handleResponse)
      .then(res => console.log('res: ', res))
      .catch(err => console.log('err: ', err));
    // setContent());
  };
  return (
    <Container className={classes.root} maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Model
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper component="form" onSubmit={handleSubmit}>
        <TextField name="modelName" label="name" id="model-name" />
        <TextField name="platform" label="Platform" id="platform" />
        <Button type="submit">Submit</Button>
      </Paper>
    </Container>
  );
};

export default ModelRoot;
