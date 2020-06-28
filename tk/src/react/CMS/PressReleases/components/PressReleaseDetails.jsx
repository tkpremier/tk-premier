import React from 'react';
import { PropTypes } from 'prop-types';
import { Cloudinary } from 'cloudinary-core';
import Dropzone from 'react-dropzone';
import * as R from 'ramda';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

// Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Material UI FormGroup
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ReactCkeditor from '../../../components/reactckeditor';
import { renameKeys, slugify } from '../../Shared/lib/util';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
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
  }
});

class PressReleaseDetails extends React.Component {
  state = {
    locations: [],
    deleteConfirmDialog: false,
    urlChangeDialog: false,
    alreadyWarned: false
  }

  componentWillMount() {
    const locations = JSON.parse(localStorage.getItem('locations'));
    this.setState({ locations: locations });

    const newKeys = { key: 'departmentID', value: 'departmentName' };
    const departmentsLS = JSON.parse(localStorage.getItem('departments'));
    this.props.actions.setDepartmentList(departmentsLS.map(e => ({ ...renameKeys(e, newKeys), checked: false })));

    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  handleChange = (name) => (event) => {
    const { selectedPressRelease } = this.props.state.pressReleases;
    // Have to set both internal state and store value for dropdown
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editPressRelease(selectedPressRelease, name, event.target.value);
  }

  handleUrlChange = (name) => (event) => {
    const { selectedPressRelease } = this.props.state.pressReleases;
    const filteredUrl = slugify(event.target.value);
    this.props.actions.editPressRelease(selectedPressRelease, name, filteredUrl);
  }

  checkUrlChange = (date) => (event) => {
    const today = new Date();
    console.log('Checking date: ', today, date)
    today.toISOString().split('T')[0] > date.split('T') && this.state.alreadyWarned === false
      ? this.urlChangeDialogOpen()
      : null;
  }

  handleLocationDropdownChange = () => (event) => {
    const { selectedPressRelease } = this.props.state.pressReleases;
    const locationName = event.target.value;
    const location = this.state.locations.find(l => l.value === locationName);
    this.props.actions.setLocationInfo(selectedPressRelease, location.value, location.key);
  }

  handleCheckBoxChange = (id, departmentsMod) => (event) => {
    const { selectedPressRelease, departmentList } = this.props.state.pressReleases;
    const clickedDepartment = departmentList.filter(d => d.departmentID === id);
    const removeIndex = departmentsMod.map(d => d.departmentID).indexOf(id);
    const selectedDepartments = removeIndex === -1
      ? departmentsMod.concat(clickedDepartment)
      : R.remove(removeIndex, 1, departmentsMod);

    this.props.actions.editPressRelease(
      selectedPressRelease,
      'departments',
      selectedDepartments.map(d => ({
        departmentID: d.departmentID,
        departmentName: d.departmentName
      }))
    );
  }

  onFileDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        this.props.actions.setUploadFile('pressReleasePDF',
          {
            name: file.name,
            preview: file.preview,
            file: file
          }
        );
      }
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    })
    // console.log('Props at fileupload: ', this.props.state)

    setTimeout(() => {
      this.props.actions.uploadPressReleasePDFSubmit();
    }, 2000);
  }

  fileRemove = (name) => {
    this.props.actions.editDetails(name, '');
    this.props.actions.clearUploadFile(name);
  }

  handleToggle = (name) => (event) => {
    this.props.actions.editDetails(name, event.target.checked);
  }

  handleNewRelease = () => {
    this.props.actions.clearSelectedPressRelease();
  }

  handleSaveRelease = () => {
    this.props.actions.pressReleaseArticleUpdateSubmit();
  }

  handleDeleteRelease = () => {
    if (this.props.state.pressReleases.selectedPressRelease.pressReleaseId !== 0) {
      this.props.actions.pressReleaseArticleDeleteSubmit();

      this.setState({ deleteConfirmDialog: false });
    }
  }

  deleteConfirmOpen = () => {
    this.setState({ deleteConfirmDialog: true });
  }

  deleteConfirmClose = () => {
    this.setState({ deleteConfirmDialog: false });
  }

  urlChangeDialogOpen = () => {
    this.setState({ urlChangeDialog: true });
    this.setState({ alreadyWarned: true });
  }

  urlChangeDialogClose = () => {
    this.setState({ urlChangeDialog: false });
  }

  render() {
    // console.log('Press Release Details render(): ', this.props)
    const { classes } = this.props;
    const { editPressRelease } = this.props.actions;
    const {
      selectedPressRelease,
      progressIndicator,
      departmentList
    } = this.props.state.pressReleases;
    const {
      title,
      eventDate,
      metaKeywords,
      metaDescription,
      summary,
      body,
      locationName,
      departments,
      pdfSource,
      url
    } = selectedPressRelease;

    const departmentsMod = departments.map(d => ({ ...d, checked: true }))
    const departmentsWithChecked = R.sortBy(
      R.prop('departmentID'),
      R.unionWith(R.eqProps('departmentID'),
      departmentsMod,
      departmentList)
    );

    return (
      <div>
        <h2>Press Release Details</h2>
        {progressIndicator
          ? <LinearProgress />
          : <div className={classes.progressPlaceholder}>&nbsp;</div>
        }
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          {progressIndicator ? <div className={classes.progressOverlay} /> : null}
          <div className={classes.topBar}>
            <p className={classes.instructions}>
              &nbsp;
            </p>
            <div>
              <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.handleSaveRelease}
                color='primary'
              >
                Save Release
              </Button>
              <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.handleNewRelease}
              >
                New Release
              </Button>
              <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.deleteConfirmOpen}
                color='secondary'
              >
                Delete Release
              </Button>
            </div>
          </div>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h3>{title}</h3>
            </Grid>
            <Grid item container xs={6} spacing={24}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  label="Title"
                  className={classes.textField}
                  margin="normal"
                  fullwidth="true"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={title}
                  onChange={this.handleChange('title')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="eventDate"
                  label="Event Date"
                  type="datetime-local"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={eventDate}
                  onChange={this.handleChange('eventDate')}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={6} spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="metaKeywords"
                  label="Meta Keywords"
                  className={classes.textField}
                  margin="normal"
                  fullwidth="true"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    metaKeywords !== null
                      ? metaKeywords
                      : ''
                  }
                  onChange={this.handleChange('metaKeywords')}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="url"
                  label="Url Slug"
                  className={classes.textField}
                  margin="normal"
                  fullwidth="true"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    url !== null
                      ? url
                      : ''
                  }
                  onChange={this.handleChange('url')}
                  onClick={this.checkUrlChange(eventDate)}
                  onBlur={this.handleUrlChange('url')}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="metaDescription"
                  label="Meta Description"
                  className={classes.textField}
                  margin="normal"
                  fullwidth="true"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    metaDescription !== null
                      ? metaDescription
                      : ''
                  }
                  onChange={this.handleChange('metaDescription')}
                />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item container xs={12} sm={6} spacing={24}>
                <Grid item xs={12}>
                  <TextField
                    id="select-location"
                    select
                    label="Location"
                    style={{ width: '60%' }}
                    className={classes.textField}
                    value={locationName}
                    onChange={this.handleLocationDropdownChange()}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                  >
                    {this.state.locations.map(location => (
                      <MenuItem key={location.key} value={location.value}>
                        {location.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Departments:</FormLabel>
                    <FormGroup>
                      {departmentsWithChecked.map(department => (
                        <FormControlLabel
                          className={classes.marginReduce}
                          key={department.departmentID}
                          control={
                            <Checkbox
                              key={department.departmentID}
                              color='primary'
                              checked={department.checked}
                              onChange={this.handleCheckBoxChange(department.departmentID, departmentsMod)}
                              value={department.departmentName} />
                            }
                          label={department.departmentName}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={6} spacing={24}>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  {title === 'New Press Release' ? <div className={classes.progressOverlay} /> : null}
                  <Typography className={classes.heading}>Release PDF:</Typography>
                  <label htmlFor="pressPDF">
                    <Dropzone
                      className={classes.dropzone}
                      onDrop={ (files) => this.onFileDrop(files) }>
                      <div>Drop files here, or click to select files to upload.</div>
                    </Dropzone>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  {pdfSource !== null && pdfSource.length > 0
                    ? (<div>
                        <Typography className={classes.heading}>
                          PDF FileName: <br />
                          {pdfSource.charAt(0) === 'h'
                          ? pdfSource.split('/').reverse()[0]
                          : ''}
                        </Typography>
                      </div>)
                    : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item container xs={12} spacing={24}>
                <Grid item xs={12}>
                  &nbsp;
                </Grid>
                <Grid item xs={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={10}>
                  <hr />
                  <Typography className={classes.heading}>Release Summary</Typography>
                  <br />
                  <ReactCkeditor
                    className={classes.summaryEditor}
                    data={{
                      type: 'markup',
                      propValue: summary
                    }}
                    editorId={`summary-editor${Math.floor(Math.random() * 1000)}`}
                    ref='htmlEditor'
                    onBlur={data => editPressRelease(selectedPressRelease, 'summary', data)}
                  />
                </Grid>
                <Grid item xs={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={10}>
                  <hr />
                  <Typography className={classes.heading}>Release Body</Typography>
                  <br />
                  <ReactCkeditor
                    className={classes.bodyEditor}
                    data={{
                      type: 'markup',
                      propValue: body
                    }}
                    useImageUploader={true}
                    imageUploadType="PressImages"
                    ref='htmlEditor'
                    editorId={`body-editor${Math.floor(Math.random() * 1000)}`}
                    onBlur={data => editPressRelease(selectedPressRelease, 'body', data)}
                  />
                  <hr />
                </Grid>
                <Grid item xs={1}>
                  &nbsp;
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Dialog
          open={this.state.deleteConfirmDialog}
          keepMounted
          onClose={this.deleteConfirmClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'Delete Press Release'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure? This will permanently delete this press release.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteRelease} color="primary">
              Confirm
            </Button>
            <Button onClick={this.deleteConfirmClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.urlChangeDialog}
          keepMounted
          onClose={this.urlChangeDialogClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'Change Url After Event Date?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This event date has passed, changing the url now may mean
              that the press release will become inaccessible to anyone
              who follows the previously published link.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.urlChangeDialogClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

PressReleaseDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

PressReleaseDetails.defaultProps = {

};

export default withStyles(styles)(PressReleaseDetails);
