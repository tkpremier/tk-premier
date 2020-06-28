import React from 'react';
import { PropTypes } from 'prop-types';
import Dropzone from 'react-dropzone';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Phillips
import PhillipsImage from '../../../../PhillipsImage/PhillipsImage';
import PhillipsVideo from '../../../../PhillipsVideo/PhillipsVideo';
import ReactCkeditor from '../../../../components/reactckeditor';

// Editorial Component Functions:
import {
  handleEditComponent,
  handleEditorialTextChange,
  handleSaveTextChange,
  handleSelectContent,
  handleTextChange,
  onDrop
} from '../../lib/util';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  dropzone: {
    border: '1px solid #ccc',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  imageDropArea: {
    border: '1px #ddd dashed',
    width: '250px'
  },
  actionArea: {
    margin: '20px'
  },
  card: {
    marginBottom: '15px'
  },
  activeOverlay: {
    display: 'block',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.2,
    backgroundColor: '#000'
  }
});

// https://www.phillips.com/article/48342184/man-ray-constantin-brancusi-henri-cartier-bresson
// https://player.vimeo.com/video/402938838

class FeaturedMain extends React.Component {
  state = {}

  render() {
    // console.log('Featured Main render(): ', this.props);
    const { classes } = this.props;
    const {
      active,
      editorialEdited,
      componentData,
      title
    } = this.props.editorial;

    return (
      <Card
        className={[classes.card, active ? '' : classes.activeOverlay]}
      >
        <div className="mainVisible">
          <h4>Featured Main</h4>
          <br />
          <img src="/icons/cms-icons/featuredMain.jpg" />
        </div>
        <CardActionArea className={classes.actionArea}>
          <CardContent
            className="menuVisible row editorial-hub__featured"
            style={{ paddingRight: '40px' }}
          >
            <div
              className={`col-xs-12 col-sm-9 editorial-hub__featured__wrapper editorial-hub__featured__wrapper--main`}
              onMouseDown={handleSelectContent(this.props, componentData[0].componentId)}
              style={{ width: '68%' }}
            >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Content Type</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={componentData[0].itemType}
                  onChange={handleEditComponent(this.props, componentData[0].componentId, 'itemType')}
                  label="Content Type"
                  style={{ width: '240px', marginTop: '10px' }}
                >
                  <MenuItem value={'Article'}>Article</MenuItem>
                  <MenuItem value={'Video'}>Video</MenuItem>
                </Select>
              </FormControl>

              {
                componentData[0].itemType === 'Video'
                ? (
                    <div>
                      <TextField
                        id="url"
                        label="Video Url"
                        className={classes.textField}
                        margin="normal"
                        style={{ width: '740px' }}
                        InputLabelProps={{ shrink: true }}
                        value={componentData[0].url}
                        onChange={handleTextChange(this.props, 'url')}
                        onBlur={handleSaveTextChange(this.props)}
                      />
                      <PhillipsVideo
                        style={{ width: '740px' }}
                        source={componentData[0].url}
                        title={componentData[0].title}
                        key={componentData[0].componentId}
                      />
                    </div>
                  )
                : (
                    <Dropzone
                      className={classes.dropzone}
                      onDrop={(files) => onDrop(this.props, files, componentData[0].componentId)}
                    >
                      {
                        componentData[0].imagePath === 'blank'
                          ? <div className={classes.imageDropArea}>Click to upload image</div>
                          : (<PhillipsImage
                              alt={componentData[0].title}
                              cloudinary
                              imagePath={componentData[0].imageUrl}
                              transformation="EditorialHubFeaturedMain"
                            />)
                      }
                    </Dropzone>
                  )
              }
              <br />
              <div className="editorial-hub__html-wrapper">
                <ReactCkeditor
                  className="editorial-hub__html-wrapper"
                  data={{
                    type: 'markup',
                    propValue: componentData[0].htmlCaption
                  }}
                  editorId={`editor-htmlCaption${Math.floor(Math.random() * 1000000)}`}
                  onBlur={handleEditComponent(this.props, componentData[0].componentId, 'htmlCaption')}
                  ref='htmlEditor'
                />
              </div>
              {
                componentData[0].itemType === 'Article'
                ? (
                    <TextField
                      id="url"
                      label="Link Url"
                      className={classes.textField}
                      margin="normal"
                      style={{ width: '100%' }}
                      InputLabelProps={{ shrink: true }}
                      value={editorialEdited ? selectedEditorial.componentData[0].url : componentData[0].url}
                      onChange={(e) => this.props.actions.editComponent(componentData[0], 0, 0, 'url', e.target.value)}
                      onBlur={handleSaveTextChange(this.props)}
                    />
                  )
                : null
              }
            </div>
            <div className={`menuVisible col-xs-12 col-sm-3 editorial-hub__featured__wrapper editorial-hub__featured__wrapper--side`}>
              <div
                className={`editorial-hub__featured__side-item editorial-hub__featured__side-item--top`}
                onMouseDown={handleSelectContent(this.props, componentData[1].componentId)}
              >
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Content Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={componentData[1].itemType}
                    onChange={handleEditComponent(this.props, componentData[1].componentId, 'itemType')}
                    label="Content Type"
                    style={{ width: '240px' }}
                  >
                    <MenuItem value={'Article'}>Article</MenuItem>
                    <MenuItem value={'Video'}>Video</MenuItem>
                  </Select>
                </FormControl>

                {
                  componentData[1].itemType === 'Video'
                  ? (
                      <div>
                        <TextField
                          id="url"
                          label="Video Url"
                          className={classes.textField}
                          margin="normal"
                          style={{ width: '240px' }}
                          InputLabelProps={{ shrink: true }}
                          value={componentData[1].url}
                          onChange={handleTextChange(this.props, 'url')}
                          onBlur={handleSaveTextChange(this.props)}
                        />
                        <PhillipsVideo
                          style={{ width: '300px' }}
                          source={componentData[1].url}
                          title={componentData[1].title}
                          key={componentData[1].componentId}
                        />
                      </div>
                    )
                  : (
                      <Dropzone
                        className={classes.dropzone}
                        onDrop={(files) => onDrop(this.props, files, componentData[1].componentId)}
                      >
                        {
                          componentData[1].imagePath === 'blank'
                            ? <div className={classes.imageDropArea}>Click to upload image</div>
                            : (<PhillipsImage
                                alt={componentData[1].title}
                                cloudinary
                                imagePath={componentData[1].imageUrl}
                                transformation="EditorialHubFeaturedMain"
                              />)
                        }
                      </Dropzone>
                    )
                }

                <div className="editorial-hub__html-wrapper">
                  <ReactCkeditor
                    className="editorial-hub__html-wrapper"
                    data={{
                      type: 'markup',
                      propValue: componentData[1].htmlCaption
                    }}
                    editorId={`editor-htmlCaption${Math.floor(Math.random() * 1000000)}`}
                    ref='htmlEditor'
                    onBlur={handleEditComponent(this.props, componentData[1].componentId, 'htmlCaption')}
                  />
                </div>
                {
                  componentData[1].itemType === 'Article'
                  ? (
                      <TextField
                        id="url"
                        label="Link Url"
                        className={classes.textField}
                        margin="normal"
                        style={{ width: '100%' }}
                        InputLabelProps={{ shrink: true }}
                        value={editorialEdited ? selectedEditorial.componentData[1].url : componentData[1].url}
                        onChange={(e) => this.props.actions.editComponent(componentData[1], 1, 1, 'url', e.target.value)}
                        onBlur={handleSaveTextChange(this.props)}
                      />
                    )
                  : null
                }
              </div>
              <div
                className={`editorial-hub__featured__side-item editorial-hub__featured__side-item--bottom`}
                onMouseDown={handleSelectContent(this.props, componentData[2].componentId)}
              >
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Content Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={componentData[2].itemType}
                    onChange={handleEditComponent(this.props, componentData[2].componentId, 'itemType')}
                    label="Content Type"
                    style={{ width: '240px' }}
                  >
                    <MenuItem value={'Article'}>Article</MenuItem>
                    <MenuItem value={'Video'}>Video</MenuItem>
                  </Select>
                </FormControl>

                {
                  componentData[2].itemType === 'Video'
                  ? (
                      <div>
                        <TextField
                          id="url"
                          label="Video Url"
                          className={classes.textField}
                          margin="normal"
                          style={{ width: '240px' }}
                          InputLabelProps={{ shrink: true }}
                          value={componentData[2].url}
                          onChange={handleTextChange(this.props, 'url')}
                          onBlur={handleSaveTextChange(this.props)}
                        />
                        <PhillipsVideo
                          style={{ width: '300px' }}
                          source={componentData[2].url}
                          title={componentData[2].title}
                          key={componentData[2].componentId}
                        />
                      </div>
                    )
                  : (
                      <Dropzone
                        className={classes.dropzone}
                        onDrop={(files) => onDrop(this.props, files, componentData[2].componentId)}
                      >
                        {
                          componentData[2].imagePath === 'blank'
                            ? <div className={classes.imageDropArea}>Click to upload image</div>
                            : (<PhillipsImage
                                alt={componentData[2].title}
                                cloudinary
                                imagePath={componentData[2].imageUrl}
                                transformation="EditorialHubFeaturedMain"
                              />)
                        }
                      </Dropzone>
                    )
                }

                <div className="editorial-hub__html-wrapper">
                  <ReactCkeditor
                    className="editorial-hub__html-wrapper"
                    data={{
                      type: 'markup',
                      propValue: componentData[2].htmlCaption
                    }}
                    editorId={`editor-htmlCaption${Math.floor(Math.random() * 1000000)}`}
                    ref='htmlEditor'
                    onBlur={handleEditComponent(this.props, componentData[2].componentId, 'htmlCaption')}
                  />
                </div>
                {
                  componentData[0].itemType === 'Article'
                  ? (
                      <TextField
                        id="url"
                        label="Link Url"
                        className={classes.textField}
                        margin="normal"
                        style={{ width: '100%' }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={editorialEdited ? selectedEditorial.componentData[2].url : componentData[2].url}
                        onChange={(e) => this.props.actions.editComponent(componentData[2], 2, 2, 'url', e.target.value)}
                        onBlur={handleSaveTextChange(this.props)}
                      />
                    )
                  : null
                }
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

FeaturedMain.propTypes = {
  classes: PropTypes.object.isRequired
};

FeaturedMain.defaultProps = {

};

export default withStyles(styles)(FeaturedMain);
