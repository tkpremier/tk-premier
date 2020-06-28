import React from 'react';
import { PropTypes } from 'prop-types';
import Dropzone from 'react-dropzone';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Material UI FormGroup
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PhillipsImage from '../../../PhillipsImage/PhillipsImage';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  dropzone: {
    // border: '1px solid #ccc',
    marginLeft: 'auto',
    marginRight: 'auto'
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  outlined: {
    border: '1px solid #000',
    borderRadius: '3px',
    margin: '15px',
    width: '95%'
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
  deleteInsightButton: {
    top: '28px',
    right: 0,
    left: '42%',
    border: 'solid 1px #ddd',
    borderRadius: '3px',
    padding: '8px',
    position: 'relative',
    cursor: 'pointer'
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

class TeamMemberDetails extends React.Component {
  state = {
    deleteConfirmDialog: false,
    locations: [],
    departments: [],
    teamMemberTypes: []
  }

  componentWillMount() {
    const locations = JSON.parse(localStorage.getItem('locations'));
    this.setState({ locations: locations });

    const allDepartments = JSON.parse(localStorage.getItem('allDepartments'));
    this.setState({ departments: allDepartments });

    const teamMemberTypes = JSON.parse(localStorage.getItem('teamMemberTypes'));
    this.setState({ teamMemberTypes: teamMemberTypes });

    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  onDrop = (acceptedFiles, teamMemberId) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.props.actions.teamMembersSetUploadImage('teamMemberImageUpload',
          {
            name: file.name,
            preview: file.preview,
            file: file,
            teamMemberId: teamMemberId
          }
        );
      }
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });

    setTimeout(() => {
      this.props.actions.teamMemberImageUploadSubmit();
    }, 2000);
  }

  handleChange = (name) => (event) => {
    const { selectedTeamMember } = this.props.state.teamPage;
    // Have to set both internal state and store value for dropdown
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editTeamMember(selectedTeamMember, name, event.target.value);
  }

  handleToggle = (name) => (event) => {
    const { selectedTeamMember } = this.props.state.teamPage;
    this.props.actions.editTeamMember(selectedTeamMember, name, event.target.checked);
  }

  handleDropdownChange = (item, idField, list) => (event) => {
    const { selectedTeamMember } = this.props.state.teamPage;
    const dropdownItemName = event.target.value;
    const dropdownItem = this.state[list].find(l => l.value === dropdownItemName);
    console.log('Dropdown: ', dropdownItemName, dropdownItem, event.target.value);

    this.props.actions.editTeamMemberDropdowns(
      selectedTeamMember,
      idField,
      item,
      dropdownItem.key,
      dropdownItem.value
    );
  }

  handleSaveTeamMember = () => {
    const { selectedTeamMember } = this.props.state.teamPage;
    const { email, currentEmail } = selectedTeamMember;

    if (email !== currentEmail) {
      this.props.actions.teamMemberImageUploadSubmit();
    }
    this.props.actions.teamMemberUpdateSubmit();
  }

  handleNewTeamMember = () => {
    this.props.actions.setNewTeamMember();
  }

  handleDeleteTeamMember = (teamMemberId) => (event) => {
    const { teamMembers } = this.props.state.teamPage;
    const filteredTeamMembers = teamMembers.filter(
      h => h.teamMemberId != teamMemberId
    )

    // console.log('Delete: ', filteredTeamMembers);
    this.props.actions.teamMemberDeleteSubmit();
    this.props.actions.editTeamMemberList(filteredTeamMembers);
    this.setState({ deleteConfirmDialog: false });
  }

  deleteConfirmOpen = () => {
    this.setState({ deleteConfirmDialog: true });
  }

  deleteConfirmClose = () => {
    this.setState({ deleteConfirmDialog: false });
  }

  render() {
    // console.log('Team Member Details render(): ', this.props, this.state);
    const { classes } = this.props;
    const {
      selectedTeamMember,
      progressIndicator,
      teamMemberEdited,
      teamMemberImageUpload
    } = this.props.state.teamPage;
    const {
      deleteImage,
      departmentCode,
      departmentId,
      departmentName,
      displayEmail,
      email,
      firstName,
      imageURL,
      isActive,
      isLocationDisplay,
      isTeamDisplay,
      lastName,
      locationId,
      locationName,
      phone,
      teamDisplayOrder,
      teamMemberId,
      teamMemberTypeDesc,
      title
    } = selectedTeamMember;

    return (
      <div>
        <h2>Team Member Details</h2>
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
                onClick={this.handleSaveTeamMember}
                color='primary'
                disabled={firstName === 'Team' || !teamMemberEdited}
              >
                Save Team Member
              </Button>
              <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.handleNewTeamMember}
              >
                New Team Member
              </Button>
              <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.deleteConfirmOpen}
                color='secondary'
                disabled={teamMemberId === 0}
              >
                Delete Team Member
              </Button>
            </div>
          </div>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h3>{`${firstName} ${lastName}`}</h3>
            </Grid>
            <Grid item xs={12}>
              <Dropzone
                className={classes.dropzone}
                onDrop={(files) => this.onDrop(files, teamMemberId)}
              >
                {
                  imageURL === 'https://phillips.vo.llnwd.net/v1/web_prod/team/empty-person.jpg'
                    ? <img src={teamMemberImageUpload.preview !== '' ? teamMemberImageUpload.preview : imageURL} alt="Temp image" />
                    : (<PhillipsImage
                        alt={`${firstName} ${lastName}`}
                        cloudinary
                        imagePath={imageURL}
                        transformation="EditorialHubFullWidth"
                      />
                    )
                }
              </Dropzone>
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
                    shrink: true
                  }}
                  value={title}
                  onChange={this.handleChange('title')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={email}
                  onChange={this.handleChange('email')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="firstName"
                  label="First Name"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={firstName}
                  onChange={this.handleChange('firstName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={lastName}
                  onChange={this.handleChange('lastName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="phone"
                  label="Phone"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={phone}
                  onChange={this.handleChange('phone')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="teamDisplayOrder"
                  label="Display Order"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={teamDisplayOrder}
                  onChange={this.handleChange('teamDisplayOrder')}
                />
              </Grid>
            </Grid>
            <Grid item container xs={6} spacing={24}>
              <Grid item xs={12} className={classes.outlined}>
                <Grid item xs={12}>
                  <TextField
                    id="select-location"
                    select
                    label="Team Member Type"
                    style={{ width: '60%' }}
                    className={classes.textField}
                    value={teamMemberTypeDesc}
                    onChange={
                      this.handleDropdownChange(
                        'teamMemberTypeDesc',
                        'teamMemberTypeId',
                        'teamMemberTypes'
                      )
                    }
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                  >
                    {this.state.teamMemberTypes.map(type => (
                      <MenuItem key={type.key} value={type.value}>
                        {type.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="select-location"
                    select
                    label="Location"
                    style={{ width: '60%' }}
                    className={classes.textField}
                    value={locationName}
                    onChange={
                      this.handleDropdownChange(
                        'locationName',
                        'locationId',
                        'locations'
                      )
                    }
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
                  <TextField
                    id="select-department"
                    select
                    label="Department"
                    style={{ width: '60%' }}
                    className={classes.textField}
                    value={departmentName}
                    onChange={
                      this.handleDropdownChange(
                        'departmentName',
                        'departmentId',
                        'departments'
                      )
                    }
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                  >
                    {this.state.departments.map(dep => (
                      <MenuItem key={dep.key} value={dep.value}>
                        {dep.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.outlined}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      className={classes.switchLabel}
                      control={(
                        <Switch
                          checked={isLocationDisplay ? true : false}
                          onChange={this.handleToggle('isLocationDisplay')}
                          color="primary"
                        />
                      )}
                      label="Location Display"
                    />
                    <FormControlLabel
                      className={classes.switchLabel}
                      control={(
                        <Switch
                          checked={isTeamDisplay ? true : false}
                          onChange={this.handleToggle('isTeamDisplay')}
                          color="primary"
                        />
                      )}
                      label="Team Display"
                    />
                    <FormControlLabel
                      className={classes.switchLabel}
                      control={(
                        <Switch
                          checked={isActive ? true : false}
                          onChange={this.handleToggle('isActive')}
                          color="primary"
                        />
                      )}
                      label="Active"
                    />
                    <FormControlLabel
                      className={classes.switchLabel}
                      control={(
                        <Switch
                          checked={displayEmail ? true : false}
                          onChange={this.handleToggle('displayEmail')}
                          color="primary"
                        />
                      )}
                      label="Display Email"
                    />
                  </FormGroup>
                </FormControl>
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
            {'Delete Team Member'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure? This will permanently delete this team member.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteTeamMember(teamMemberId)} color="primary">
              Confirm
            </Button>
            <Button onClick={this.deleteConfirmClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

TeamMemberDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

TeamMemberDetails.defaultProps = {

};

export default withStyles(styles)(TeamMemberDetails);
