import React from 'react';
import { PropTypes } from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

// Phillips
import PhillipsVideo from '../../../../PhillipsVideo/PhillipsVideo';
import ReactCkeditor from '../../../../components/reactckeditor';

// Editorial Component Functions:
import {
  handleEditComponent,
  handleEditorialTextChange,
  handleSaveTextChange,
  handleSelectContent,
  handleTextChange
} from '../../lib/util';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  actionArea: {
    margin: '20px'
  },
  card: {
    marginBottom: '15px'
  },
  phillipsVideoOverride: {
    height: '605px',
    marginBottom: '25px'
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

class VideoArticle extends React.Component {
  state = {}

  render() {
    // console.log('Video article render(): ', this.props);
    const { classes } = this.props;
    const {
      active,
      componentData,
      title
    } = this.props.editorial;

    return (
      <Card
        className={[classes.card, active ? '' : classes.activeOverlay]}
      >
        <div className="mainVisible">
          <h4>Video</h4>
          <br />
          <img src="/icons/cms-icons/video.jpg" />
        </div>
        <CardActionArea className={classes.actionArea}>
          <CardContent className="">
            {componentData.map((c, i) => {
              return (
                <div
                  className="menuVisible phillips-video editorial-hub__video"
                  onMouseDown={handleSelectContent(this.props, c.componentId)}
                  key={c.componentId}
                >
                  <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={title}
                    onChange={handleEditorialTextChange(this.props, 'title')}
                    onBlur={handleSaveTextChange(this.props)}
                  />
                  <br />
                  <TextField
                    id="url"
                    label="Video Url"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={c.url}
                    onChange={
                      (e) => this.props.actions.editComponent(
                        c, this.props.editorialIndex, i, 'url', e.target.value
                      )
                    }
                    onBlur={handleSaveTextChange(this.props)}
                  />
                  <PhillipsVideo
                    className={classes.phillipsVideoOverride}
                    source={c.url}
                    title={c.title}
                    key={c.componentId}
                  />
                  <span className="video-caption">
                    <ReactCkeditor
                      data={{
                        type: 'markup',
                        propValue: c.htmlCaption
                      }}
                      editorId={`editor-htmlCaption${Math.floor(Math.random() * 1000000)}`}
                      ref='htmlEditor'
                      onBlur={handleEditComponent(this.props, c.componentId, 'htmlCaption')}
                    />
                  </span>
                </div>
              )
            })}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}



VideoArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

VideoArticle.defaultProps = {

};

export default withStyles(styles)(VideoArticle);
