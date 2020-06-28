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
import TeamMembersTableContainer from '../containers/TeamMembersTableContainer';
import TeamMemberDetailsContainer from '../containers/TeamMemberDetailsContainer';

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

class TeamPage extends Component {
  state = {}

  componentWillMount() {
    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  componentDidMount() {
    this.props.actions.teamMembersRequested();
  }

  render() {
    // console.log('Team page render() with props: ', this.props);
    const { classes } = this.props;
    const { teamMembers } = this.props.state.teamPage;

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
                        <h3>Team Members</h3>
                      </Grid>
                      <Grid item xs={6}>
                        &nbsp;
                      </Grid>
                    </Grid>
                    <div>
                      {teamMembers.length > 0
                        ? <TeamMembersTableContainer />
                        : <CircularProgress className={classes.progress} style={{ color: '#000' }} thickness={7} />
                      }
                    </div>
                  </Paper>
                </Slide>
              </Grid>
            </Grid>
            <Grid item sm={12} md={8}>
              <Paper className={classes.paper}>
                <TeamMemberDetailsContainer />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

TeamPage.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    teamMembersRequested: PropTypes.func.isRequired,
  }).isRequired
};

export default withStyles(styles)(TeamPage);
