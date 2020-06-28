import React from 'react';
import { PropTypes } from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Data blanks
import {
  richTextBlank,
  carouselBlank,
  richTextCarouselBlank,
  videoBlank
} from '../initial-state';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '25px'
  },
  instructions: {
    justifySelf: 'flex-start'
  },
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
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
  }
});

class LotComponentsMenu extends React.Component {
  state = {}

  handleChange = (name) => (event) => {
    const { selectedLotComponent } = this.props.state.lotComponents
    // Have to set both internal state and store value for dropdown
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editLotComponent(selectedLotComponent, name, event.target.value);
  }

  handleToggle = (name) => (event) => {
    this.props.actions.editDetails(name, event.target.checked);
  }

  setLotComponentType = (type, lotComponentTemplate) => (event) => {
    this.props.actions.setNewLotComponentType(type);
    this.props.actions.setSelectedLotComponent(lotComponentTemplate);
  }

  handleAddNewComponent = (componentBlankData) => (event) => {
    const { lotComponents } = this.props.state.lotComponents;
    lotComponents.unshift(componentBlankData);

    this.props.actions.editLotComponentList(lotComponents);
    this.props.actions.lotComponentUpdateSubmit();
  }

  render() {
    // console.log('LotComponent Menu render(): ', this.props);
    const { classes } = this.props;
    const {
      progressIndicator,
      lotComponents,
      selectedLot
    } = this.props.state.lotComponents;
    const {
      saleNumber,
      objectNumber
    } = selectedLot;
    const richTextBlankSelected = {
      ...richTextBlank,
      saleNumber: saleNumber,
      objectNumber: objectNumber,
      title: `${richTextBlank.title} ${Math.floor(Math.random() * 100000)}`
    };
    const carouselBlankSelected = {
      ...carouselBlank,
      saleNumber: saleNumber,
      objectNumber: objectNumber,
      title: `${carouselBlank.title} ${Math.floor(Math.random() * 100000)}`
    };
    const richTextCarouselBlankSelected = {
      ...richTextCarouselBlank,
      saleNumber: saleNumber,
      objectNumber: objectNumber,
      title: `${carouselBlank.title} ${Math.floor(Math.random() * 100000)}`
    };

    return (
      <div style={{ position: 'relative', marginBottom: '30px' }}>
        {
          progressIndicator || objectNumber === 0
            ? <div className={classes.progressOverlay} />
            : null
        }
        <h2>Available Lot Components:</h2>
        <p>Click to add new components</p>
        <ul id="component-icon-list" className="connectedSortable">
          <li
            onMouseDown={this.setLotComponentType('RichText', richTextBlankSelected)}
            onClick={this.handleAddNewComponent(richTextBlankSelected)}
          >
            <Paper className="mainVisible content-icon">
              <h4>Rich Text</h4>
              <br />
              <img src="https://phillips.vo.llnwd.net/v1/web_prod/images/icons/richtext-icon.jpg" />
            </Paper>
          </li>
          <li
            onMouseDown={this.setLotComponentType('Carousel', carouselBlankSelected)}
            onClick={this.handleAddNewComponent(carouselBlankSelected)}
          >
            <Paper className="mainVisible content-icon">
              <h4>Carousel</h4>
              <br />
              <img src="https://phillips.vo.llnwd.net/v1/web_prod/images/icons/carousel-icon.png" />
            </Paper>
          </li>
          <li
            onMouseDown={this.setLotComponentType('RichTextCarousel', richTextCarouselBlankSelected)}
            onClick={this.handleAddNewComponent(richTextCarouselBlankSelected)}
          >
            <Paper className="mainVisible content-icon">
              <h4>Rich Text Carousel</h4>
              <br />
              <img src="https://phillips.vo.llnwd.net/v1/web_prod/images/icons/richtext-carousel-icon.png" />
            </Paper>
          </li>
          { /*
          <li
            onMouseDown={this.setLotComponentType('Video', videoBlank)}
            onClick={this.handleAddNewComponent(videoBlank)}
          >
            <VideoContainer lotComponent={videoBlank} />
          </li>
          */ }
        </ul>
      </div>
    );
  }
}

LotComponentsMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    editLotComponent: PropTypes.func.isRequired,
    editLotComponentList: PropTypes.func.isRequired,
    setNewLotComponentType: PropTypes.func.isRequired,
    setSelectedLotComponent: PropTypes.func.isRequired,
    lotComponentUpdateSubmit: PropTypes.func.isRequired
  }).isRequired
};

LotComponentsMenu.defaultProps = {

};

export default withStyles(styles)(LotComponentsMenu);
