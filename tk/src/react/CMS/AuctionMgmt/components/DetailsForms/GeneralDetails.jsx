import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Cloudinary } from 'cloudinary-core';
import * as R from 'ramda';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

// Material UI FormGroup
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { CSVLink } from 'react-csv';

import { renameKeys } from '../../../Shared/lib/util';

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'center'
  },
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
    // width: 200,
  },
  menu: {
    width: 200
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  },
  outlined: {
    border: '1px solid #000',
    borderRadius: '3px',
    margin: '15px',
    width: '95%'
  },
  switchLabel: {
    textAlign: 'left'
  },
  dropzone: {
    width: '80%',
    height: '75px',
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  cloudinaryBannerVersion: {
    marginLeft: '50%'
  },
  marginReduce: {
    marginBottom: '-10px',
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  prettyLink: {
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    padding: '6px 16px',
    fontSize: '0.875rem',
    minWidth: '64px',
    boxSizing: 'border-box',
    lineHeight: '1.75',
    fontWeight: '500',
    borderRadius: '4px',
  },
  qrCampaignContainer: {
    paddingTop: '15%',
    paddingBottom: '15%'
  }
});

const cloudinaryConfig = Cloudinary.new({
  cloud_name: 'phillips-assets',
  private_cdn: true,
  secure: true,
  secure_distribution: 'assets.phillips.com',
  cname: 'assets.phillips.com'
});

const bidPartners = [
  {
    value: 1,
    label: 'AuctionMobility'
  },
  {
    value: 2,
    label: 'Artsy'
  }
];

const saleTypes = [
  {
    id: 1,
    saleType: 'Auction'
  },
  {
    id: 2,
    saleType: 'Exhibition'
  },
  {
    id: 3,
    saleType: 'TimedAuction'
  },
  {
    id: 4,
    saleType: 'MakeAnOffer'
  },
  {
    id: 5,
    saleType: 'Buy Now'
  }
];

class GeneralDetails extends React.Component {
  state = {}

  componentWillMount() {
    const newKeys = { key: 'departmentID', value: 'departmentName' };
    const departmentsLS = JSON.parse(localStorage.getItem('departments'));

    this.props.actions.setDepartmentList(departmentsLS.map(e => ({ ...renameKeys(e, newKeys), checked: false })));
  }

  handleChange = name => (event) => {
    // Have to set both internal state and store value for dropdown
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editDetails(name, event.target.value);
  }

  handleCheckBoxChange = (id, departmentsMod) => (event) => {
    const { departmentList, departments } = this.props.state.selectedAuction;
    const clickedDepartment = departmentList.filter(d => d.departmentID === id);
    const removeIndex = departmentsMod.map(d => d.departmentID).indexOf(id);
    const selectedDepartments = removeIndex === -1
      ? departmentsMod.concat(clickedDepartment)
      : R.remove(removeIndex, 1, departmentsMod);

    this.props.actions.editDetails(
      'departments',
      selectedDepartments.map(
        d => ({
          departmentID: d.departmentID,
          departmentName: d.departmentName
        })
      )
    );
  }

  handleToggle = name => (event) => {
    this.props.actions.editDetails(name, event.target.checked);
  }

  onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        this.props.actions.setUploadImage('auctionBannerImage',
          {
            name: file.name,
            preview: file.preview,
            file: file
          }
        );
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });

    setTimeout(() => {
      this.props.actions.uploadAuctionBannerSubmit();
    }, 2000);
  }

  imageRemove = name => (event) => {
    this.props.actions.editDetails(name, '');
    this.props.actions.clearUploadImage(name);
  }

  render() {
    // console.log('General Details render(): ', this.props, this.state)
    const { classes } = this.props
    const {
      selectedAuction,
      uploadImage
    } = this.props.state;
    const {
      cloudinaryBannerVersion,
      departments,
      departmentList,
      enableCuratedAuction,
      enableOnlineCatalogue,
      endSale,
      isCalendar,
      isMixedAuction,
      makeLive,
      saleNumber,
      showAdvanceBidButton,
      showCatalogueDownloadLink,
      showConditionReport,
      showInquireButton,
      showRegistrationLink,
      showSaleOffers,
      showShippingLink,
      showSoldPrice,
      showWebDescription,
      useCloudinary
    } = selectedAuction;

    const departmentsMod = departments.map(d => ({ ...d, checked: true }));
    const departmentsWithChecked = R.sortBy(
      R.prop('departmentID'),
      R.unionWith(
        R.eqProps('departmentID'),
        departmentsMod,
        departmentList
      )
    );

    //generate csvdata for csv export
    let csvData = [];
    let displayDownloadLink = false;
    if (this.props.state.lots
      && this.props.state.lots.lots
      && this.props.state.lots.lots.length > 0
      && this.props.state.lots.lots[0].saleNumber === saleNumber) {
      csvData = this.props.state.lots.lots
        .map(lot => ({ link: `${lot.detailLink}?utm_source=qr&utm_medium=lot_card&utm_campaign=${saleNumber},${lot.lotNumberFull}` }))
      displayDownloadLink = true;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid className={classes.outlined} item container xs={6} spacing={24}>
            <Grid item xs={12}>
              <TextField
                id="auctionTitle"
                label="Auction Title"
                className={classes.textField}
                margin="normal"
                fullwidth="true"
                style={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.props.state.selectedAuction.auctionTitle}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="alternativeAuctionTitle"
                label="Alternative Auction Title"
                className={classes.textField}
                margin="normal"
                fullwidth="true"
                style={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.props.state.selectedAuction.alternativeAuctionTitle}
                onChange={this.handleChange('alternativeAuctionTitle')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="startDate"
                label="Start Date"
                type="datetime-local"
                className={classes.textField}
                margin="normal"
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.props.state.selectedAuction.startDate}
                onChange={this.handleChange('startDate')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="endDate"
                label="End Date"
                type="datetime-local"
                className={classes.textField}
                margin="normal"
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.props.state.selectedAuction.endDate}
                onChange={this.handleChange('endDate')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="select-bid-partner"
                select
                style={{ width: 230 }}
                label="Auction Bid Partner"
                className={classes.textField}
                value={this.props.state.selectedAuction.auctionBidPartner}
                onChange={this.handleChange('auctionBidPartner')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
              >
                {bidPartners.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="select-associatedAuctions"
                select
                label="Auction Type"
                style={{ width: 230 }}
                className={classes.textField}
                value={this.props.state.selectedAuction.saleTypeID}
                onChange={this.handleChange('saleTypeID')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
              >
                {saleTypes.map(type => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.saleType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid className={classes.outlined} item container xs={5} spacing={24}>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={isCalendar ? true : false}
                        onChange={this.handleToggle('isCalendar')}
                        color="primary"
                      />
                    )}
                    label="Is Calendar"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={makeLive ? true : false}
                        onChange={this.handleToggle('makeLive')}
                        color="primary"
                      />
                    )}
                    label="Is Live"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={enableOnlineCatalogue ? true : false}
                        onChange={this.handleToggle('enableOnlineCatalogue')}
                        color="primary"
                      />
                    )}
                    label="Enable Online Catalogue"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={useCloudinary ? true : false}
                        onChange={this.handleToggle('useCloudinary')}
                        color="primary"
                      />
                    )}
                    label="Use Cloudinary"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={endSale ? true : false}
                        onChange={this.handleToggle('endSale')}
                        color="primary"
                      />
                    )}
                    label="End Sale"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={showSoldPrice ? true : false}
                        onChange={this.handleToggle('showSoldPrice')}
                        color="primary"
                      />
                    )}
                    label="Show Sold Label"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={showConditionReport ? true : false}
                        onChange={this.handleToggle('showConditionReport')}
                        color="primary"
                      />
                    )}
                    label="Show Condition Report"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={showWebDescription ? true : false}
                        onChange={this.handleToggle('showWebDescription')}
                        color="primary"
                      />
                    )}
                    label="Show Web Description"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={showAdvanceBidButton ? true : false}
                        onChange={this.handleToggle('showAdvanceBidButton')}
                        color="primary"
                      />
                    )}
                    label="Show Advance Bid Button"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={enableCuratedAuction ? true : false}
                        onChange={this.handleToggle('enableCuratedAuction')}
                        color="primary"
                      />
                    )}
                    label="Enable Curated Auction"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={showRegistrationLink ? true : false}
                        onChange={this.handleToggle('showRegistrationLink')}
                        color="primary"
                      />
                    )}
                    label="Show Registration Link"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={showInquireButton ? true : false}
                        onChange={this.handleToggle('showInquireButton')}
                        color="primary"
                      />
                    )}
                    label="Show Inquire Button"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={showShippingLink ? true : false}
                        onChange={this.handleToggle('showShippingLink')}
                        color="primary"
                      />
                    )}
                    label="Show Shipping Link"
                  />
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={isMixedAuction ? true : false}
                        onChange={this.handleToggle('isMixedAuction')}
                        color="primary"
                      />
                    )}
                    label="Is Mixed Auction"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container xs={12} spacing={8} className={classes.outlined}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Sale Options</Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              className={classes.textField}
              id="saleOfferThreshold"
              label="Sale Threshold (%)"
              margin="normal"
              required
              style={{ width: 230 }}
              type="number"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.props.state.selectedAuction.saleOfferThreshold}
              onChange={this.handleChange('saleOfferThreshold')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              className={classes.textField}
              id="saleOfferEndDate"
              label="Sale Offer End Date"
              margin="normal"
              style={{ width: 230 }}
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={
                this.props.state.selectedAuction.saleOfferEndDate != null
                  ? this.props.state.selectedAuction.saleOfferEndDate
                  : ''}
              onChange={this.handleChange('saleOfferEndDate')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset">
              <FormControlLabel
                variant="outlined"
                control={(
                  <Switch
                    checked={showSaleOffers ? true : false}
                    onChange={this.handleToggle('showSaleOffers')}
                    color="primary"
                  />
                )}
                label="Show Sale Offers"
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={8}>
          <Grid item xs={12} md={3}>
            <Grid item xs={12} md={12} className={classes.outlined}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Departments:</FormLabel>
                <FormGroup>
                  {departmentsWithChecked.map(department => (
                    <FormControlLabel
                      className={classes.marginReduce}
                      key={department.departmentID}
                      control={(
                        <Checkbox
                          key={department.departmentID}
                          color="primary"
                          checked={department.checked}
                          onChange={this.handleCheckBoxChange(department.departmentID, departmentsMod)}
                          value={department.departmentName}
                        />
                      )}
                      label={department.departmentName}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
            {displayDownloadLink
              ?
              <Fragment>
                <Divider />
                <Grid item xs={12} md={12} className={`${classes.qrCampaignContainer} ${classes.outlined}`}>
                  <CSVLink data={csvData} filename={`${saleNumber}_links.csv`} className={classes.prettyLink}>Download QR Campaign lot URLs</CSVLink>
                </Grid>
              </Fragment>
              : null}
          </Grid>
          <Grid item xs={12} md={8} className={classes.outlined}>
            <label htmlFor="auctionBannerImage">
              <Dropzone
                className={classes.dropzone}
                onDrop={files => this.onDrop(files)}>
                <div>Drop files here, or click to select files to upload.</div>
              </Dropzone>
              <div>
                Image preview:
                <br />
                {cloudinaryBannerVersion.length === 0
                  ? ''
                  : (<div className="image-preview">
                    <img
                      alt="Image Preview"
                      className={classes.previewArea}
                      src={cloudinaryConfig.url(
                        `/auctions/${saleNumber}/${saleNumber}.jpg`,
                        {
                          'transformation': 'Website_AuctionPastBannerGallery',
                          'version': cloudinaryBannerVersion
                        }
                      )}
                    />
                  </div>)
                }
              </div>
            </label>
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              id="cloudinaryBannerVersion"
              label="Cloudinary Banner version"
              className={classes.textField, classes.cloudinaryBannerVersion}
              margin="normal"
              fullwidth="true"
              style={{ width: '100%' }}
              InputLabelProps={{
                shrink: true,
              }}
              value={cloudinaryBannerVersion}
              disabled
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

// NY050516


GeneralDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  // auctionInfo: PropTypes.object.isRequired
}

export default withStyles(styles)(GeneralDetails)
