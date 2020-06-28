import React from 'react';
import { PropTypes } from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

// Material UI FormGroup
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%'
  },
  outlined: {
    border: '1px solid #000',
    borderRadius: '3px',
    margin: '15px',
    width: '95%'
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
  upsertWarning: {
    color: '#f33',
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '20px'
  }
});

const pubStatus = [
  {
    value: 1,
    label: 'none'
  },
  {
    value: 2,
    label: 'calendar_only'
  },
  {
    value: 3,
    label: 'header_only'
  },
  {
    value: 4,
    label: 'full'
  }
];

class AuctionMobility extends React.Component {
  state = {}

  handleChange = name => (event) => {
    // Have to set both internal state and store value
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editAMDetails(name, event.target.value);
  }

  handleToggle = name => (event) => {
    this.props.actions.editAMDetails(name, event.target.checked);
  }

  render() {
    // console.log('AuctionMobility render(): ', this.props);
    const { classes } = this.props;
    const { selectedAuction, auctionMobility } = this.props.state;
    const { saleNumber } = selectedAuction;
    const {
      bidThreshold,
      saleType,
      calendarID,
      auctionTitle,
      eventDate,
      auctionDuration,
      locationName,
      rowID,
      statusDesc,
      uploadStatus,
      incAuctionImage,
      incLotImages,
      incLotInfo
    } = auctionMobility;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} style={{ position: 'relative' }}>
          {
            selectedAuction.saleType === 'Exhibition'
              ? <div className={classes.progressOverlay} />
              : null
          }
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12}>
            {uploadStatus === 'Upsert'
              ? (
                <div className={classes.outlined}>
                  <p className={classes.upsertWarning}>
                    <em>
                      And error occurred, this auction is currently blocked.
                      <br />
                      Please double check your changes and click save again.
                      <br />
                      If you continue to see this message, contact an administrator.
                    </em>
                  </p>
                </div>
              )
              : null
            }
          </Grid>
          <Grid className={classes.outlined} item container xs={6} spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField
                id="saleType"
                label="Sale Type"
                className={classes.textField}
                margin="normal"
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={saleType}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="saleNumber"
                label="Sale Number"
                className={classes.textField}
                margin="normal"
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={saleNumber}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="calendarID"
                label="Calendar ID"
                className={classes.textField}
                margin="normal"
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={calendarID}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="eventDate"
                label="Event Date"
                type="datetime-local"
                className={classes.textField}
                margin="normal"
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={eventDate.split(':').slice(0, -1).join(':')}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="locationName"
                label="Location"
                margin="normal"
                required
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={locationName}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="auctionTitle"
                label="Title"
                margin="normal"
                required
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={auctionTitle}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="rowID"
                label="Row ID"
                margin="normal"
                required
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={rowID}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="publication-status"
                select
                style={{ width: 230 }}
                label="Publication Status"
                className={classes.textField}
                value={statusDesc}
                onChange={this.handleChange('statusDesc')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
              >
                {pubStatus.map(option => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="bidThreshold"
                label="Bid Threshold"
                className={classes.textField}
                margin="normal"
                fullwidth="true"
                style={{ width: '100%' }}
                type="number"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                value={bidThreshold}
                onChange={this.handleChange('bidThreshold')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="auctionDuration"
                label="Duration Hours"
                className={classes.textField}
                margin="normal"
                fullwidth="true"
                style={{ width: '100%' }}
                type="number"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                value={auctionDuration}
                onChange={this.handleChange('auctionDuration')}
              />
            </Grid>
          </Grid>
          <Grid className={classes.outlined} item container xs={5} spacing={24}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={incAuctionImage ? true : false}
                        onChange={this.handleToggle('incAuctionImage')}
                        color="primary"
                      />
                    )}
                    label="Banner Image"
                  />
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={incLotImages ? true : false}
                        onChange={this.handleToggle('incLotImages')}
                        color="primary"
                      />
                    )}
                    label="Lot Images"
                  />
                </FormGroup>
                <FormControlLabel
                  control={(
                    <Switch
                      checked={incLotInfo ? true : false}
                      onChange={this.handleToggle('incLotInfo')}
                      color="primary"
                    />
                  )}
                  label="Lot Info (Sends Results After Sale)"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}


AuctionMobility.defaultProps = {};

AuctionMobility.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    root: PropTypes.string,
    textField: PropTypes.string,
    previewArea: PropTypes.string,
    dropzone: PropTypes.string,
    outlined: PropTypes.string,
    upsertWarning: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    editAMDetails: PropTypes.func.isRequired,
    unblockAMDialog: PropTypes.func.isRequired,
    unlockAMSaleSubmit: PropTypes.func.isRequired
  }).isRequired,
  state: PropTypes.shape({
    selectedAuction: PropTypes.objectOf(PropTypes.object).isRequired,
    auctionMobility: PropTypes.objectOf(PropTypes.object).isRequired
  }).isRequired
};


export default withStyles(styles)(AuctionMobility);
