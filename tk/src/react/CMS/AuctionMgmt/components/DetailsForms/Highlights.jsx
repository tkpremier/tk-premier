import React from 'react';
import { PropTypes } from 'prop-types';
import { Cloudinary } from 'cloudinary-core';
import Dropzone from 'react-dropzone';
import { clone, find } from 'lodash';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ReactCkeditor from '../../../../components/reactckeditor';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  input: {
    display: 'none'
  },
  menu: {
    width: 200
  },
  card: {
    display: 'flex',
    maxWidth: '95%',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  content: {
    flex: '1 0 auto',
    minHeight: '125px'
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover'
    // width: '33%'
  },
  description: {
    textAlign: 'left'
  },
  dropzone: {
    // border: '1px black solid',
    justifyContent: 'flex-end',
    display: 'flex',
    maxWidth: '250px'
  },
  inputLabel: {
    width: '100%',
    textAlign: 'left'
  },
  outlined: {
    border: '1px solid #000',
    borderRadius: '3px',
    padding: '8px',
    marginBottom: '5px',
    [theme.breakpoints.up('sm')]: {
      flexBasis: `calc(50% -  ${theme.spacing.unit * 2}px)`,
      marginRight: theme.spacing.unit * 2
    }
  },
  sortableItems: {
    marginTop: '15px',
    marginBottom: '15px'
  },
  sortable: {
    marginLeft: '-25px'
  },
  imageDropArea: {
    border: '1px #ddd dashed',
    width: '250px'
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '25px'
  },
  addButton: {
    justifySelf: 'flex-end'
  },
  instructions: {
    justifySelf: 'flex-start'
  },
  progressPlaceholder: {
    height: '4px',
    lineHeight: '20.02px',
    fontSize: '14px'
  },
  progressOverlay: {
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
    borderRadius: '5px',
    opacity: '0.5',
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1000
  }
});

const cloudinaryConfig = Cloudinary.new({
  cloud_name: 'phillips-assets',
  private_cdn: true,
  secure: true,
  secure_distribution: 'assets.phillips.com',
  cname: 'assets.phillips.com'
});


class Highlights extends React.Component {
  state = {}

  componentDidMount() {
    $('.drag-drop-area').sortable({
      items: 'li',
      update: this.handleSortableUpdate
    });
  }

  migratePreviewHighlightstoProduction = (dialog) => {
    this.props.actions.highlightsMigratePreviewtoProductionSubmit();
  }

  pushToProd = () => {
    this.props.actions.highlightsPushToProdSubmit();
    this.props.actions.highlightsPushToProdDialog({ pushToProdDialog: false });
  }

  pushToProdButton = () => {
    this.props.actions.highlightsPushToProdDialog({ pushToProdDialog: true });
  }

  pushToProdClose = (dialog) => {
    this.props.actions.highlightsPushToProdDialog({ pushToProdDialog: false });
  }

  handleSaveHighlight = (event) => {
    console.log('save event: ', event.target.value);
    this.props.actions.highlightsSaveSubmit();
  }

  handleSelectHighlight = (highlights, highlightId) => {
    const selectedHighlight = highlights.find(h => h.highlightId === highlightId);
    const cleanHighlight = {
      ...selectedHighlight,
      imagePath: selectedHighlight.imagePath.split('/').splice(-1).toString()
    };

    return (
      cleanHighlight
    );
  }

  handleEditHighlight = (highlightId, field) => (event) => {
    const { auctionHighlights } = this.props.state;
    const newHighlights = auctionHighlights.map(item => {
      return (item.highlightId === highlightId) ? { ...item, [field]: event } : item
    });

    this.props.actions.setSelectedHighlight(
      this.handleSelectHighlight(newHighlights, highlightId)
    );
    this.props.actions.editHighlightsList(newHighlights);
    this.props.actions.highlightsSaveSubmit();
  }

  handleAddHighlight = () => {
    const { auctionHighlights } = this.props.state;
    let iterator = 1;
    let addedHighlights = clone(auctionHighlights, true);
    addedHighlights.unshift(
      {
        'active': true,
        'cloudinaryVersion': '1234',
        'description': 'Description',
        'displayOrder': 0,
        'highlightId': 0,
        'imagePath': 'blank',
        'saleNumber': this.props.state.selectedAuction.saleNumber
      }
    );
    addedHighlights.map(h => h.displayOrder = iterator++);

    this.props.actions.editHighlightsList(addedHighlights);
    this.props.actions.setSelectedHighlight(
      this.handleSelectHighlight(addedHighlights, 0)
    );
  }

  handleDeleteHighlight = highlightId => (event) => {
    const { auctionHighlights } = this.props.state;
    let iterator = 0;
    const filteredHighlights = auctionHighlights.filter(
      h => h.highlightId != highlightId
    ).sort((a, b) =>  a.displayOrder - b.displayOrder);
    filteredHighlights.map(h => h.displayOrder = iterator++);

    this.props.actions.setSelectedHighlight(
      this.handleSelectHighlight(auctionHighlights, highlightId)
    );
    this.props.actions.editHighlightsList(filteredHighlights);
    this.props.actions.highlightsDeleteSubmit(highlightId);
  }

  onDrop = (acceptedFiles, highlightId) => {
    const { auctionHighlights } = this.props.state
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        this.props.actions.highlightsSetUploadImage('highlightsImageUpload',
          {
            name: file.name,
            preview: file.preview,
            file: file,
            highlightId: highlightId
          }
        )
      }
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')

      reader.readAsBinaryString(file)
    })

    setTimeout(() => {
      this.props.actions.highlightsImageUploadSubmit()
    }, 2000)

    this.props.actions.setSelectedHighlight(this.handleSelectHighlight(auctionHighlights, highlightId))
  }

  handleDragSelectHighlight = highlightId => (event) => {
    const { auctionHighlights } = this.props.state;
    this.props.actions.setSelectedHighlight(
      this.handleSelectHighlight(auctionHighlights, highlightId)
    );
  }

  handleSortableUpdate = (event) => {
    const movingHighlightId = this.props.state.selectedHighlight.highlightId
    const newItems = this.props.state.auctionHighlights
    const $node = $('.drag-drop-area')
    const ids = $node.sortable('toArray', { attribute: 'data-id' })

    ids.forEach((highlightId, index) => {
      const item = find(newItems, (obj) => obj.highlightId === parseInt(highlightId))
      item.displayOrder = index + 1
    })

    // Lets React reorder the DOM
    $node.sortable('cancel')
    this.props.actions.editHighlightsList(newItems)
    this.props.actions.setSelectedHighlight(
      this.handleSelectHighlight(newItems, movingHighlightId)
    )
    this.props.actions.highlightsSaveSubmit()
  }

  // "Components"
  sortedItems() {
    let iterator = 1;
    const itemsWithId = this.props.state.auctionHighlights.map(
      (obj) => ({ ...obj, id: iterator++ })
    );
    const { classes } = this.props;

    return itemsWithId.sort((a, b) =>  a.displayOrder - b.displayOrder).map((item) => {
      return (
        <li key={item.id} data-id={item.highlightId} className={classes.sortableItems}>
          <Card
            className={classes.card}
            onMouseDown={this.handleDragSelectHighlight(item.highlightId)}
          >
            <div className={classes.details}>
              <CardActionArea>
                <CardContent className={classes.content}>
                  <InputLabel
                    className={classes.inputLabel}
                    shrink
                  >
                    {'Description'}
                  </InputLabel>
                  <ReactCkeditor
                    data={{
                      type: 'markup',
                      propValue: item.description
                    }}
                    editorId={`editor${Math.floor(Math.random() * 1000)}`}
                    ref='htmlEditor'
                    onBlur={this.handleEditHighlight(item.highlightId, 'description')}
                    className={classes.outlined}
                  />
                  <InputLabel
                    className={classes.inputLabel}
                    shrink
                  >
                    {'Description - Chinese'}
                  </InputLabel>
                  <ReactCkeditor
                    data={{
                      type: 'markup',
                      propValue: item.cDescription
                    }}
                    editorId={`editor${Math.floor(Math.random() * 1000)}`}
                    ref='htmlEditor'
                    onBlur={this.handleEditHighlight(item.highlightId, 'cDescription')}
                    className={classes.outlined}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={this.handleDeleteHighlight(item.highlightId)}
                >
                  Remove
                </Button>
              </CardActions>
            </div>
            <Dropzone
              className={classes.dropzone}
              onDrop={(files) => this.onDrop(files, item.highlightId)}
            >
              {
                item.imagePath === 'blank' || item.imagePath === `/auctions/${item.saleNumber}/blank`
                  ? <div className={classes.imageDropArea}>Click to upload image</div>
                  : (<CardMedia
                      component="img"
                      alt="Image Preview"
                      className={classes.media}
                      height="140"
                      image={
                        this.props.state.highlightsImageUpload.highlightId === item.highlightId
                          ? this.props.state.highlightsImageUpload.preview
                          : cloudinaryConfig.url(
                              item.imagePath,
                              {
                                'transformation': 'Website_AuctionHighlightsGalleryModal',
                                'version': item.cloudinaryVersion
                              }
                            )
                          }
                      title="Image Preview"
                    />)
              }
            </Dropzone>
          </Card>
        </li>
      )
    });
  }

  render() {
    // console.log('Highlights render(): ', this.props);
    const { classes } = this.props
    const {
      auctionHighlights,
      progressIndicator
    } = this.props.state

    return (
      <div>
        <div className={classes.topBar}>
          <p className={classes.instructions}>
            Drag and drop to reorder highlights. Click on images
            to replace, click on description to edit.
          </p>
          <Button
            variant="contained"
            component="span"
            className={classes.button, classes.addButton}
            onClick={this.handleAddHighlight}
          >
            Add New Highlight
          </Button>
        </div>
        {progressIndicator
          ? <LinearProgress />
          : <div className={classes.progressPlaceholder}>&nbsp;</div>
        }
        <div className="drag-drop-area" style={{ position: 'relative' }}>
          {progressIndicator ? <div className={classes.progressOverlay} /> : null}
          <ul className={classes.sortable}>
            {this.sortedItems()}
          </ul>
        </div>

        {
          this.props.state.baseUrl === 'https://stage-cms.phillips.com'
           ? (<Button
                variant="contained"
                component="span"
                className={classes.button}
                onClick={this.pushToProdButton}
                color="secondary"
                style={{ width: '200px' }}
              >
                Push to<br /> Production
              </Button>)
           : null
        }
        {
          this.props.state.baseUrl === 'https://cms.phillips.com'
           ? (<Button
                variant="contained"
                component="span"
                className={classes.button}
                onClick={this.migratePreviewHighlightstoProduction}
                color="secondary"
                style={{ width: '200px' }}
              >
                Migrate highlights<br /> from preview to Production
              </Button>)
           : null
        }

        <Dialog
          open={this.props.state.pushToProdDialog}
          keepMounted
          onClose={this.pushToProdClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Push Highlights to Production"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure? This will move the current highlights to production.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.pushToProd} color="primary">
              Confirm
            </Button>
            <Button onClick={this.pushToProdClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

Highlights.propTypes = {
  classes: PropTypes.object.isRequired
}

Highlights.defaultProps = {

}

export default withStyles(styles)(Highlights)
