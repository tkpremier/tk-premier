import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  },
  progress: {
    marginLeft: '40%'
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

class ControlPanel extends Component {
  state = {}

  handleChange = name => (event) => {
    // Have to set both internal state and store value for dropdown
    this.setState({
      [name]: event.target.value
    });
    this.props.actions.editDetails(name, event.target.value);
  }

  handleSubmit = () => {
    const { auctionEdited } = this.props.state.selectedAuction;
    const { lotEdited } = this.props.state.selectedLot;

    if (auctionEdited) {
      this.props.actions.updateAuctionSubmit();
    }
    if (lotEdited) {
      this.props.actions.updateLotSubmit();
    }

    this.props.actions.saveDialogOpen({ saveDialogOpen: true });
  }

  handleAMSubmit = () => {
    const { saleEdited, uploadStatus } = this.props.state.auctionMobility;

    if (saleEdited) {
      if (uploadStatus !== 'Upsert') {
        this.props.actions.updateAMSaleSubmit();
      } else {
        this.props.actions.unlockAMSaleSubmit();
      }
    }

    this.props.actions.saveDialogOpen({ saveDialogOpen: true });
  }


  handleCloudinaryUpload = () => {
    this.props.actions.cloudinaryDialogOpen({ cloudinaryDialogOpen: true });
    this.props.actions.cloudinaryUploadTrigger();
  }

  handleThumbnailUpdate = () => {
    this.props.actions.thumbnailDialogOpen({ thumbnailDialogOpen: true });
    this.props.actions.thumbnailUpdate();
  }

  handleCloudinaryClose = () => {
    this.props.actions.cloudinaryDialogOpen(
      { cloudinaryDialogOpen: false }
    );
  }

  handleThumbnailClose = () => {
    this.props.actions.thumbnailDialogOpen(
      { thumbnailDialogOpen: false }
    );
  }

  handleSaveClose = () => {
    this.props.actions.saveDialogOpen(
      { saveDialogOpen: false }
    );
  }

  handleMigratePreviewToStaging = () => {
    this.props.actions.migratePreviewToStagingSubmit();
  }

  render() {
    // console.log('control panel render(): ', this.props);
    const { classes } = this.props;
    const {
      globalState,
      selectedAuction,
      selectedLot,
      uploadImage,
      cloudinaryUpload,
      updateAuction,
      auctionMobility
    } = this.props.state;
    const {
      auctionEdited,
      auctionTitle,
      saleNumberToMigrate
    } = selectedAuction;
    const {
      saleEdited
    } = auctionMobility;

    return (
      <div className={classes.root} style={{ position: 'relative' }}>
        {
          cloudinaryUpload.cloudinaryDialogOpen ||
          cloudinaryUpload.thumbnailDialogOpen ||
          updateAuction.saveDialogOpen
            ? <div className={classes.progressOverlay} />
            : null
        }
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              onClick={this.handleCloudinaryUpload}
              style={{ width: '100%' }}
              disabled={
                auctionTitle === 'Sample Auction' ? true : false
              }
            >
              Upload to
              <br />
              Cloudinary
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              onClick={this.handleThumbnailUpdate}
              style={{ width: '100%' }}
              disabled={
                auctionTitle === 'Sample Auction' ? true : false
              }
            >
              Update
              <br />
              Thumbnails
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              component="span"
              onClick={this.handleSubmit}
              color="secondary"
              style={{ width: '100%' }}
              disabled={
                auctionEdited || selectedLot.lotEdited || uploadImage.auctionEdited ? false : true
              }
            >
              Save
              <br />
              Changes
            </Button>
          </Grid>
          <Grid item xs={4}>
            &nbsp;
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              component="span"
              onClick={this.handleAMSubmit}
              color="primary"
              style={{ width: '100%' }}
              disabled={
                saleEdited ? false : true
              }
            >
              Upload
              <br />
              AM Sale
            </Button>
          </Grid>
          <Grid item xs={4}>
            &nbsp;
          </Grid>
          {
            globalState.baseUrl === 'https://stage-cms.phillips.com'
              ? (
                <Grid item xs={4}>
                  <TextField
                    id="auctionToMigrate"
                    label="Auction Number"
                    margin="normal"
                    fullwidth="true"
                    style={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={saleNumberToMigrate}
                    onChange={this.handleChange('saleNumberToMigrate')}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    onClick={this.handleMigratePreviewToStaging}
                    color="secondary"
                    style={{ width: '200px' }}
                  >
                    Migrate Preview
                    <br />
                    to Staging
                  </Button>
                </Grid>
              )
              : null
          }
        </Grid>
      </div>
    );
  }
}

ControlPanel.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    root: PropTypes.string,
    paper: PropTypes.string,
    progress: PropTypes.string,
    progressOverlay: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    auctionsRequested: PropTypes.func.isRequired,
    updateAMSaleSubmit: PropTypes.func.isRequired,
    cloudinaryDialogOpen: PropTypes.func.isRequired,
    cloudinaryUploadTrigger: PropTypes.func.isRequired,
    editDetails: PropTypes.func.isRequired,
    migratePreviewToStagingSubmit: PropTypes.func.isRequired,
    saveDialogOpen: PropTypes.func.isRequired,
    thumbnailDialogOpen: PropTypes.func.isRequired,
    thumbnailUpdate: PropTypes.func.isRequired,
    updateAuctionSubmit: PropTypes.func.isRequired,
    updateLotSubmit: PropTypes.func.isRequired,
    unlockAMSaleSubmit: PropTypes.func.isRequired
  }).isRequired
  // state: PropTypes.shape({
  //   globalState: PropTypes.objectOf(PropTypes.object).isRequired,
  //   selectedAuction: PropTypes.objectOf(PropTypes.object).isRequired,
  //   selectedLot: PropTypes.objectOf(PropTypes.object).isRequired,
  //   uploadImage: PropTypes.objectOf(PropTypes.object).isRequired
  // }).isRequired
};

export default withStyles(styles)(ControlPanel);
