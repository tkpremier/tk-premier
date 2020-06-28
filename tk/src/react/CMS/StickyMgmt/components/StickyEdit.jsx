import React, { Component, memo } from 'react'
import { PropTypes } from 'prop-types'
import Dropzone from 'react-dropzone'
// Material UI
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import { ALERT_TYPES as alertTypes } from '../constants'

// Components
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  container: {
    backgroundColor: 'transparent'
  },
  progress: {
    margin: 'auto'
  },
  dropzome: {
    position: 'relative',
    width: 200,
    minHeight: 200,
    height: 'auto',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 5,
    margin: 'auto'
  },
  error: {
    color: 'red',
    margin: 'auto'
  }
})

class StickyEdit extends Component {
  state = {
    dense: false,
    secondary: true,
  };

  componentWillMount() {

  }

  componentDidMount() {
    this.validateForm()
  }

  editProperty = (key, value) => {
    this.props.actions.editSticky(key, value)
  }
  handleToggle = (key) => (event) => {
    this.editProperty(key, event.target.checked)
  }

  handleChange = (key) => (event) => {
    this.validateProperty(key, event.target.value)
    this.editProperty(key, event.target.value)
  }

  onDrop = (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.leght > 0) {
      return
    }

    var file = acceptedFiles[0];
    const reader = new FileReader()
    reader.onload = () => {
      this.validateProperty('source', file.preview)
      this.editProperty('source', file.preview)
      this.props.actions.saveStickyImage(
        {
          name: file.name,
          preview: file.preview,
          file: file
        }
      )
    }
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')

    reader.readAsBinaryString(file)
  }

  validateProperty = (key, value) => {
    let formErrors = this.props.formErrors
    formErrors[key] = value == ''

    formErrors.hasErrors = formErrors.altText || formErrors.source || formErrors.title || formErrors.wrappingLink
    this.props.actions.setFormErrors(formErrors)
  }

  validateForm = () => {
    let formErrors = this.props.formErrors
    const selectedSticky = this.props.selectedSticky
    formErrors.altText = selectedSticky.altText == ''
    formErrors.source = selectedSticky.source == ''
    formErrors.title = selectedSticky.title == ''
    formErrors.wrappingLink = selectedSticky.wrappingLink == ''

    formErrors.hasErrors = formErrors.altText || formErrors.source || formErrors.title || formErrors.wrappingLink
    this.props.actions.setFormErrors(formErrors)
  }

  render() {
    const { classes, formErrors } = this.props;
    const { altText, title, wrappingLink, isActive, source } = this.props.selectedSticky
    const disabled = this.props.deleteStickyDialog.open
    const uploadingImage = this.props.alert.type === alertTypes.SAVING_STICKY_IMAGE;

    return (
      <form className={classes.container}
        noValidate autoComplete="off">
        <Grid container spacing={24}>
          <Grid item xs={12} md={4}>
            <span>
              <Dropzone disabled={uploadingImage || disabled} onDrop={acceptedFiles => this.onDrop(acceptedFiles)} className={classes.dropzome} >
                {({ getRootProps, getInputProps }) => (
                  (source && source !== '' ? <img src={source.includes('http') ? source : `https://www.phillips.com/Xigen/image.ashx?path=${source}`} /> :
                    <p>Drag and drop the sticky image here or click to select files</p>
                  )
                )}
              </Dropzone>
              {uploadingImage ? <CircularProgress className={classes.progress} color="secondary" /> : null}
            </span>
            {formErrors.source ? <span className={classes.error}> Required</span> : null}
          </Grid>
          <Grid item xs={12} md={8}>
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
              disabled={disabled}
              onChange={this.handleChange('title')}
            />
            {formErrors.title ? <span className={classes.error}> Required</span> : null}
            <TextField
              id="altText"
              label="Alt text"
              className={classes.textField}
              margin="normal"
              fullwidth="true"
              style={{ width: '100%' }}
              InputLabelProps={{
                shrink: true,
              }}
              value={altText}
              disabled={disabled}
              onChange={this.handleChange('altText')}
            />
            {formErrors.altText ? <span className={classes.error}> Required</span> : null}
            <TextField
              id="wrappingLink"
              label="Link"
              className={classes.textField}
              margin="normal"
              fullwidth="true"
              style={{ width: '100%' }}
              InputLabelProps={{
                shrink: true,
              }}
              value={wrappingLink}
              disabled={disabled}
              onChange={this.handleChange('wrappingLink')}
            />
            {formErrors.wrappingLink ? <span className={classes.error}> Required</span> : null}
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  className={classes.switchLabel}
                  control={(
                    <Switch
                      checked={isActive ? true : false}
                      onChange={this.handleToggle('isActive')}
                      color="primary"
                      disabled={disabled}
                    />
                  )}
                  label="Active"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    )
  }
}

StickyEdit.propTypes = {

}

export default withStyles(styles)(StickyEdit)
