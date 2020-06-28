import React from 'react';
import { PropTypes } from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Checkbox from '@material-ui/core/Checkbox';
// import Grid from '@material-ui/core/Grid';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

// Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Components:
import FeaturedMainContainer from '../containers/EditorialTypesContainers/FeaturedMainContainer';
import FeaturedLeftContainer from '../containers/EditorialTypesContainers/FeaturedLeftContainer';
import VideoArticleContainer from '../containers/EditorialTypesContainers/VideoArticleContainer';
import FeaturedRightContainer from '../containers/EditorialTypesContainers/FeaturedRightContainer';
import GridItemArticleContainer from '../containers/EditorialTypesContainers/GridItemArticleContainer';

import ReactCkeditor from '../../../components/reactckeditor';

import { handleActiveState } from '../lib/util';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
    // width: '33%'
  },
  dropzone: {
    width: '80%',
    height: '200px',
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '25px',
  },
  instructions: {
    justifySelf: 'flex-start',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  progressPlaceholder: {
    height: '4px',
    lineHeight: '20.02px',
    fontSize: '14px'
  },
  progressOverlay: {
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
    borderRadius: '5px',
    opacity: '0.5',
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1000
  },
  outlined: {
    border: '1px solid #000',
    borderRadius: '3px',
    margin: '15px',
    width: '95%'
  },
  marginReduce: {
    marginBottom: '-10px'
  },
  summaryEditor: {
    minHeight: '150px',
    border: '1px solid #ddd',
    borderRadius: '2px',
    color: '#000',
    padding: '20px'
  },
  bodyEditor: {
    minHeight: '600px',
    border: '1px solid #ddd',
    borderRadius: '2px',
    color: '#000',
    padding: '20px'
  },
  sortableItems: {
    marginTop: '15px',
    marginBottom: '15px'
  },
  editor: {
    border: '1px #000 solid'
  },
  card: {
    display: 'flex',
    maxWidth: '95%',
    justifyContent: 'space-between'
  },
  deleteEditorialButton: {
    top: '28px',
    right: 0,
    left: '42%',
    borderLeft: 'solid 1px #ddd',
    borderRight: 'solid 1px #ddd',
    borderBottom: 'solid 1px #ddd',
    borderRadius: '3px',
    padding: '8px',
    position: 'relative',
    cursor: 'pointer'
  },
  disableEditorialButton: {
    top: '28px',
    right: 0,
    left: '22%',
    borderLeft: 'solid 1px #ddd',
    borderRight: 'solid 1px #ddd',
    borderBottom: 'solid 1px #ddd',
    borderRadius: '3px',
    padding: '8px',
    position: 'relative',
    cursor: 'pointer',
    zIndex: 1000
  },
  editorialLayout: {
    display: 'flex',
    flexFlow: 'row wrap'
  }
});

class EditorialsDetails extends React.Component {
  state = {
    deleteConfirmDialog: false
  }

  componentWillMount() {
    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  handleChange = (name) => (event) => {
    const { selectedEditorial } = this.props.state.editorials
    // Have to set both internal state and store value for dropdown
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editEditorial(selectedEditorial, name, event.target.value);
  }

  deleteEditorialButton = () => {
    this.setState({ deleteConfirmDialog: true });
  }

  deleteEditorialConfirmClose = () => {
    this.setState({ deleteConfirmDialog: false });
  }

  deleteEditorial = (event) => {
    const { editorials, selectedEditorial } = this.props.state.editorials;
    let iterator = 1;

    const filteredEditorials = editorials.filter(
      c => c.componentContainerId !== selectedEditorial.componentContainerId
    ).sort((a, b) => a.displayOrder - b.displayOrder);
    filteredEditorials.map(c => c.displayOrder = iterator++);

    this.props.actions.editEditorialList(filteredEditorials);
    console.log('Delete editorial! ', selectedEditorial.componentContainerId, filteredEditorials);
    this.props.actions.editorialArticleDeleteSubmit();
    this.setState({ deleteConfirmDialog: false });
  }

  filterEditorialType(editorial, i) {
    const { classes } = this.props;
    const { componentType } = editorial;
    switch (componentType) {
      case 1:
        return (
          <div>
            <FeaturedMainContainer editorial={editorial} />
          </div>
        );

      case 2:
        return (
          <div>
            <span onClick={this.deleteEditorialButton} className={classes.deleteEditorialButton}>X Delete Editorial</span>
            <span onClick={handleActiveState(this.props, i)} className={classes.disableEditorialButton}>
              {editorial.active ? 'Disable' : 'Enable'}
            </span>
            <VideoArticleContainer editorial={editorial} editorialIndex={i} />
          </div>
        );

      case 3:
        return (
          <div>
            <span onClick={this.deleteEditorialButton} className={classes.deleteEditorialButton}>X Delete Editorial</span>
            <span onClick={handleActiveState(this.props, i)} className={classes.disableEditorialButton}>
              {editorial.active ? 'Disable' : 'Enable'}
            </span>
            <div className={classes.editorialLayout}>
              <FeaturedLeftContainer editorial={editorial} editorialIndex={i} />
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <span onClick={this.deleteEditorialButton} className={classes.deleteEditorialButton}>X Delete Editorial</span>
            <span onClick={handleActiveState(this.props, i)} className={classes.disableEditorialButton}>
              {editorial.active ? 'Disable' : 'Enable'}
            </span>
            <div className={classes.editorialLayout}>
              <FeaturedRightContainer editorial={editorial} editorialIndex={i} />
            </div>
          </div>
        );


      case 5:
        return (
          <div>
            <span onClick={this.deleteEditorialButton} className={classes.deleteEditorialButton}>X Delete Editorial</span>
            <span onClick={handleActiveState(this.props, i)} className={classes.disableEditorialButton}>
              {editorial.active ? 'Disable' : 'Enable'}
            </span>
            <GridItemArticleContainer editorial={editorial} editorialIndex={i} />
          </div>
        );

      default:
        return null;
    }
  }


  handleSelectEditorial = (editorials, editorialId) => {
    // console.log('Select Editorial: ', editorialId, editorials);
    const selectedEditorial = editorials.find(h => h.componentContainerId === editorialId);
    return (selectedEditorial);
  }

  handleDragSelectEditorial = (editorialId) => (event) => {
    const { editorials } = this.props.state.editorials;
    this.props.actions.setSelectedEditorial(
      this.handleSelectEditorial(editorials, editorialId)
    );
  }

  sortedEditorials() {
    const { classes } = this.props;
    const { editorials } = this.props.state.editorials;
    // .slice(1)
    return editorials.sort((a, b) => a.displayOrder - b.displayOrder).map((editorial, i) => {
      return (
        <li
          key={editorial.componentContainerId}
          className={classes.sortableItems}
          data-editorialid={editorial.componentContainerId}
          onMouseDown={this.handleDragSelectEditorial(editorial.componentContainerId)}
        >
          {this.filterEditorialType(editorial, i)}
        </li>
      )
    });
  }

  render() {
    console.log('Editorial Details render(): ', this.props);
    const { classes } = this.props;
    const { progressIndicator, editorials } = this.props.state.editorials;

    return (
      <div>
        <h2>Editorial Page</h2>
        {progressIndicator
          ? <LinearProgress />
          : <div className={classes.progressPlaceholder}>&nbsp;</div>
        }
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          {progressIndicator ? <div className={classes.progressOverlay} /> : null}
          {/* editorials[0] === undefined
            ? <LinearProgress />
            : (
                <div className="editorials-visibility">
                  <FeaturedMainContainer componentData={editorials[0].componentData} />
                </div>
              )
          */ }
          <ul id="editorials-drag-drop-area" className="connectedSortable container content-area editorial-hub editorials-visibility">
            {this.sortedEditorials()}
          </ul>

          <Dialog
            open={this.state.deleteConfirmDialog}
            keepMounted
            onClose={this.deleteEditorialConfirmClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {'Delete Editorial Block'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.deleteEditorial} color="primary">
                Confirm
              </Button>
              <Button onClick={this.deleteEditorialConfirmClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

EditorialsDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

EditorialsDetails.defaultProps = {

};

export default withStyles(styles)(EditorialsDetails);
