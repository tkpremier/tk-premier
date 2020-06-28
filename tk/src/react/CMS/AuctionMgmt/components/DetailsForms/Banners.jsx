import React from 'react';
import { PropTypes } from 'prop-types';
import Dropzone from 'react-dropzone';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%'
  },
  input: {
    display: 'none'
  },
  menu: {
    width: 200
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

class Banners extends React.Component {
  state = {}

  handleChange = name => (event) => {
    // Have to set both internal state and store value
    this.setState({
      [name]: event.target.value
    });

    this.props.actions.editDetails(name, event.target.value);
  }

  onDropMobile = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.props.actions.setUploadImage('iosBannerMobile',
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
      this.props.actions.uploadiOSMobileBannerSubmit();
    }, 2000);
  }

  onDropDesktop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.props.actions.setUploadImage('iosBannerDesktop',
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
    // console.log('Props at imageupload: ', this.props.state);

    setTimeout(() => {
      this.props.actions.uploadiOSDesktopBannerSubmit();
    }, 2000);
  }

  imageRemove = name => (event) => {
    this.props.actions.editDetails(name, '');
    this.props.actions.clearUploadImage(name);
  }

  render() {
    // console.log('Banners render(): ', this.props);
    const iterator = 0;
    const {
      associatedAuctions,
      classes
    } = this.props;
    const {
      selectedAuction,
      uploadImage
    } = this.props.state;
    const {
      catalogueSetSale,
      iosBannerMobileUrl,
      iosBannerDesktopUrl
    } = selectedAuction;
    const {
      iosBannerMobile,
      iosBannerDesktop
    } = uploadImage;

    const associatedAuctionsWithId = associatedAuctions.map(
      obj => ({ saleNumber: obj, id: iterator + 1 })
    );

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item container xs={12} spacing={8} className={classes.outlined}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="iosBannerMobileUrl"
                label="iOS Banner Mobile Url"
                className={classes.textField}
                margin="normal"
                fullwidth="true"
                style={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true
                }}
                value={iosBannerMobileUrl}
                onChange={this.handleChange('iosBannerMobileUrl')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label htmlFor="iosBannerMobile">
                <Dropzone
                  className={classes.dropzone}
                  onDrop={(files) => this.onDropMobile(files)}
                >
                  <div>Drop files here, or click to select files to upload.</div>
                </Dropzone>
                <div>
                  Image preview:
                  <br />
                  {iosBannerMobile.preview.length === 0
                    ? iosBannerMobile.length === 0
                      ? ''
                      : (
                        <div className="image-preview">
                          <i
                            className="material-icons"
                            onClick={this.imageRemove('iosBannerMobile')}
                            role="none"
                          >
                            highlight_off
                          </i>
                          <img
                            alt="Banner Preview"
                            className={classes.previewArea}
                            src={iosBannerMobile}
                          />
                        </div>
                      )
                    : (
                      <div className="image-preview">
                        <i
                          className="material-icons"
                          onClick={this.imageRemove('iosBannerMobile')}
                          role="none"
                        >
                          highlight_off
                        </i>
                        <img
                          alt="Banner Preview"
                          className={classes.previewArea}
                          src={iosBannerMobile.preview}
                        />
                      </div>
                    )}
                </div>
              </label>
            </Grid>
          </Grid>

          <Grid item container xs={12} spacing={8} className={classes.outlined}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="iosBannerDesktop"
                label="iOS Banner Desktop Url"
                className={classes.textField}
                margin="normal"
                fullwidth="true"
                style={{ width: '100%' }}
                InputLabelProps={{
                  shrink: true
                }}
                value={iosBannerDesktopUrl}
                onChange={this.handleChange('iosBannerDesktopUrl')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label htmlFor="iosBannerDesktop">
                <Dropzone
                  className={classes.dropzone}
                  onDrop={(files) => this.onDropDesktop(files)}
                >
                  <div>Drop files here, or click to select files to upload.</div>
                </Dropzone>
                <div>
                  Image preview:
                  <br />
                  {iosBannerDesktop.preview.length === 0
                    ? iosBannerDesktop.length === 0
                      ? ''
                      : (
                        <div className="image-preview">
                          <i
                            className="material-icons"
                            onClick={this.imageRemove('iosBannerDesktop')}
                            role="none"
                          >
                            highlight_off
                          </i>
                          <img
                            alt="Banner Preview"
                            className={classes.previewArea}
                            src={iosBannerDesktop}
                          />
                        </div>
                      )
                    : (
                      <div className="image-preview">
                        <i
                          className="material-icons"
                          onClick={this.imageRemove('iosBannerDesktop')}
                          role="none"
                        >
                          highlight_off
                        </i>
                        <img
                          alt="Banner Preview"
                          className={classes.previewArea}
                          src={iosBannerDesktop.preview}
                        />
                      </div>
                    )}
                </div>
              </label>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="select-associatedAuctions"
              select
              label="Associated Sale"
              fullwidth="true"
              className={classes.textField}
              value={catalogueSetSale.length > 0 ? catalogueSetSale : ''}
              onChange={this.handleChange('catalogueSetSale')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
            >
              {associatedAuctionsWithId.map(associatedAuction => (
                <MenuItem key={associatedAuction.id} value={associatedAuction.saleNumber}>
                  {associatedAuction.saleNumber}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Banners.defaultProps = {
  associatedAuctions: []
};

Banners.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    root: PropTypes.string,
    button: PropTypes.string,
    textField: PropTypes.string,
    input: PropTypes.string,
    menu: PropTypes.string,
    previewArea: PropTypes.string,
    dropzone: PropTypes.string,
    outlined: PropTypes.string
  }).isRequired,
  associatedAuctions: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.shape({
    clearUploadImage: PropTypes.func.isRequired,
    editDetails: PropTypes.func.isRequired,
    uploadiOSDesktopBannerSubmit: PropTypes.func.isRequired,
    uploadiOSMobileBannerSubmit: PropTypes.func.isRequired
  }).isRequired,
  state: PropTypes.shape({
    selectedAuction: PropTypes.objectOf(PropTypes.object).isRequired,
    uploadImage: PropTypes.objectOf(PropTypes.object).isRequired
  }).isRequired
};


export default withStyles(styles)(Banners);
