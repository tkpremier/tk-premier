import React from 'react';
import { PropTypes } from 'prop-types';
import Dropzone from 'react-dropzone';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

// Phillips
import PhillipsImage from '../../../../PhillipsImage/PhillipsImage';
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
    // border: '1px solid #ccc',
    marginLeft: 'auto',
    marginRight: 'auto'
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


class FeaturedRight extends React.Component {
  state = {}

  render() {
    // console.log('Feature text-right render(): ', this.props);
    const { classes } = this.props;
    const {
      active,
      componentData,
      title
    } = this.props.editorial;

    return (
      <Card
        className={[classes.card, active ? '' : classes.activeOverlay]}
        style={{ width: '100%' }}
      >
        <div className="mainVisible">
          <h4>Feature Text Right</h4>
          <br />
          <img src="/icons/cms-icons/feature-right.jpg" />
        </div>
        <CardActionArea className={classes.actionArea}>
          <CardContent
            className="menuVisible phillips__feature phillips__feature--full-width"
            style={{ paddingRight: '40px' }}
          >
            {componentData.map((c, i) => {
              return (
                <div div key={c.componentId}>
                  <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: '100%', order: 1 }}
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
                    label="Link Url"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: '100%', order: 2 }}
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
                  <div
                    key={c.componentId}
                    style={{ 'display': 'flex' }}
                    id="featured-text-right"
                    onMouseDown={handleSelectContent(this.props, c.componentId)}
                  >
                    <Dropzone
                      className={classes.dropzone}
                      onDrop={(files) => onDrop(this.props, files, componentData[0].componentId)}
                      style={{ 'display': 'flex', 'order': 1 }}
                    >
                      {
                        c.imageUrl === 'https://phillips.vo.llnwd.net/v1/web_prod/images/placeholders/temp-image.jpg'
                          ? <img src={`${c.imageUrl}`} className="phillips-image phillips__feature__image phillips__feature__image--left" alt="Temp image" />
                          : (
                              <PhillipsImage
                                alt={c.title}
                                className={`phillips-image phillips__feature__image phillips__feature__image--left`}
                                cloudinary
                                imagePath={c.imageUrl}
                                transformation="EditorialHubFullWidth"
                              />
                            )
                      }
                    </Dropzone>
                    <ReactCkeditor
                      className={`phillips__feature__description phillips__feature__description--right`}
                      data={{
                        type: 'markup',
                        propValue: c.htmlCaption
                      }}
                      editorId={`editor-htmlCaption${Math.floor(Math.random() * 1000000)}`}
                      ref='htmlEditor'
                      onBlur={handleEditComponent(this.props, c.componentId, 'htmlCaption')}
                      style={{ 'order': 2, marginLeft: 0 }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

FeaturedRight.propTypes = {
  classes: PropTypes.object.isRequired
};

FeaturedRight.defaultProps = {

};

export default withStyles(styles)(FeaturedRight);
