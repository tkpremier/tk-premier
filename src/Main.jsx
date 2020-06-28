/* eslint-disable arrow-parens */
import React, { useState } from 'react';
import CKEditor from 'ckeditor4-react';
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
import handleResponse from './utils/handleResponse';

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
const defaultUser = {
  email: '',
  firstName: '',
  lastName: '',
  password: ''
};
const Main = () => {
  const classes = useStyles();
  const [user, loginUser] = useState(defaultUser);
  const [active, setActive] = useState('signup');
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
    fetch('/api/user', options)
      .then(handleResponse)
      .then(res => console.log('res: ', res))
      .catch(err => console.log('err: ', err));
    // setContent());
  };
  const handleLogin = e => {
    const formData = serialize(e.target, true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formData)
    };
    e.preventDefault();
    fetch('/api/login', options)
      .then(handleResponse)
      .then(res => loginUser(res))
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
            Main
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setActive('login');
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {active === 'login' ? (
        <Paper component="form" onSubmit={handleLogin}>
          <TextField name="email" defaultValue={user.email} label="Email" id="email" />
          <TextField defaultValue={user.password} name="password" label="Password" id="password" type="password" />
          <Button type="submit">Submit</Button>
        </Paper>
      ) : (
        <Paper component="form" onSubmit={handleSubmit}>
          <TextField name="email" defaultValue={user.email} label="Email" id="email" />
          <TextField name="firstName" label="First Name" defaultValue={user.firstName} id="first-name" />
          <TextField defaultValue={user.lastName} name="lastName" label="Last Name" id="last-name" />
          <TextField defaultValue={user.password} name="password" label="Password" id="password" type="password" />
          <CKEditor type="inline" data="<p>HTML this data</p>" />
          <Button type="submit">Submit</Button>
        </Paper>
      )}
    </Container>
  );
};

export default Main;
