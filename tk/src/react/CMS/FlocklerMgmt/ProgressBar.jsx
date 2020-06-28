import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1
  },
  colorPrimary: {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  bar1Indeterminate: {
    backgroundColor: '#f2f2f2'
  },
  bar2Indeterminate: {
    backgroundColor: '#000'
  }
};

function LinearIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress
        classes={classes}
      />
    </div>
  );
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(LinearIndeterminate);
