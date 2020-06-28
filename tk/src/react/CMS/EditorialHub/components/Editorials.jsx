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

// Containers
import EditorialMenuContainer from '../containers/EditorialMenuContainer';
import EditorialsDetailsContainer from '../containers/EditorialsDetailsContainer';

// Data blanks
// import {
//   featuredEditorial,
//   videoEditorial,
//   featuredSideEditorial,
//   gridItemEditorial
// } from '../initial-state';

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

class Editorials extends Component {
  state = {}

  componentWillMount() {
    const userAccess = JSON.parse(localStorage.getItem('userAccess'));
    this.setState({ userAccess: userAccess });

    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  componentDidMount() {
    this.props.actions.editorialsRequested();
  }

  handleNewDropped = () => () => {
    this.props.actions.editorialUpdateSubmit();
  }

  handleSelectEditorial = (editorials, editorialId) => {
    const selectedEditorial = editorials.find(h => h.componentContainerId === editorialId);
    return (selectedEditorial);
  }

  handleEditorialsSortUpdate = (event) => {
    const { editorials, selectedEditorial } = this.props.state.editorials;
    const movingEditorialId = selectedEditorial.componentContainerId;
    const newItems = editorials;
    const $node = $('#editorials-drag-drop-area');
    const ids = $node.sortable('toArray', { attribute: 'data-editorialid' }).filter(c => c !== '');
    // console.log('reordering: ', movingEditorialId, newItems, $node, ids);

    ids.forEach((editorialId, index) => {
      const item = find(newItems, (obj) => obj.componentContainerId === parseInt(editorialId));
      item.displayOrder = index + 1;
    });

    // Lets React reorder the DOM
    $node.sortable('cancel');
    this.props.actions.editEditorialList(newItems);
    this.props.actions.setSelectedEditorial(
      this.handleSelectEditorial(newItems, movingEditorialId)
    );
    this.props.actions.editorialUpdateSubmit();
  }

  handleDragSelectEditorial = editorialId => (event) => {
    const { editorials } = this.props.state.editorials;
    this.props.actions.setSelectedEditorial(
      this.handleSelectEditorial(editorials, editorialId)
    );
  }

  render() {
    // console.log('Editorials render() with props: ', this.props);
    const { classes } = this.props;

    $('#editorials-drag-drop-area').sortable({
      update: this.handleEditorialsSortUpdate
    });

    return (
      <Router>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid container item sm={12} md={4} spacing={8}>
              <Grid item xs={12}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                  <Paper className={classes.paper} elevation={4}>
                    <EditorialMenuContainer />
                  </Paper>
                </Slide>
              </Grid>
            </Grid>
            <Grid item sm={12} md={8}>
              <Paper className={classes.paper}>
                <EditorialsDetailsContainer />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

Editorials.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    dropNewEditorial: PropTypes.func.isRequired,
    editEditorialList: PropTypes.func.isRequired,
    editorialsRequested: PropTypes.func.isRequired,
    editorialUpdateSubmit: PropTypes.func.isRequired,
    setSelectedEditorial: PropTypes.func.isRequired,
    updateBaseUrl: PropTypes.func.isRequired
  }).isRequired
};

export default withStyles(styles)(Editorials);
