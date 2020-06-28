import React from 'react';
import { PropTypes } from 'prop-types';

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

import { renameKeys } from '../../Shared/lib/util';

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

class UserManagementDetails extends React.Component {
  state = {
    deleteConfirmDialog: false
  }

  componentWillMount() {
    const locations = JSON.parse(localStorage.getItem('locations'));
    this.setState({ locations: locations });

    const allDepartments = JSON.parse(localStorage.getItem('allDepartments'));
    this.setState({ departments: allDepartments });

    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  handleChange = editedField => (event) => {
    const { selectedUser } = this.props.state.users;
    this.props.actions.editUser(selectedUser, editedField, event.target.value);
  }

  handleAddressChange = editedField => (event) => {
    const { selectedUser } = this.props.state.users;
    this.props.actions.editUserAddress(selectedUser, editedField, event.target.value);
  }

  handleToggle = editedField => (event) => {
    const { selectedUser } = this.props.state.users;
    this.props.actions.editUser(selectedUser, editedField, event.target.checked);
  }

  handleDropdownChange = (editedField, list) => (event) => {
    const newCountryKey = { countryId: 'countryID' };
    const newStateKey = { stateId: 'stateID' };
    const { selectedUser } = this.props.state.users;
    const { userAddress } = selectedUser;
    const dropdownItemName = event.target.value;
    const dropdownItem = this.props.state.users[list].find(
      l => l[editedField] === dropdownItemName
    );

    this.props.actions.editUserDropdowns(
      selectedUser,
      userAddress,
      editedField === 'countryDesc'
        ? renameKeys(dropdownItem, newCountryKey)
        : dropdownItem.countryId === 232
          ? renameKeys(dropdownItem, newStateKey)
          : { ...renameKeys(dropdownItem, newStateKey), province: dropdownItem.stateCode }
    );
  }

  handleSaveUser = () => {
    this.props.actions.userUpdateSubmit();
  }

  render() {
    // console.log('User Details render(): ', this.props, this.state);
    const { classes } = this.props;
    const {
      countries,
      states,
      selectedUser,
      progressIndicator,
      userEdited
    } = this.props.state.users;
    const {
      company,
      email,
      favoriteLots,
      faxCountryCode,
      faxNumber,
      faxNumberLocal,
      firstName,
      followedMakers,
      id,
      isActive,
      lastName,
      lotLists,
      messageCategories,
      newEmail,
      phoneCountryCode,
      phoneNumber,
      phoneNumberLocal,
      showLocation,
      stripeCardToken,
      stripeInfo,
      testUser,
      title,
      userAddress,
      userName
    } = selectedUser;
    const {
      address1,
      address2,
      city,
      countryCode,
      countryDesc,
      countryID,
      intlPostalCode,
      province,
      stateCode,
      stateDesc,
      stateID,
      zipCode
    } = userAddress;

    return (
      <div>
        <h2>User Details</h2>
        {progressIndicator
          ? <LinearProgress />
          : <div className={classes.progressPlaceholder}>&nbsp;</div>
        }
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          {progressIndicator || testUser ? <div className={classes.progressOverlay} /> : null}
          <div className={classes.topBar}>
            <p className={classes.instructions}>
              &nbsp;
            </p>
            <div>
              <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.handleSaveUser}
                color='primary'
                disabled={!userEdited}
              >
                Save User
              </Button>
            </div>
          </div>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h3>{`${firstName} ${lastName}`}</h3>
            </Grid>
            <Grid item container xs={6} spacing={24}>
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
                  required
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
                  required
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
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  label="New Email"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={newEmail === null ? undefined : newEmail}
                  onChange={this.handleChange('newEmail')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="phoneNumber"
                  label="Phone Number"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={phoneNumber === null ? undefined : phoneNumber}
                  onChange={this.handleChange('phoneNumber')}
                />
              </Grid>
              <Grid item xs={12} className={classes.outlined}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      className={classes.switchLabel}
                      control={(
                        <Switch
                          checked={isActive ? true : false}
                          onChange={this.handleToggle('isActive')}
                          color="primary"
                        />
                      )}
                      label="Is Active?"
                    />
                    <FormControlLabel
                      className={classes.switchLabel}
                      control={(
                        <Switch
                          checked={showLocation ? true : false}
                          onChange={this.handleToggle('showLocation')}
                          color="primary"
                        />
                      )}
                      label="Show Location"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container xs={6} spacing={24}>
              <Grid item xs={12} className={classes.outlined}>
                <Grid item xs={12}>
                  <TextField
                    id="select-location"
                    select
                    label="Country"
                    style={{ width: '80%' }}
                    className={classes.textField}
                    value={countryDesc}
                    onChange={
                      this.handleDropdownChange(
                        'countryDesc',
                        'countries'
                      )
                    }
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    margin="normal"
                    required
                  >
                    {countries.map(country => (
                      <MenuItem key={country.countryId} value={country.countryDesc}>
                        {country.countryDesc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="addressOne"
                    label="Address 1"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: '80%' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={address1}
                    onChange={this.handleAddressChange('address1')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="addressTwo"
                    label="Address 2"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: '80%' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={address2}
                    onChange={this.handleAddressChange('address2')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="city"
                    label="City"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: '80%' }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={city}
                    onChange={this.handleAddressChange('city')}
                    required
                  />
                </Grid>
                {countryID !== 232 && countryID !== 37
                  ? (<Grid item xs={12}>
                      <TextField
                        id="Province"
                        label="Province"
                        className={classes.textField}
                        margin="normal"
                        style={{ width: '80%' }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={province}
                        onChange={this.handleAddressChange('province')}
                      />
                    </Grid>)
                  : null }
                {countryID === 232 || countryID === 37
                  ? (<Grid item xs={12}>
                      <TextField
                        id="select-location"
                        select
                        label="State/Province"
                        style={{ width: '80%' }}
                        className={classes.textField}
                        value={stateDesc}
                        onChange={
                          this.handleDropdownChange(
                            'stateDesc',
                            'states'
                          )
                        }
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        margin="normal"
                      >
                        {states.map(state => (state.countryId === countryID ?
                          (<MenuItem key={state.stateId} value={state.stateDesc}>
                            {state.stateDesc}
                          </MenuItem>) : null
                        ))}
                      </TextField>
                    </Grid>)
                  : null }
                {countryID === 232 || countryID === 37
                  ? (<Grid item xs={12}>
                    <TextField
                      id="zipCode"
                      label="Zip Code"
                      className={classes.textField}
                      margin="normal"
                      style={{ width: '80%' }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={zipCode}
                      onChange={this.handleAddressChange('zipCode')}
                    />
                  </Grid>)
                : null }
                {countryID !== 232 && countryID !== 37
                  ? (<Grid item xs={12}>
                      <TextField
                        id="intlPostalCode"
                        label="Postal Code"
                        className={classes.textField}
                        margin="normal"
                        style={{ width: '80%' }}
                        InputLabelProps={{
                          shrink: true
                        }}
                        value={intlPostalCode}
                        onChange={this.handleAddressChange('intlPostalCode')}
                      />
                    </Grid>)
                : null }
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

UserManagementDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    userUpdateSubmit: PropTypes.func.isRequired,
    updateBaseUrl: PropTypes.func.isRequired,
    editUserDropdowns: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired
  }).isRequired
};

UserManagementDetails.defaultProps = {

};

export default withStyles(styles)(UserManagementDetails);
