import React from 'react';
import { PropTypes } from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

// Phillips
import ReactCkeditor from '../../../../components/reactckeditor';

// LotComponent Component Functions:
import {
  handleSaveTextChange,
  handleSelectContent
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

  },
  card: {
    width: '97%',
    margin: '15px',
    verticalAlign: 'top'
  },
  activeOverlay: {
    display: 'block',
    top: 0,
    left: 0,
    width: '96%',
    height: '100%',
    opacity: 0.2,
    backgroundColor: '#000'
  }
});

class RichTextComponent extends React.Component {
  state = {}

  handleUpdateCaption = (c, i) => (event) => {
    const { lotComponentIndex } = this.props;
    this.props.actions.editLotComponentData(c, lotComponentIndex, i, 'htmlCaption', event);
    this.props.actions.lotComponentUpdateSubmit();
  }

  render() {
    // console.log('Rich Text Component render(): ', this.props);
    const { classes, lotComponentIndex } = this.props;
    const {
      active,
      componentData,
      title
    } = this.props.lotComponent;

    return (
      <Card className={[classes.card, active ? '' : classes.activeOverlay]}>
        <CardContent
          className="menuVisible row richtext-content"
          onMouseDown={handleSelectContent(this.props, componentData[0].componentId)}
        >
          <CardActionArea className={classes.actionArea}>
            <TextField
              id="title"
              label="Title"
              className={classes.textField}
              margin="normal"
              style={{ width: '100%', marginBottom: '14px' }}
              InputLabelProps={{
                shrink: true,
              }}
              value={title}
              onChange={(e) => this.props.actions.editLotComponent(componentData[lotComponentIndex], lotComponentIndex, 'title', e.target.value)}
              onBlur={handleSaveTextChange(this.props)}
            />
            <br />
            {componentData.map((c, i) => {
              return (
                <div key={i} style={{ maxWidth: '631px', margin: '0 auto' }}>
                  <ReactCkeditor
                    data={{
                      type: 'markup',
                      propValue: c.htmlCaption
                    }}
                    className="richtext-editor"
                    editorId={`editor-htmlCaption${Math.floor(Math.random() * 1000000)}`}
                    onBlur={this.handleUpdateCaption(c, i)}
                    ref='htmlEditor'
                    useImageUploader={true}
                    imageUploadType="LotComponent"
                  />
                </div>
              );
            })}
          </CardActionArea>
        </CardContent>
      </Card>
    );
  }
}

RichTextComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    editLotComponent: PropTypes.func.isRequired,
    editLotComponentData: PropTypes.func.isRequired,
    lotComponentUpdateSubmit: PropTypes.func.isRequired
  }).isRequired
};

RichTextComponent.defaultProps = {

};

export default withStyles(styles)(RichTextComponent);
