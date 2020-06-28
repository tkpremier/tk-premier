import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';

import LotDetailsContainer from '../containers/DetailsFormsContainers/LotDetailsContainer';
import LotTagsContainer from '../containers/DetailsFormsContainers/LotTagsContainer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    justify: 'space-between'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '70%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  lotsLink: {
    textDecoration: 'none',
    display: 'block',
    justifySelf: 'flex-end'
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

class LotManagement extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleLotCloudinaryUpload = () => {
    this.props.actions.cloudinaryDialogOpen({ cloudinaryDialogOpen: true });
    this.props.actions.cloudinaryLotUploadSubmit();
  }

  render() {
    // console.log('Lot Management render(): ', this.props)
    const { classes } = this.props;
    const { value } = this.state;
    const {
      cloudinaryUpload,
      updateAuction,
      selectedLot
    } = this.props.state;
    const {
      lotNumber,
      makerName,
      description
    } = selectedLot;

    return (
      <div className={classes.root}>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
        >
          <div className={classes.root} style={{ position: 'relative' }}>
            {
              cloudinaryUpload.cloudinaryDialogOpen ||
              cloudinaryUpload.thumbnailDialogOpen ||
              updateAuction.saveDialogOpen
                ? <LinearProgress />
                : <div className={classes.progressPlaceholder}>&nbsp;</div>
            }
            {
              cloudinaryUpload.cloudinaryDialogOpen ||
              cloudinaryUpload.thumbnailDialogOpen ||
              updateAuction.saveDialogOpen
                ? <div className={classes.progressOverlay} />
                : null
            }
            <span>
              {selectedLot !== undefined
                ? (
                  <h3>
                    {lotNumber}
                    &nbsp;&ndash;&nbsp;
                    {makerName}
                    &nbsp;&ndash;&nbsp;
                    {description}
                  </h3>
                )
                : <h3>Lot Number &mdash; Lot Title</h3>}
            </span>
            <AppBar position="static" style={{ backgroundColor: '#000', color: '#fff' }}>
              <Toolbar justify="space-between">
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab label="Lot Details" />
                  <Tab label="Lot Tags" />
                </Tabs>
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    component="span"
                    className={classes.lotsLink}
                    onClick={this.handleLotCloudinaryUpload}
                  >
                    Upload Lot to Cloudinary
                  </Button>
                </div>
              </Toolbar>
            </AppBar>
            {value === 0 && <LotDetailsContainer />}
            {value === 1 && <LotTagsContainer />}
          </div>
        </form>
      </div>
    );
  }
}

LotManagement.defaultProps = {
  lotNumber: '',
  makerName: '',
  description: ''
};

LotManagement.propTypes = {
  classes: PropTypes.shape({
    lotsLink: PropTypes.string,
    buttonContainer: PropTypes.string,
    root: PropTypes.string,
    container: PropTypes.string
  }).isRequired
  // actions: PropTypes.shape({
  //   cloudinaryDialogOpen: PropTypes.func.isRequired,
  //   cloudinaryLotUploadSubmit: PropTypes.func.isRequired
  // }).isRequired,
  // state: PropTypes.shape({
  //   selectedLot: PropTypes.objectOf(PropTypes.object).isRequired
  // }).isRequired
};

export default withStyles(styles)(LotManagement);
