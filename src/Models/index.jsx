import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Form from './Form';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '600px'
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
      <ul>
        {models.map(model => {
          console.log('model: ', model);
          return (
            <li>
              <span>{model.platform}</span>
              <p>{model.name}</p>
            </li>
          );
        })}
      </ul>
      <Form />
    </Container>
  );
};

export default ModelRoot;
