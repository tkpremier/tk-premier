import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { find } from 'lodash';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LinearProgress from '@material-ui/core/LinearProgress';

// Containers
import AuctionsTableContainer from '../containers/AuctionsTableContainer';
import AuctionLotsTableContainer from '../containers/AuctionLotsTableContainer';
import LotComponentsMenuContainer from '../containers/LotComponentsMenuContainer';
import LotComponentsDetailsContainer from '../containers/LotComponentsDetailsContainer';

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

class LotComponents extends Component {
  state = {
    auctionsChecked: true,
    lotsChecked: false
  }

  componentWillMount() {
    const userAccess = JSON.parse(localStorage.getItem('userAccess'));
    this.setState({ userAccess: userAccess });

    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  componentDidMount() {
    this.props.actions.auctionsRequested();
  }

  handleSelectLotComponent = (lotComponents, lotComponentId) => {
    const selectedLotComponent = lotComponents.find(h => h.componentContainerId === lotComponentId);
    return (selectedLotComponent);
  }

  handleLotComponentsSortUpdate = (event) => {
    const { lotComponents, selectedLotComponent } = this.props.state.lotComponents;
    const movingLotComponentId = selectedLotComponent.componentContainerId;
    const newItems = lotComponents;
    const $node = $('#lot-components-drag-drop-area');
    const ids = $node.sortable('toArray', { attribute: 'data-lotcomponentid' }).filter(c => c !== '');

    // console.log('******* reordering: ');
    // console.log('**** selectedLotComponent: ', selectedLotComponent);
    // console.log('**** lotComponents: ', lotComponents);
    // console.log('**** movingComponentDataId: ', movingLotComponentId);
    // console.log('**** newItems: ', newItems);
    // console.log('**** $node: ', $node);
    // console.log('**** ids: ', ids);
    // console.log('**** event', event);

    ids.forEach((lotComponentId, index) => {
      const item = find(newItems, (obj) => obj.componentContainerId === parseInt(lotComponentId));
      item.displayOrder = index + 1;
    });

    // Lets React reorder the DOM
    $node.sortable('cancel');
    this.props.actions.editLotComponentList(newItems);
    this.props.actions.setSelectedLotComponent(
      this.handleSelectLotComponent(newItems, movingLotComponentId)
    );
    this.props.actions.lotComponentUpdateSubmit();
  }

  handleTableHide = () => {
    this.setState(state => ({
      auctionsChecked: !state.auctionsChecked,
      lotsChecked: !state.lotsChecked
    }));
  }

  // Demo sale: UK030120
  // Adding sale: NY080119
  // Another: UK010120

  render() {
    // console.log('LotComponents render() with props: ', this.props);
    const { classes } = this.props;
    const {
      auctionsChecked,
      lotsChecked
    } = this.state;
    const { lotComponents } = this.props.state;
    const {
      auctions,
      lots,
      noLots,
      selectedAuction
    } = lotComponents;
    const {
      auctionSelected,
      saleNumber
    } = selectedAuction;

    $('#lot-components-drag-drop-area').sortable({
      update: this.handleLotComponentsSortUpdate
    });

    return (
      <Router>
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={24}
          >
            <Grid container item sm={12} md={4} spacing={8}>
              <Grid item xs={12}>
                <Slide direction="right" in={auctionsChecked} mountOnEnter unmountOnExit>
                  <Paper className={classes.paper} elevation={4}>
                    <Grid container spacing={8}>
                      <Grid item xs={6}>
                        <h3>Auctions</h3>
                      </Grid>
                      <Grid item xs={6}>
                        {auctionSelected
                          ? (
                            <IconButton onClick={this.handleTableHide}>
                              Lots
                              <ChevronRightIcon />
                            </IconButton>
                          )
                          : null}
                      </Grid>
                    </Grid>
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
                        ? <AuctionLotsTableContainer />
                        : noLots
                          ? <h4>This Auction contains no lots</h4>
                          : <LinearProgress style={{ marginTop: '40px' }} />
                      }
                    </div>
                  </Paper>
                </Slide>
              </Grid>
            </Grid>
            <Grid container item sm={12} md={8} spacing={8}>
              <Grid item sm={12} style={{ marginBottom: '20px' }}>
                <Paper className={classes.paper} elevation={4}>
                  <LotComponentsMenuContainer />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper className={classes.paper} elevation={4}>
                  <LotComponentsDetailsContainer />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

LotComponents.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    auctionsRequested: PropTypes.func.isRequired,
    editLotComponentList: PropTypes.func.isRequired,
    lotComponentsRequested: PropTypes.func.isRequired,
    lotComponentUpdateSubmit: PropTypes.func.isRequired,
    setSelectedLotComponent: PropTypes.func.isRequired,
    updateBaseUrl: PropTypes.func.isRequired
  }).isRequired
};

export default withStyles(styles)(LotComponents);
