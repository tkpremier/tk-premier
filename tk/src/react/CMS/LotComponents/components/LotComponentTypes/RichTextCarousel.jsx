import React from 'react';
import { PropTypes } from 'prop-types';
import Dropzone from 'react-dropzone';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

// Phillips
import ReactCkeditor from '../../../../components/reactckeditor';

import { arrayMove } from '../../../Shared/lib/util';
import { richTextCarouselItemBlank } from '../../initial-state';

// LotComponent Component Functions:
import {
  handleSaveTextChange,
  handleSelectContent
} from '../../lib/util';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  dropzone: {
    border: '1px solid #ccc',
    marginLeft: 'auto',
    marginRight: 'auto'
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
  },
  deleteCaourselItemButton: {
    top: '-8px',
    left: '36%',
    borderLeft: 'solid 1px #ddd',
    borderRight: 'solid 1px #ddd',
    borderBottom: 'solid 1px #ddd',
    borderRadius: '3px',
    padding: '5px',
    position: 'relative',
    cursor: 'pointer'
  }
});

class RichTextCarouselComponent extends React.Component {
  state = {}

  handleAddNewItem = (i) => (event) => {
    const { selectedLotComponent } = this.props.state.lotComponents;
    const richTextCarouselItemBlankAppend = {
      ...richTextCarouselItemBlank
      // displayOrder: selectedLotComponent.componentData.length + 1
    }
    const newComponentData = selectedLotComponent.componentData.concat({ ...richTextCarouselItemBlankAppend, displayOrder: i + 1 });

    this.props.actions.editLotComponent(selectedLotComponent, i, 'componentData', newComponentData);
    this.props.actions.lotComponentUpdateSubmit();
  }

  handleDeleteItem = (i) => (event) => {
    const { selectedLotComponent, selectedLotComponentData } = this.props.state.lotComponents;
    let iterator = 1;

    const filteredLotComponentData = selectedLotComponent.componentData.filter(
      c => c.componentId !== selectedLotComponentData.componentId
    ).sort((a, b) => a.displayOrder - b.displayOrder);
    filteredLotComponentData.map(c => c.displayOrder = iterator++);

    this.props.actions.editLotComponent(selectedLotComponent, i, 'componentData', filteredLotComponentData);
    this.props.actions.lotComponentUpdateSubmit();
  }

  handleReorderItems = (direction, i) => (event) => {
    const { selectedLotComponent, selectedLotComponentData } = this.props.state.lotComponents;
    const { componentData } = selectedLotComponent;
    const reorderedLotComponentData = arrayMove(
      componentData,
      selectedLotComponentData.index,
      direction === 'left' ? selectedLotComponentData.index - 1 : selectedLotComponentData.index + 1
    );
    reorderedLotComponentData.map((cd, i) => cd.displayOrder = i + 1);

    this.props.actions.editLotComponent(selectedLotComponent, i, 'componentData', reorderedLotComponentData);
    this.props.actions.lotComponentUpdateSubmit();
  }

  handleUpdateCaption = (c, i) => (event) => {
    const { lotComponentIndex } = this.props;
    this.props.actions.editLotComponentData(c, lotComponentIndex, i, 'htmlCaption', event);
    this.props.actions.lotComponentUpdateSubmit();
  }

  render() {
    // console.log('Carousel Component render(): ', this.props);
    const { classes, lotComponentIndex, lotComponent } = this.props;
    const { baseUrl } = this.state;
    const { objectNumber } = this.props.state.lotComponents.selectedLotComponent;
    const {
      active,
      componentData,
      title
    } = lotComponent;
    let iterator = 1;

    return (
      <Card className={[classes.card, active ? '' : classes.activeOverlay]}>
        <CardContent
          className="menuVisible"
          style={{ paddingRight: '40px' }}
        >
          <TextField
            id="title"
            label="Title"
            className={classes.textField}
            margin="normal"
            style={{ width: '100%', marginBottom: '14px' }} InputLabelProps={{ shrink: true }}
            value={title}
            onChange={(e) => this.props.actions.editLotComponent(componentData, lotComponentIndex, 'title', e.target.value)}
            onBlur={handleSaveTextChange(this.props)}
          />
          <br />
          <div className="richtext-carousel-block">
            {componentData.map((c, i) => {
              return (
                <Paper
                  key={c.componentId}
                  className="richtext-carousel-tile"
                  onMouseDown={handleSelectContent(this.props, c.componentId)}
                  data-componentdataid={c.componentId}
                >
                  {componentData.length === 1
                    ? null
                    : (<span
                      onClick={this.handleDeleteItem(i)}
                      className={classes.deleteCaourselItemButton}
                    >
                      X Remove
                    </span>)
                  }
                  <CardActionArea className={classes.actionArea}>
                    <span>
                      <ReactCkeditor
                        data={{
                          type: 'markup',
                          propValue: c.htmlCaption
                        }}
                        className="richtext-carousel-editor"
                        editorId={`editor-htmlCaption${Math.floor(Math.random() * 1000000) + iterator++}`}
                        onBlur={this.handleUpdateCaption(c, i)}
                        ref='htmlEditor'
                        useImageUploader={true}
                        imageUploadType="LotComponent"
                      />
                    </span>
                  </CardActionArea>
                  <div className="richtext-carousel-item-reordering">
                    {i === 0
                      ? null
                      : <div onClick={this.handleReorderItems('left', i)}>&#9194;</div>
                    }
                    {i === componentData.length - 1
                      ? null
                      : <div onClick={this.handleReorderItems('right', i)}>&#9193;</div>
                    }
                  </div>
                </Paper>
              )
            })}
          </div>
          <div
            className="xs-col-12 md-col-3 pull-right"
            style={{ margin: '10px' }}
          >
            <Button
              variant="contained"
              component="span"
              onClick={this.handleAddNewItem(lotComponentIndex)}
              color="primary"
              style={{ width: '100%' }}
            >
              + Add Item
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

RichTextCarouselComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    editLotComponent: PropTypes.func.isRequired,
    lotComponentUpdateSubmit: PropTypes.func.isRequired
  }).isRequired
};

RichTextCarouselComponent.defaultProps = {

};

export default withStyles(styles)(RichTextCarouselComponent);
