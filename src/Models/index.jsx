import React, { createContext, useEffect, useState } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Form from './Form';
import handleResponse from '../utils/handleResponse';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '600px'
  },
  modelsList: {
    listStyle: 'none',
    padding: '16px 8px'
  },
  modelsListItem: {
    display: 'flex',
    flexFlow: 'column'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export const ModelContext = createContext({
  models: []
});

const ModelRoot = ({ models = [] }) => {
  const classes = useStyles();
  const [list, updateList] = useState(models);
  const handleSubmit = formData => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formData)
    };
    fetch('/api/model', options)
      .then(handleResponse)
      .then(res => console.log('res: ', res))
      .catch(err => console.log('err: ', err));
  };
  return (
    <ModelContext.Provider value={{ models }}>
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
        <Paper component="ul" className={classes.modelsList}>
          {list.map(model => {
            console.log('model: ', model);
            return (
              <Card component="li" className={classes.modelsListItem} key={`models-${model.id}`}>
                <span>{model.platform}</span>
                <p>{model.name}</p>
                {/* <p>
                  {model.driveIds.map(dId => (
                    <span>{dId}</span>
                  ))}
                </p> */}
              </Card>
            );
          })}
        </Paper>
        <Form onSubmit={handleSubmit} />
      </Container>
    </ModelContext.Provider>
  );
};

export default ModelRoot;
