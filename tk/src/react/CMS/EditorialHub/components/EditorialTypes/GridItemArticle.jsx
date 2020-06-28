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
    border: '1px solid #ccc',
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

class GridItemArticle extends React.Component {
  state = {}

  render() {
    // console.log('Grid Item Article render(): ', this.props);
    const { classes } = this.props;
    const { baseUrl } = this.state;
    const {
      active,
      componentData,
      title
    } = this.props.editorial;
    let iterator = 1;

    return (
      <Card
        className={[classes.card, active ? '' : classes.activeOverlay]}
      >
        <div className="mainVisible">
          <h4>Grid Items</h4>
          <br />
          <img src="/icons/cms-icons/grid.jpg" />
        </div>
        <CardActionArea className={classes.actionArea}>
          <CardContent
            className="menuVisible"
            style={{ paddingRight: '40px' }}
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
            <ul className="phillips-grid editorial-hub__grid">
              {componentData.map((c, i) => {
                return (
                  <li
                    key={c.componentId}
                    className="phillips-grid-item col-xs-12 col-sm-6 col-md-4 col-lg-4 editorial-hub__grid__item"
                    onMouseDown={handleSelectContent(this.props, c.componentId)}
                  >
                    <Dropzone
                      className={classes.dropzone}
                      onDrop={(files) => onDrop(this.props, files, c.componentId)}
                    >
                    {
                      c.imageUrl === 'https://phillips.vo.llnwd.net/v1/web_prod/images/placeholders/temp-image.jpg'
                        ? <img src={`${c.imageUrl}`} className="editorial-hub__grid-item__image" alt="Temp image" />
                        : (
                            <PhillipsImage
                              alt={c.title}
                              className="editorial-hub__grid-item__image"
                              cloudinary
                              imagePath={c.imageUrl}
                              transformation="EditorialHub"
                            />
                          )
                    }
                    </Dropzone>
                    <span className="editorial-hub__html-wrapper">
                      <ReactCkeditor
                        data={{
                          type: 'markup',
                          propValue: c.htmlCaption
                        }}
                        editorId={`editor-htmlCaption${Math.floor(Math.random() * 1000000) + iterator++}`}
                        ref='htmlEditor'
                        onBlur={handleEditComponent(this.props, c.componentId, 'htmlCaption')}
                      />
                    </span>
                    <TextField
                      id="url"
                      label="Link Url"
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
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

GridItemArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

GridItemArticle.defaultProps = {

};

export default withStyles(styles)(GridItemArticle);
