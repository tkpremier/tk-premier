import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { ALERT_TYPES as alertTypes } from '../constants'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import StickyEditContainer from '../containers/StickyEditContainer';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

// Components
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  container: {
    backgroundColor: 'transparent'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    margin: 15
  },
  icon: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    flexBasis: 1,
    alignSelf: "flex-end",
    '&:hover': {
      color: 'red !important'
    }
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    margin: 15,
    flexBasis: '33.33%'
  },
  activeLabel: {
    fontSize: theme.typography.pxToRem(13),
    margin: 15,
    color: '#82c782',
    borderRadius: 10,
    backgroundColor: '#e5f3e5',
    padding: '0px 10px !important',
  },
  catalogueList: {
    backgroundColor: theme.palette.background.paper,
  },
  sortableItems: {
    marginTop: '15px',
    marginBottom: '15px'
  },
  sortable: {
    marginLeft: '-25px',
    listStyle: 'none'
  },
  addButton: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: theme.spacing.unit * 7,
    right: theme.spacing.unit * 8,
    position: 'fixed'
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  expansionPanelSummary: {
    borderStyle: 'solid',
    icon: {
      visibility: 'hidden'
    },
    '&:hover $icon': {
      visibility: 'visible'
    }
  },
  '@media (max-width: 767px)': {
    secondaryHeading: {
      display: 'none'
    },
    heading: {
      margin: 'auto',
      textAlign: 'center'
    }
  }
})

class StickyManagement extends Component {
  state = {
    dense: false,
    secondary: true
  };

  componentWillMount() {

  }

  componentDidMount() {
    this.props.actions.updateBaseUrl(document.body.dataset.domain)
    if (this.props.selectedSticky.isNew) {
      window.scrollTo(0, 0)
    }
  }

  collapseExpandable = () => {
    // this.props.actions.setSelectedSticky({ open: false, id: -1 });
    this.props.actions.editSticky('open', false)
    this.props.actions.editSticky('isNew', false)
    if (this.props.deleteStickyDialog.open) {
      this.props.actions.cancelDelete();
    }
  }

  displayDeleteDialog = () => {
    this.props.actions.deleteDialog()
  }

  handleExpansionPanelClick = (event, expanded, id) => {
    if (expanded) {
      var model = this.props.stickies.find(a => (a.id === id));
      this.props.actions.setSelectedSticky(model);
    }
    else {
      this.collapseExpandable();
    }
  }
  handleSaveSticky = () => {
    this.props.actions.saveSticky();
  }
  handleDeleteSticky = () => {
    this.props.actions.deleteSticky(this.props.deleteStickyDialog.id);
  };
  handleNewSticky = () => {
    this.props.actions.showNewStickyForm();
  }

  handleStickySortUpdate = (event, ui) => {
    // gets the new and old index then set the current-index as the new index
    var oldIndex = ui.item.data('current-index');
    var newIndex = ui.item.index();
    if (newIndex !== oldIndex) {
      ui.item.data('current-index', newIndex);
      var stickyId = ui.item.data('stickyid')
      console.log('oldindex', oldIndex);
      console.log('newindex', newIndex);
      var model = this.props.stickies.find(a => (a.id === stickyId));
      model.position = newIndex + 1;
      this.props.actions.reorderSticky({ stickyId, position: newIndex + 1 })
    }
  }

  render() {
    const { classes, stickies, selectedSticky, theme, formErrors } = this.props;
    const saving = this.props.alert.type === alertTypes.SAVING_STICKY ||
      this.props.alert.type === alertTypes.DELETING_STICKY ||
      this.props.alert.type === alertTypes.SAVING_STICKY_IMAGE;

    var saveDisabled = saving || formErrors.hasErrors

    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    stickies.map(c => {
      $('#stickies-sort-area').sortable({
        items: 'li',
        update: this.handleStickySortUpdate,
        start: function (e, ui) {
          // creates a temporary attribute on the element with the old index
          ui.item.data('current-index', ui.item.index());
        }
      })
    });

    return (
      <div className={classes.root}>
        <Grid container spacing={24} alignItems="stretch" >
          <Grid item xs={12}>
            <Grid container className={classes.root} spacing={24} alignItems="stretch" >
              <Grid item xs={12}>
                <span>
                  <h1>Sticky Management</h1> Drag and drop to reorder.
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.root} spacing={24} alignItems="stretch" >
              <Grid item xs={12}>
                {saving ? <LinearProgress color="secondary" /> : null}
                <Paper className={classes.paper}>
                  {selectedSticky.isNew ? <ExpansionPanel
                    onChange={(event, expanded) => this.handleExpansionPanelClick(event, expanded, selectedSticky.id)}
                    expanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} />
                    {saving ? <LinearProgress color="secondary" /> : null}
                    <ExpansionPanelDetails>
                      <StickyEditContainer />
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                      <div>
                        <Button size="medium" onClick={() => this.collapseExpandable()}>Cancel</Button>
                        <span className={classes.wrapper}>
                          <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            disabled={saveDisabled}
                            onClick={() => this.handleSaveSticky()}>Save</Button>
                        </span>
                      </div>
                    </ExpansionPanelActions>
                  </ExpansionPanel> : <span></span>}
                  <ul id={'stickies-sort-area'} className={classes.sortable}>
                    {stickies.map((sticky) => (
                      <li data-stickyid={sticky.id} className={classes.sortableItems} key={sticky.id} >
                        <ExpansionPanel
                          key={sticky.id}
                          onChange={(event, expanded) => this.handleExpansionPanelClick(event, expanded, sticky.id)}
                          expanded={sticky.id === selectedSticky.id && selectedSticky.open}>
                          <ExpansionPanelSummary container className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
                            <IconButton
                              onClick={() => this.displayDeleteDialog()}
                              className={classes.icon}
                              aria-label="Delete">
                              <DeleteIcon />
                            </IconButton>
                            <Fragment>
                              <Typography
                                className={classes.heading}
                                style={sticky.id === selectedSticky.id && selectedSticky.open ? { visibility: 'hidden' } : { visibility: 'visible' }}>
                                {sticky.title}
                              </Typography>
                              {sticky.altText ?
                                <Typography
                                  className={classes.secondaryHeading}
                                  style={sticky.id === selectedSticky.id && selectedSticky.open ? { visibility: 'hidden' } : { visibility: 'visible' }}>
                                  {sticky.altText}
                                </Typography> :
                                null}
                              {sticky.isActive ? <Typography
                                className={classes.activeLabel}>
                                Active
                            </Typography> : null}
                            </Fragment>
                          </ExpansionPanelSummary>
                          {saving ? <LinearProgress color="secondary" /> : null}
                          <ExpansionPanelDetails>
                            {sticky.id === selectedSticky.id && selectedSticky.open ?
                              <StickyEditContainer /> :
                              ''}
                          </ExpansionPanelDetails>
                          <ExpansionPanelActions>
                            {!this.props.deleteStickyDialog.open ?
                              <div>
                                <Button size="medium" onClick={() => this.collapseExpandable()}>Cancel</Button>
                                <span className={classes.wrapper}>
                                  <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    disabled={saveDisabled}
                                    onClick={() => this.handleSaveSticky()}>Save</Button>
                                </span>
                              </div> :
                              <div></div>
                            }
                          </ExpansionPanelActions>
                        </ExpansionPanel>
                      </li>
                    ))};
                  </ul>
                  <Dialog
                    open={this.props.deleteStickyDialog.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.collapseExpandable()}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle id="alert-dialog-slide-title">
                      {"Delete Sticky"}
                    </DialogTitle>
                    {saving ? <LinearProgress color="secondary" /> : null}
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this sticky?
                  </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.collapseExpandable()} color="primary">
                        Cancel
                     </Button>
                      <Button onClick={() => this.handleDeleteSticky()} color="primary">
                        Delete
                    </Button>
                    </DialogActions>
                  </Dialog>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Zoom
          in={!selectedSticky.isNew}
          timeout={transitionDuration}
          unmountOnExit
        >
          <Tooltip title="Add New Sticky">
            <Button variant="fab" color="secondary" aria-label="Add" className={classes.addButton} onClick={() => this.handleNewSticky()}>
              <AddIcon />
            </Button>
          </Tooltip>
        </Zoom>
      </div>
    )
  }
}

StickyManagement.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  stickies: PropTypes.array.isRequired,
  selectedSticky: PropTypes.object.isRequired
}


export default withStyles(styles, { withTheme: true })(StickyManagement)