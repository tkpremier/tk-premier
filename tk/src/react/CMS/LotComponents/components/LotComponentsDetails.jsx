import React from 'react';
import { PropTypes } from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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
import RichTextContainer from '../containers/LotComponentTypesContainers/RichTextContainer';
import VideoContainer from '../containers/LotComponentTypesContainers/VideoContainer';
import CarouselContainer from '../containers/LotComponentTypesContainers/CarouselContainer';
import RichTextCarouselContainer from '../containers/LotComponentTypesContainers/RichTextCarouselContainer';

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
    width: '100%'
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
  deleteLotComponentButton: {
    top: '43px',
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
  disableComponentButton: {
    top: '43px',
    right: 0,
    left: '28%',
    borderLeft: 'solid 1px #ddd',
    borderRight: 'solid 1px #ddd',
    borderBottom: 'solid 1px #ddd',
    borderRadius: '3px',
    padding: '8px',
    position: 'relative',
    cursor: 'pointer',
    zIndex: 1000
  },
  lotComponentLayout: {
    display: 'flex',
    flexFlow: 'row wrap'
  }
});

class LotComponentsDetails extends React.Component {
  state = {
    deleteConfirmDialog: false
  }

  componentWillMount() {
    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  handleChange = (name) => (event) => {
    const { selectedLotComponent } = this.props.state.lotComponents
    // Have to set both internal state and store value for dropdown
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editLotComponent(selectedLotComponent, name, event.target.value);
  }

  deleteLotComponentButton = () => {
    this.setState({ deleteConfirmDialog: true });
  }

  deleteLotComponentConfirmClose = () => {
    this.setState({ deleteConfirmDialog: false });
  }

  deleteLotComponent = (event) => {
    const { lotComponents, selectedLotComponent } = this.props.state.lotComponents;
    let iterator = 1;

    const filteredLotComponents = lotComponents.filter(
      c => c.componentContainerId !== selectedLotComponent.componentContainerId
    ).sort((a, b) => a.displayOrder - b.displayOrder);
    filteredLotComponents.map(c => c.displayOrder = iterator++);

    this.props.actions.editLotComponentList(filteredLotComponents);
    this.props.actions.lotComponentDeleteSubmit();
    this.setState({ deleteConfirmDialog: false });
  }

  filterLotComponentType(lotComponent, i) {
    const { classes } = this.props;
    const { componentType } = lotComponent;

    switch (componentType) {
      case 'RichText':
        return (
          <div>
            <span onClick={this.deleteLotComponentButton} className={classes.deleteLotComponentButton}>X Delete</span>
            <span onClick={handleActiveState(this.props, i)} className={classes.disableComponentButton}>
              {lotComponent.active ? 'Disable' : 'Enable'}
            </span>
            <RichTextContainer lotComponent={lotComponent} lotComponentIndex={i} />
          </div>
        );

      case 'Video':
        return (
          <div>
            <span onClick={this.deleteLotComponentButton} className={classes.deleteLotComponentButton}>X Delete</span>
            <span onClick={handleActiveState(this.props, i)} className={classes.disableComponentButton}>
              {lotComponent.active ? 'Disable' : 'Enable'}
            </span>
            <VideoContainer lotComponent={lotComponent} lotComponentIndex={i} />
          </div>
        );

      case 'Carousel':
        return (
          <div>
            <span onClick={this.deleteLotComponentButton} className={classes.deleteLotComponentButton}>X Delete</span>
            <span onClick={handleActiveState(this.props, i)} className={classes.disableComponentButton}>
              {lotComponent.active ? 'Disable' : 'Enable'}
            </span>
            <CarouselContainer lotComponent={lotComponent} lotComponentIndex={i} />
          </div>
        );

      case 'RichTextCarousel':
        return (
          <div>
            <span onClick={this.deleteLotComponentButton} className={classes.deleteLotComponentButton}>X Delete</span>
            <span onClick={handleActiveState(this.props, i)} className={classes.disableComponentButton}>
              {lotComponent.active ? 'Disable' : 'Enable'}
            </span>
            <RichTextCarouselContainer lotComponent={lotComponent} lotComponentIndex={i} />
          </div>
        );

      default:
        return null;
    }
  }


  handleSelectLotComponent = (lotComponents, lotComponentId) => {
    const selectedLotComponent = lotComponents.find(h => h.componentContainerId === lotComponentId);
    // console.log('Selecting LotComponent: ', lotComponents, lotComponentId, selectedLotComponent);

    // this.props.actions.clearSelectedLotComponent();
    return (selectedLotComponent);
  }

  handleDragSelectLotComponent = (lotComponentId) => (event) => {
    const { lotComponents, selectedLotComponent } = this.props.state.lotComponents;

    this.props.actions.setPreviouslySelectedComponentId(selectedLotComponent);
    this.props.actions.setSelectedLotComponent(
      this.handleSelectLotComponent(lotComponents, lotComponentId)
    );
  }

  sortedLotComponents() {
    const { classes } = this.props;
    const { lotComponents } = this.props.state.lotComponents;

    return lotComponents.sort((a, b) => a.displayOrder - b.displayOrder).map((lotComponent, i) => {
      return (
        <li
          key={lotComponent.componentContainerId}
          className={classes.sortableItems}
          data-lotcomponentid={lotComponent.componentContainerId}
          onMouseDown={this.handleDragSelectLotComponent(lotComponent.componentContainerId)}
        >
          {this.filterLotComponentType(lotComponent, i)}
        </li>
      )
    });
  }

  render() {
    // console.log('LotComponent Details render(): ', this.props);
    const { classes } = this.props;
    const {
      progressIndicator,
      lotComponents,
      selectedLot
    } = this.props.state.lotComponents;
    const { objectNumber } = selectedLot;

    return (
      <div>
        <h2>Lot Components</h2>
        <p>
          <em>
            <strong>
              {
                selectedLot.objectNumber !== 0
                  ? `Displaying lot components for lot #${selectedLot.lotNumber}, objectNumber ${selectedLot.objectNumber} in ${selectedLot.saleNumber}`
                  : null
              }
            </strong>
          </em>
        </p>
        {progressIndicator
          ? <LinearProgress />
          : <div className={classes.progressPlaceholder}>&nbsp;</div>
        }
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          {progressIndicator || objectNumber === 0 ? <div className={classes.progressOverlay} /> : null}
          <ul
            id="lot-components-drag-drop-area"
            className={`
              lot-components
              lot-components-visibility
              ${lotComponents.length === 0 ? 'no-components' : ''}`
            }
          >
            {this.sortedLotComponents()}
          </ul>

          <Dialog
            open={this.state.deleteConfirmDialog}
            keepMounted
            onClose={this.deleteLotComponentConfirmClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {'Delete Lot Component Block'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.deleteLotComponent} color="primary">
                Confirm
              </Button>
              <Button onClick={this.deleteLotComponentConfirmClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

LotComponentsDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    editLotComponent: PropTypes.func.isRequired,
    updateBaseUrl: PropTypes.func.isRequired
  }).isRequired
};

LotComponentsDetails.defaultProps = {

};

export default withStyles(styles)(LotComponentsDetails);
