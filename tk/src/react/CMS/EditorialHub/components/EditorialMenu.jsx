import React from 'react';
import { PropTypes } from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';

// Components
import FeaturedMainContainer from '../containers/EditorialTypesContainers/FeaturedMainContainer';
import FeaturedLeftContainer from '../containers/EditorialTypesContainers/FeaturedLeftContainer';
import FeaturedRightContainer from '../containers/EditorialTypesContainers/FeaturedRightContainer';
import GridItemArticleContainer from '../containers/EditorialTypesContainers/GridItemArticleContainer';
import VideoArticleContainer from '../containers/EditorialTypesContainers/VideoArticleContainer';

// Data blanks
import {
  featuredEditorial,
  videoEditorial,
  featuredSideEditorial,
  gridItemEditorial
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
  }
});

class EditorialMenu extends React.Component {
  state = {}

  componentWillMount() {
    // this.props.actions.updateBaseUrl(document.body.dataset.domain)
  }

  handleChange = (name) => (event) => {
    const { selectedEditorial } = this.props.state.editorials
    // Have to set both internal state and store value for dropdown
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editEditorial(selectedEditorial, name, event.target.value);
  }

  handleToggle = (name) => (event) => {
    this.props.actions.editDetails(name, event.target.checked);
  }

  setEditorialType = (type, editorialTemplate) => (event) => {
    this.props.actions.setNewEditorialType(type);
    this.props.actions.setSelectedEditorial(editorialTemplate);
  }

  handleAddNewEditorial = (editorialBlankData) => (event) => {
    const { editorials } = this.props.state.editorials;
    editorials.concat(editorialBlankData);

    this.props.actions.editEditorialList(editorials);
    this.props.actions.editorialUpdateSubmit();
  }

  render() {
    // console.log('Editorial Menu render(): ', this.props);

    return (
      <div>
        <h2>Editorial Components:</h2>
        <ul id="component-icon-list" className="connectedSortable">
          <li
            onMouseDown={this.setEditorialType('featured-main', featuredEditorial)}
            onClick={this.handleAddNewEditorial(featuredEditorial)}
            style={{ 'display': 'none', 'visibility': 'hidden' }}
          >
            <FeaturedMainContainer editorial={featuredEditorial} />
          </li>
          <li
            onMouseDown={this.setEditorialType('featured-side-left', featuredSideEditorial)}
            onClick={this.handleAddNewEditorial(featuredSideEditorial)}
          >
            <FeaturedLeftContainer editorial={featuredSideEditorial} />
          </li>
          <li
            onMouseDown={this.setEditorialType('featured-side-right', featuredSideEditorial)}
            onClick={this.handleAddNewEditorial(featuredSideEditorial)}
          >
            <FeaturedRightContainer editorial={featuredSideEditorial} />
          </li>
          <li
            onMouseDown={this.setEditorialType('grid-article', gridItemEditorial)}
            onClick={this.handleAddNewEditorial(gridItemEditorial)}
          >
            <GridItemArticleContainer editorial={gridItemEditorial} />
          </li>
          <li
            onMouseDown={this.setEditorialType('video-article', videoEditorial)}
            onClick={this.handleAddNewEditorial(videoEditorial)}
          >
            <VideoArticleContainer editorial={videoEditorial} />
          </li>
        </ul>
      </div>
    );
  }
}

EditorialMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

EditorialMenu.defaultProps = {

};

export default withStyles(styles)(EditorialMenu);
