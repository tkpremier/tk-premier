import React from 'react';
import { PropTypes } from 'prop-types';
import * as R from 'ramda';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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

import ReactCkeditor from '../../../components/reactckeditor';

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

class MakerBioDetails extends React.Component {
  state = {
    deleteConfirmDialog: false,
    urlChangeDialog: false,
    alreadyWarned: false
  }

  componentWillMount() {
    this.props.actions.updateBaseUrl(document.body.dataset.domain);
  }

  handleChange = (name) => (event) => {
    const { selectedMakerBio } = this.props.state.makerBios;
    // Have to set both internal state and store value for dropdown
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editMakerBio(selectedMakerBio, name, event.target.value);
  }

  handleToggle = (name) => (event) => {
    const { selectedMakerBio } = this.props.state.makerBios;
    this.props.actions.editMakerBio(selectedMakerBio, name, event.target.checked);
  }

  handleEditInsight = (insightId) => (event) => {
    const { selectedMakerBio } = this.props.state.makerBios;
    const { insights } = selectedMakerBio;
    console.log('editing insight: ', selectedMakerBio, insightId, event);

    const newInsightsList = insights.map(insight => {
      return (insight.insightId === insightId) ? { ...insight, 'insight': event } : insight
    });

    this.props.actions.editMakerBio(selectedMakerBio, 'insights', newInsightsList);
  }

  handleAddInsight = (event) => {
    const { selectedMakerBio } = this.props.state.makerBios;
    const insights = selectedMakerBio.insights.concat({
      insightId: 0,
      insight: 'Maker insight text'
    });

    this.props.actions.editMakerBio(selectedMakerBio, 'insights', insights);
    this.props.actions.makerBioUpdateSubmit();
  }

  handleDeleteInsight = (insightId) => (event) => {
    const { selectedMakerBio } = this.props.state.makerBios;
    const { insights } = selectedMakerBio;
    const newInsightsList = insights.filter(insight => {
      return (insight.insightId !== insightId);
    });

    this.props.actions.editMakerBio(selectedMakerBio, 'insights', newInsightsList);
  }

  handleSaveBio = () => {
    this.props.actions.makerBioUpdateSubmit();
  }

  // handleDeleteBio = () => {
  //   this.props.actions.deleteMakerBio();
  // }
  //
  // deleteConfirmOpen = () => {
  //   this.setState({ deleteConfirmDialog: true });
  // }
  //
  // deleteConfirmClose = () => {
  //   this.setState({ deleteConfirmDialog: false });
  // }

  render() {
    // console.log('Maker Bio Details render(): ', this.props);
    const { classes } = this.props;
    const { editMakerBio } = this.props.actions;
    const {
      selectedMakerBio,
      progressIndicator
    } = this.props.state.makerBios;
    const {
      biography,
      birthYear,
      deathYear,
      firstQuote,
      insights,
      isConsignmentMaker,
      isFeatured,
      landingDescription,
      lotNumber,
      lotNumberSuffix,
      makerId,
      makerName,
      nationality,
      saleNumber,
      secondQuote
    } = selectedMakerBio;

    return (
      <div>
        <h2>Maker Bio Details</h2>
        {progressIndicator
          ? <LinearProgress />
          : <div className={classes.progressPlaceholder}>&nbsp;</div>
        }
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          {progressIndicator || makerName === 'Maker Name' ? <div className={classes.progressOverlay} /> : null}
          <div className={classes.topBar}>
            <p className={classes.instructions}>
              &nbsp;
            </p>
            <div>
              <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.handleSaveBio}
                color='primary'
              >
                Save Bio
              </Button>
              { /* <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.handleNewBio}
              >
                New Bio
              </Button>
              <Button
                variant="contained"
                component="span"
                className={classes.button, classes.addButton}
                onClick={this.deleteConfirmOpen}
                color='secondary'
              >
                Delete Bio
              </Button> */ }
            </div>
          </div>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h3>{makerName}</h3>
            </Grid>
            <Grid item container xs={6} spacing={24}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="makerId"
                  label="Maker Id"
                  className={classes.textField}
                  margin="normal"
                  fullwidth="true"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={makerId}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="makerName"
                  label="Maker Name"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={makerName}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="saleNumber"
                  label="Sale Number"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={saleNumber}
                  onChange={this.handleChange('saleNumber')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lotNumber"
                  label="Lot Number"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={lotNumber}
                  onChange={this.handleChange('lotNumber')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lotNumberSuffix"
                  label="Lot Number Suffix"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={lotNumberSuffix}
                  onChange={this.handleChange('lotNumberSuffix')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="nationality"
                  label="Nationality"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={nationality}
                  onChange={this.handleChange('nationality')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="birthYear"
                  label="Birth Year"
                  className={classes.textField}
                  margin="normal"
                  type="datetime-local"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={birthYear}
                  onChange={this.handleChange('birthYear')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="deathYear"
                  label="Death Year"
                  className={classes.textField}
                  margin="normal"
                  type="datetime-local"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={deathYear}
                  onChange={this.handleChange('deathYear')}
                />
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
                          checked={isFeatured ? true : false}
                          onChange={this.handleToggle('isFeatured')}
                          color="primary"
                        />
                      )}
                      label="Is Featured"
                    />
                    <FormControlLabel
                      className={classes.switchLabel}
                      control={(
                        <Switch
                          checked={isConsignmentMaker ? true : false}
                          onChange={this.handleToggle('isConsignmentMaker')}
                          color="primary"
                        />
                      )}
                      label="Use For Consignments"
                    />
                  </FormGroup>
                </FormControl>
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
                  <Typography className={classes.heading}>Biography</Typography>
                  <br />
                  <ReactCkeditor
                    className={classes.bodyEditor}
                    data={{
                      type: 'markup',
                      propValue: biography
                    }}
                    ref='htmlEditor'
                    editorId={`biography-editor${Math.floor(Math.random() * 1000)}`}
                    onBlur={data => editMakerBio(selectedMakerBio, 'biography', data)}
                  />
                  <hr />
                </Grid>
                <Grid item xs={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={10}>
                  <hr />
                  <Typography className={classes.heading}>First Quote</Typography>
                  <br />
                  <ReactCkeditor
                    className={classes.summaryEditor}
                    data={{
                      type: 'markup',
                      propValue: firstQuote
                    }}
                    editorId={`firstQuote-editor${Math.floor(Math.random() * 1000)}`}
                    ref='htmlEditor'
                    onBlur={data => editMakerBio(selectedMakerBio, 'firstQuote', data)}
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
                  <Typography className={classes.heading}>Second Quote</Typography>
                  <br />
                  <ReactCkeditor
                    className={classes.summaryEditor}
                    data={{
                      type: 'markup',
                      propValue: secondQuote
                    }}
                    editorId={`secondQuote-editor${Math.floor(Math.random() * 1000)}`}
                    ref='htmlEditor'
                    onBlur={data => editMakerBio(selectedMakerBio, 'secondQuote', data)}
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
                  <Typography className={classes.heading}>Landing Description</Typography>
                  <br />
                  <ReactCkeditor
                    className={classes.summaryEditor}
                    data={{
                      type: 'markup',
                      propValue: landingDescription
                    }}
                    editorId={`landingDescription-editor${Math.floor(Math.random() * 1000)}`}
                    ref='htmlEditor'
                    onBlur={data => editMakerBio(selectedMakerBio, 'landingDescription', data)}
                  />
                </Grid>
                <Grid item xs={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={1}>
                  &nbsp;
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              {insights === null ? [] : insights.map(insight => {
                return (
                  <Grid item container xs={12} spacing={24} key={insight.insightId}>
                    <Grid item xs={1}>
                      &nbsp;
                    </Grid>
                    <Grid item xs={10}>
                      <hr />
                      <span
                        onClick={this.handleDeleteInsight(insight.insightId)}
                        className={classes.deleteInsightButton}
                      >
                        X Delete Insight
                      </span>
                      <Typography className={classes.heading}>{`Insight ${insight.insightId}`}</Typography>
                      <br />
                      <ReactCkeditor
                        className={classes.summaryEditor}
                        data={{
                          type: 'markup',
                          propValue: insight.insight
                        }}
                        editorId={`insight-editor${Math.floor(Math.random() * 1000)}`}
                        ref='htmlEditor'
                        onBlur={this.handleEditInsight(insight.insightId)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      &nbsp;
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
            <Grid container spacing={24}>
              <Grid item container xs={12} spacing={24}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="span"
                    className={[classes.button, classes.addButton].join(' ')}
                    onClick={this.handleAddInsight}
                  >
                    Add New Insight
                  </Button>
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
            {'Delete Maker Bio'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure? This will permanently delete this maker biography.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteBio} color="primary">
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

MakerBioDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

MakerBioDetails.defaultProps = {

};

export default withStyles(styles)(MakerBioDetails);
