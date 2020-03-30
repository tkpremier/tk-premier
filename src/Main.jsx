/* eslint-disable arrow-parens */
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

const Main = () => {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setContent(JSON.stringify(serialize(e.target, true)));
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {content.length > 0 ? <p>{content}</p> : null}
      <Paper component="form" onSubmit={handleSubmit}>
        <TextField name="email" label="Email" id="email" />
        <TextField name="firstName" label="First Name" id="first-name" />
        <TextField name="lastName" label="Last Name" id="last-name" />
        <TextField name="password" label="Password" id="password" type="password" />
        <Button type="submit">Submit</Button>
      </Paper>
    </Container>
  );
};

export default Main;
