import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  BrowserRouter as Router
} from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LinearProgress from '@material-ui/core/LinearProgress';


// Components
import AuctionDetailsContainer from '../containers/AuctionDetailsContainer';
import AuctionsTableContainer from '../containers/AuctionsTableContainer';
import ControlPanelContainer from '../containers/ControlPanelContainer';
import LotManagementContainer from '../containers/LotManagementContainer';
import LotsTableContainer from '../containers/LotsTableContainer';
// import RelevantAuctions from './RelevantAuctions';

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

class AuctionManagement extends Component {
  state = {
    auctionsChecked: true,
    lotsChecked: false,
    userAccess: 1
  }

  componentWillMount() {
    const userAccess = JSON.parse(localStorage.getItem('userAccess'));
    this.setState({ userAccess: userAccess });

    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  componentDidMount() {
    this.props.actions.auctionsRequested();
    this.props.actions.tagsGetSubmit();
  }

  handleTableHide = () => {
    this.setState(state => ({
      auctionsChecked: !state.auctionsChecked,
      lotsChecked: !state.lotsChecked
    }));
  }

  render() {
    console.log('Auction Management render() with props: ', this.props);
    const { classes } = this.props;
    const {
      auctionsChecked,
      lotsChecked,
      userAccess
    } = this.state;
    const {
      auctions,
      lots,
      noLots,
      selectedAuction,
      selectedLot,
      auctionMobility
    } = this.props.state;
    const {
      auctionSelected,
      saleNumber
    } = selectedAuction;
    const { auctionManagementProgress } = auctionMobility;

    return (
      <Router>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid container item sm={12} md={4} spacing={8}>
              <Grid item xs={12}>
                {auctionManagementProgress
                  ? (
                      <Paper className={classes.paper}>
                        <p>Updating Auction Mobility Sale</p>
                        <LinearProgress style={{ marginTop: '40px' }} />
                      </Paper>
                    )
                  : null
                }
              </Grid>
              <Grid item xs={12}>
                <Slide direction="right" in={auctionsChecked} mountOnEnter unmountOnExit>
                  <Paper className={classes.paper} elevation={4}>
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <h3>Auctions</h3>
                      </Grid>
                      <Grid item xs={6}>
                        {auctionSelected && userAccess !== 3
                          ? (
                            <IconButton onClick={this.handleTableHide}>
                              Lots
                              <ChevronRightIcon />
                            </IconButton>
                          )
                          : null}
                      </Grid>
                    </Grid>
                    {

                    }
                    <div>
                      {
                        auctions.length > 0
                          ? <AuctionsTableContainer />
                          : <LinearProgress style={{ marginTop: '40px' }} />
                      }
                    </div>
                  </Paper>
                </Slide>
              </Grid>
              <Grid item xs={12}>
                <Slide direction="right" in={lotsChecked} mountOnEnter unmountOnExit>
                  <Paper className={classes.paper} elevation={4}>
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <IconButton onClick={this.handleTableHide}>
                          <ChevronLeftIcon />
                          Auctions
                        </IconButton>
                      </Grid>
                      <Grid item xs={6}>
                        <h3>
                          Lots -
                          {saleNumber}
                        </h3>
                      </Grid>
                    </Grid>
                    <div>
                      {lots.length > 0
                        ? <LotsTableContainer />
                        : noLots
                          ? <h4>This Auction contains no lots</h4>
                          : <LinearProgress style={{ marginTop: '40px' }} />
                      }
                    </div>
                  </Paper>
                </Slide>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ControlPanelContainer />
                </Paper>
              </Grid>
            </Grid>
            <Grid item sm={12} md={8}>
              <Paper className={classes.paper}>
                {/* {this.props.state.auctions.length > 0
                <RelevantAuctions /> */}
                {selectedLot.lotSelected
                  ? <LotManagementContainer />
                  : (
                    <AuctionDetailsContainer
                      associatedAuctions={auctions.map(a => a.saleNumber)}
                    />
                  )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

AuctionManagement.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    paper: PropTypes.string,
    root: PropTypes.string
  }).isRequired
  // actions: PropTypes.shape({
  //   auctionsRequested: PropTypes.func.isRequired,
  //   updateBaseUrl: PropTypes.func.isRequired,
  //   tagsGetSubmit: PropTypes.func.isRequired
  // }).isRequired,
  // state: PropTypes.shape({
  //   auctions: PropTypes.objectOf(PropTypes.object).isRequired,
  //   lots: PropTypes.objectOf(PropTypes.object).isRequired,
  //   noLots: PropTypes.bool.isRequired,
  //   selectedAuction: PropTypes.objectOf(PropTypes.object).isRequired,
  //   selectedLot: PropTypes.objectOf(PropTypes.object).isRequired
  // }).isRequired
};

export default withStyles(styles)(AuctionManagement);
