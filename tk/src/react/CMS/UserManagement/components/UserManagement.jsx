import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  BrowserRouter as Router
} from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

// Containers
import UserManagementTableContainer from '../containers/UserManagementTableContainer';
import UserManagementDetailsContainer from '../containers/UserManagementDetailsContainer';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  container: {
    backgroundColor: 'transparent'
  }
});

class UserManagement extends Component {
  state = {}

  componentWillMount() {
    const baseUrl = document.body.dataset.domain;
    const apiUrl = localStorage.getItem('apiDomainUrl');

    this.props.actions.updateBaseUrl(baseUrl);
    this.props.actions.updateApiUrl(apiUrl);

    this.props.actions.getCountriesRequested();
    this.props.actions.getStatesRequested();
  }

  componentDidMount() {
    this.props.actions.bidsLoginSubmit();
  }

  render() {
    // console.log('User management render() with props: ', this.props);
    const { classes } = this.props;
    const { users } = this.props.state.users;

    return (
      <Router>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid container item sm={12} md={4} spacing={8}>
              <Grid item xs={12}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                  <Paper className={classes.paper} elevation={4}>
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <h3>User Management</h3>
                      </Grid>
                      <Grid item xs={6}>
                        &nbsp;
                      </Grid>
                    </Grid>
                    <div>
                      {users.length > 0
                        ? <UserManagementTableContainer />
                        : <CircularProgress className={classes.progress} style={{ color: '#000' }} thickness={7} />
                      }
                    </div>
                  </Paper>
                </Slide>
              </Grid>
            </Grid>
            <Grid item sm={12} md={8}>
              <Paper className={classes.paper}>
                <UserManagementDetailsContainer />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

UserManagement.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    bidsLoginSubmit: PropTypes.func.isRequired,
    updateApiUrl: PropTypes.func.isRequired,
    getCountriesRequested: PropTypes.func.isRequired,
    getStatesRequested: PropTypes.func.isRequired,
    updateBaseUrl: PropTypes.func.isRequired
  }).isRequired
};

export default withStyles(styles)(UserManagement);
