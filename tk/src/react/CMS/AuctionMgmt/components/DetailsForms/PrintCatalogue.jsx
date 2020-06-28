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
  previewArea: {
    maxHeight: '200px'
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
  }
});

class PrintCatalogue extends React.Component {
  state = {}

  handleChange = name => (event) => {
    // Have to set both internal state and store value
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editDetails(name, event.target.value);
  }

  handleToggle = name => (event) => {
    this.props.actions.editDetails(name, event.target.checked);
  }

  onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.props.actions.setUploadImage('catalogueCoverImage',
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

    setTimeout(() => {
      this.props.actions.uploadCatalogCoverSubmit();
    }, 2000);
  }

  imageRemove = name => (event) => {
    this.props.actions.editDetails(name, '');
    this.props.actions.clearUploadImage(name);
  }

  render() {
    // console.log('PrintCatalogue render(): ', this.props);
    const { classes } = this.props;
    const { selectedAuction, uploadImage } = this.props.state;
    const {
      catalogueCode, // string
      catalogueCoverImage, // string for image file
      catalogueDigitalUrl, // string
      cataloguePrice, // int
      catalogueSetText, // string
      showCatalogueDownloadLink, // bool
      showPrintCatalogueSection, // bool
      showBuyButton // bool
    } = selectedAuction;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid className={classes.outlined} item container xs={6} spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField
                id="catalogueDigitalUrl"
                label="Catalogue Digital Url"
                className={classes.textField}
                margin="normal"
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={catalogueDigitalUrl}
                onChange={this.handleChange('catalogueDigitalUrl')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="catalogueCode"
                label="Catalogue Code"
                className={classes.textField}
                margin="normal"
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={catalogueCode}
                onChange={this.handleChange('catalogueCode')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="catalogueSetText"
                label="Catalogue Set Message"
                className={classes.textField}
                margin="normal"
                style={{ width: 230 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={catalogueSetText}
                onChange={this.handleChange('catalogueSetText')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="cataloguePrice"
                label="Catalog Price"
                margin="normal"
                required
                style={{ width: 230 }}
                type="number"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                value={cataloguePrice}
                onChange={this.handleChange('cataloguePrice')}
              />
            </Grid>
          </Grid>
          <Grid className={classes.outlined} item container xs={5} spacing={24}>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={showPrintCatalogueSection ? true : false}
                        onChange={this.handleToggle('showPrintCatalogueSection')}
                        color="primary"
                      />
                    )}
                    label="Show Print Catalog Section"
                  />
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={showCatalogueDownloadLink ? true : false}
                        onChange={this.handleToggle('showCatalogueDownloadLink')}
                        color="primary"
                      />
                    )}
                    label="Show Catalogue Download Link"
                  />
                </FormGroup>
                <FormControlLabel
                  control={(
                    <Switch
                      checked={showBuyButton ? true : false}
                      onChange={this.handleToggle('showBuyButton')}
                      color="primary"
                    />
                  )}
                  label="Show Buy Catalogue Button"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid item container xs={12} spacing={8} className={classes.outlined}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="catalogueCoverImage"
                label="Catalogue Cover Image Url"
                className={classes.textField}
                margin="normal"
                fullwidth="true"
                style={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true
                }}
                value={catalogueCoverImage}
                onChange={this.handleChange('catalogueCoverImage')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label htmlFor="catalogueCoverImage">
                <Dropzone
                  className={classes.dropzone}
                  onDrop={files => this.onDrop(files)}
                >
                  <div>Drop files here, or click to select files to upload.</div>
                </Dropzone>
                <div>
                  Image preview:
                  <br />
                  {uploadImage.catalogueCoverImage.preview.length === 0
                    ? catalogueCoverImage.length === 0
                      ? ''
                      : (
                        <div className="image-preview">
                          <i
                            className="material-icons"
                            onClick={this.imageRemove('catalogueCoverImage')}
                            role="none"
                          >
                            highlight_off
                          </i>
                          <img
                            alt="Cover Preview"
                            className={classes.previewArea}
                            src={catalogueCoverImage}
                          />
                        </div>
                      )
                    : (
                      <div className="image-preview">
                        <i
                          className="material-icons"
                          onClick={this.imageRemove('catalogueCoverImage')}
                          role="none"
                        >
                          highlight_off
                        </i>
                        <img
                          alt="Cover Preview"
                          className={classes.previewArea}
                          src={uploadImage.catalogueCoverImage.preview}
                        />
                      </div>
                    )}
                </div>
              </label>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}


PrintCatalogue.defaultProps = {};

PrintCatalogue.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    root: PropTypes.string,
    textField: PropTypes.string,
    previewArea: PropTypes.string,
    dropzone: PropTypes.string,
    outlined: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({
    clearUploadImage: PropTypes.func.isRequired,
    editDetails: PropTypes.func.isRequired,
    uploadCatalogCoverSubmit: PropTypes.func.isRequired
  }).isRequired,
  state: PropTypes.shape({
    selectedAuction: PropTypes.objectOf(PropTypes.object).isRequired,
    uploadImage: PropTypes.objectOf(PropTypes.object).isRequired
  }).isRequired
};


export default withStyles(styles)(PrintCatalogue);
