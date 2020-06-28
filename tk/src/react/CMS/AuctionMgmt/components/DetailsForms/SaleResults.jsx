import React from 'react';
import { PropTypes } from 'prop-types';
import Dropzone from 'react-dropzone';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

// Material UI FormGroup
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  dropzone: {
    width: '80%',
    height: '75px',
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  outlined: {
    border: '1px solid #000',
    borderRadius: '3px',
    margin: '15px',
    width: '95%'
  },
  switchLabel: {
    textAlign: 'left'
  }
});

class SaleResults extends React.Component {
  state = {}

  handleChange = name => (event) => {
    // Have to set both internal state and store value
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editDetails(name, event.target.value);
  }

  onFileDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.props.actions.setUploadFile('auctionResultsFile',
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
    // console.log('Props at fileupload: ', this.props.state)

    setTimeout(() => {
      this.props.actions.uploadSaleResultsSubmit();
    }, 2000);
  }

  handleToggle = name => (event) => {
    this.props.actions.editDetails(name, event.target.checked);
  }

  fileRemove = name => (event) => {
    this.props.actions.editDetails(name, '');
    this.props.actions.clearUploadFile(name);
  }

  render() {
    // console.log('Sale Results render(): ', this.props)
    const { classes } = this.props;
    const { selectedAuction } = this.props.state;
    const { auctionResultsFile, enableAuctionResults } = selectedAuction;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item container xs={12} spacing={8} className={classes.outlined}>
            <Grid item xs={12} sm={4}>
              <TextField
                id="auctionResultsFile"
                label="Auction Results File Url"
                className={classes.textField}
                margin="normal"
                fullwidth="true"
                style={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true
                }}
                value={auctionResultsFile}
                onChange={this.handleChange('auctionResultsFile')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <label htmlFor="auctionResultsFile">
                <Dropzone
                  className={classes.dropzone}
                  onDrop={files => this.onFileDrop(files)}
                >
                  <div>Drop files here, or click to select files to upload.</div>
                </Dropzone>
              </label>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    className={classes.switchLabel}
                    control={(
                      <Switch
                        checked={enableAuctionResults ? true : false}
                        onChange={this.handleToggle('enableAuctionResults')}
                        color="primary"
                      />
                    )}
                    label="Enable Auction Results"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SaleResults.defaultProps = {};

SaleResults.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    dropzone: PropTypes.string,
    outlined: PropTypes.string,
    root: PropTypes.string,
    switchLabel: PropTypes.string,
    textField: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    clearUploadFile: PropTypes.func.isRequired,
    editDetails: PropTypes.func.isRequired,
    uploadSaleResultsSubmit: PropTypes.func.isRequired
  }).isRequired,
  state: PropTypes.shape({
    selectedAuction: PropTypes.objectOf(PropTypes.object).isRequired
  }).isRequired
};


export default withStyles(styles)(SaleResults);
