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
import MakerBiosTableContainer from '../containers/MakerBiosTableContainer';
import MakerBioDetailsContainer from '../containers/MakerBioDetailsContainer';

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

class MakerBios extends Component {
  state = {}

  componentWillMount() {
    const userAccess = JSON.parse(localStorage.getItem('userAccess'));
    this.setState({ userAccess: userAccess });

    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  componentDidMount() {
    this.props.actions.makerBiosRequested();
  }

  render() {
    // console.log('Maker bios render() with props: ', this.props)
    const { classes } = this.props;
    const { makerBios } = this.props.state.makerBios;

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
                        <h3>Maker Bios</h3>
                      </Grid>
                      <Grid item xs={6}>
                        &nbsp;
                      </Grid>
                    </Grid>
                    <div>{makerBios.length > 0
                      ? <MakerBiosTableContainer />
                      : <CircularProgress className={classes.progress} style={{ color: '#000' }} thickness={7} />}
                    </div>
                  </Paper>
                </Slide>
              </Grid>
            </Grid>
            <Grid item sm={12} md={8}>
              <Paper className={classes.paper}>
                <MakerBioDetailsContainer />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
    )
  }
}

MakerBios.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    makerBiosRequested: PropTypes.func.isRequired,
  }).isRequired
};

export default withStyles(styles)(MakerBios);
