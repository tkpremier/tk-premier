import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  formGroup: {
    width: "80%"
  },
  menu: {
    width: 200,
  },
})

const bidPartners = [
  {
    value: 'AuctionMobility',
    label: 'AuctionMobility',
  },
  {
    value: 'Artsy',
    label: 'Artsy',
  }
]

class LiveAuctionDetails extends React.Component {
  state = {
    isLiveAuction: false
  }

  handleChange = (name) => (event) => {
    this.props.actions.editDetails(name, event.target.value)
  }

  handleToggle = (name) => (event) => {
    this.props.actions.editDetails(name, event.target.checked)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={6}>
            <br />
            <FormControlLabel
              control={
                <Switch
                  checked={this.props.state.selectedAuction.isLiveAuction ? true : false}
                  onChange={this.handleToggle('isLiveAuction')}
                  color="primary"
                />
              }
              label="Live Auction"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="liveAuctionTitle"
              label="Live Auction Title"
              className={classes.textField}
              margin="normal"
              value={this.props.state.selectedAuction.liveAuctionTitle}
              onChange={this.handleChange('liveAuctionTitle')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="liveAuctionSuperTitle"
              label="Live Auction Super Title"
              className={classes.textField}
              margin="normal"
              value={this.props.state.selectedAuction.liveAuctionSuperTitle}
              onChange={this.handleChange('liveAuctionSuperTitle')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="liveAuctionLinkDesc"
              label="Live Auction Link Description"
              className={classes.textField}
              margin="normal"
              value={this.props.state.selectedAuction.liveAuctionLinkDesc}
              onChange={this.handleChange('liveAuctionLinkDesc')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="liveAuctionLinkUrl"
              label="Live Auction Link URL"
              className={classes.textField}
              margin="normal"
              value={this.props.state.selectedAuction.liveAuctionLinkUrl}
              onChange={this.handleChange('liveAuctionLinkUrl')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="liveAuctionUrl"
              label="Live Auction URL"
              className={classes.textField}
              margin="normal"
              value={this.props.state.selectedAuction.liveAuctionUrl}
              onChange={this.handleChange('liveAuctionUrl')}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

LiveAuctionDetails.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LiveAuctionDetails)
