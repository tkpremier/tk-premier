import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Form from './Models/Form';
import handleResponse from './utils/handleResponse';
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: '100%',
    padding: '60px 30px',
    height: 700
  }
}));
const getImageLink = (link = '', endStr = 's220', split = 's220') => {
  const [base] = link.split(split);
  return `${base}${endStr}`;
};
const GridItem = props => {
  const [formOpen, openForm] = useState(false);
  const [driveIds, setDriveIds] = useState([props.id]);
  const classes = useStyles();
  const handleSubmit = e => {
    const formData = {
      ...serialize(e.target, true),
      driveIds
    };
    e.preventDefault();
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
    <GridListTile cols={2}>
      {props.thumbnailLink !== null ? (
        <img src={getImageLink(props.thumbnailLink, 's550', 's220')} alt={props.title} />
      ) : null}
      <GridListTileBar
        title={<span>{props.name}</span>}
        actionIcon={
          <IconButton
            aria-label={`info about ${props.name}`}
            className={classes.icon}
            onClick={() => {
              openForm(!formOpen);
            }}
          >
            <InfoIcon />
          </IconButton>
        }
      />
      
      {formOpen ? <Form onSubmit={handleSubmit} /> : null}
    </GridListTile>
  );
};

export default GridItem;
