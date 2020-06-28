import React from 'react'
import { PropTypes } from 'prop-types'
import { Cloudinary } from 'cloudinary-core'
import { find } from 'lodash'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  input: {
    display: 'none',
  },
  menu: {
    width: 200,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: '500px',
    minHeight: '125px'
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
    // width: '33%'
  },
  description: {
    textAlign: 'left'
  },
  catalogueList: {
    backgroundColor: theme.palette.background.paper,
  },
  sortableItems: {
    marginTop: '15px',
    marginBottom: '15px'
  },
  sortable: {
    marginLeft: '-25px',
    listStyle: 'none'
  },
  imageDropArea: {
    border: '1px #ddd dashed',
    width: '250px'
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '25px',
  },
  addButton: {
    justifySelf: 'flex-end'
  },
  instructions: {
    justifySelf: 'flex-start',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  catalogueColumn: {
    flexBasis: '66.66%',
    padding: 0,
    listStyle: 'none'
  },
  editingColumn: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  catalogueListing: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc'
  }
})

const cloudinaryConfig = Cloudinary.new({
  cloud_name: 'phillips-assets',
  private_cdn: true,
  secure: true,
  secure_distribution: 'assets.phillips.com',
  cname: 'assets.phillips.com'
})


class CatalogueSubs extends React.Component {
  state = {
    locked: true,
    isExpanded: []
  }

  componentWillMount() {
    this.props.actions.updateBaseUrl(document.body.dataset.domain)

    $('#department-drag-drop-area').sortable({
      items: 'li',
      update: this.handleDepartmentSortUpdate,
      disabled: this.state.locked
    })
  }

  componentDidMount() {
    this.props.actions.catalogueSubscriptionsRequested()
  }


  handleDepartmentUnlock = () => {
    this.setState({ locked: this.state.locked ? false : true })
  }

  handleChange = (name) => (event) => {
    const { selectedCatalogue } = this.props.state.catalogueSubscriptions
    this.props.actions.editCatalogue(selectedCatalogue, name, event.target.value)
  }

  handleEditCatalogueSubs = (event) => {
    this.props.actions.catalogueSubUpdateSubmit()
  }

  handleAddCatalogueSubs = (event) => {
    const { selectedDepartment, selectedCatalogue } = this.props.state.catalogueSubscriptions
    const newCatalogues = selectedDepartment.catalogueSubscriptions.concat({
      ...selectedCatalogue
    })
    this.props.actions.editCatalogueList({
      ...selectedDepartment,
      catalogueSubscriptions: newCatalogues
    })
    this.props.actions.catalogueSubUpdateSubmit()
  }

  handleDeleteCatalogueSubs = (catalogueId) => (event) => {
    const { selectedDepartment } = this.props.state.catalogueSubscriptions
    const { catalogueSubscriptions } = selectedDepartment
    let iterator = 0

    const filteredCatalogueSubscriptions = catalogueSubscriptions.filter(
      c => c.id !== catalogueId
    ).sort((a, b) =>  a.order - b.order)
    filteredCatalogueSubscriptions.map(c => c.order = iterator++)

    this.props.actions.editCatalogueList({
      ...selectedDepartment,
      catalogueSubscriptions: filteredCatalogueSubscriptions
    })
    this.props.actions.catalogueSubUpdateSubmit()
    this.props.actions.clearSelectedCatalogue()
  }

  handleSelectDepartment = (departments, departmentId) => {
    const selectedDepartment = departments.find(h => h.departmentID === departmentId)
    return (selectedDepartment)
  }

  handleSelectCatalogue = (departmentId, catalogueId) => {
    const { catalogueSubscriptions } = this.props.state.catalogueSubscriptions.selectedDepartment
    const selectedCatalogue = catalogueSubscriptions.find(c => c.id === catalogueId)
    return (selectedCatalogue)
  }

  handleClearSelectedCatalogue = (event) => {
    this.props.actions.clearSelectedCatalogue()
  }

  handleDragSelectDepartment = (departmentId) => (event) => {
    const { catalogueSubscriptions } = this.props.state.catalogueSubscriptions
    this.props.actions.setSelectedDepartment(
      this.handleSelectDepartment(catalogueSubscriptions, departmentId)
    )
  }

  handleDragSelectCatalogue = (departmentId, catalogueId) => (event) => {
    this.props.actions.setSelectedCatalogue(
      this.handleSelectCatalogue(departmentId, catalogueId)
    )
  }

  handleCatalogSortUpdate = (event) => {
    const { selectedDepartment, selectedCatalogue } = this.props.state.catalogueSubscriptions
    const { catalogueSubscriptions } = selectedDepartment
    const newItems = catalogueSubscriptions
    const $node = $(`#catalogue-sort-area-${selectedDepartment.departmentID}`)
    const ids = $node.sortable('toArray', { attribute: 'data-id' })

    ids.forEach((catalogueId, index) => {
      const item = find(newItems, (obj) => obj.id === parseInt(catalogueId))
      item.order = index + 1
    })

    // Lets React reorder the DOM
    $node.sortable('cancel')
    this.props.actions.editCatalogueList({
      ...selectedDepartment,
      catalogueSubscriptions: newItems
    })
    this.props.actions.catalogueSubUpdateSubmit()
  }

  handleDepartmentSortUpdate = (event) => {
    const { catalogueSubscriptions, selectedDepartment } = this.props.state.catalogueSubscriptions
    const movingDepartmentId = selectedDepartment.departmentID
    const newItems = catalogueSubscriptions
    const $node = $('#department-drag-drop-area')
    const ids = $node.sortable('toArray', { attribute: 'data-departmentid' }).filter(c => c !== '')

    ids.forEach((departmentId, index) => {
      const item = find(newItems, (obj) => obj.departmentID === parseInt(departmentId))
      item.order = index + 1
    })

    // Lets React reorder the DOM
    $node.sortable('cancel')
    this.props.actions.editDepartmentList(newItems)
    this.props.actions.setSelectedDepartment(
      this.handleSelectDepartment(newItems, movingDepartmentId)
    )
    this.props.actions.reorderDepartmentsSubmit()
  }

  isExpanded = (panel) => (
    this.props.state.catalogueSubscriptions.selectedDepartment.departmentID === panel
      ? true
      : false
  )

  clearCatalogueOnChange = () => {
    this.props.actions.clearSelectedCatalogue()
  }

  // "Components"
  sortedDepartments() {
    const { classes } = this.props
    const { catalogueSubscriptions, selectedCatalogue } = this.props.state.catalogueSubscriptions
    const {
      description,
      price,
      code,
      newCatalogue
    } = selectedCatalogue

    return catalogueSubscriptions.sort((a, b) =>  a.order - b.order).map((department) => {
      return (
        <li key={department.departmentID} data-departmentid={department.departmentID} className={classes.sortableItems}>
          <ExpansionPanel
            onMouseDown={this.handleDragSelectDepartment(department.departmentID)}
            expanded={this.isExpanded(department.departmentID)}
            onChange={this.clearCatalogueOnChange}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{department.departmentName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <ul className={classes.catalogueColumn} id={`catalogue-sort-area-${department.departmentID}`}>
                {department.catalogueSubscriptions.sort((a, b) =>  a.order - b.order).map((catalogue) =>
                  (
                    <li
                      key={catalogue.id}
                      data-id={catalogue.id}
                      className={classes.sortableItems, classes.catalogueList}
                    >
                      <span
                        className={classes.catalogueListing}
                        onMouseDown={this.handleDragSelectCatalogue(department.departmentID, catalogue.id)}
                      >
                        <div>
                          {catalogue.description}
                        </div>
                        <div>
                          {catalogue.code}
                        </div>
                        <div>
                          {`$${catalogue.price}`}
                        </div>
                        <div>
                          <IconButton
                            aria-label="Delete"
                            onClick={this.handleDeleteCatalogueSubs(catalogue.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </span>
                    </li>
                  )
                )}
              </ul>
              <div
                className={classNames(classes.editingColumn, classes.helper)}>
                <TextField
                  id="description"
                  label="Catalogue Description"
                  className={classes.textField}
                  margin="normal"
                  style={{width: '100%'}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={description}
                  onChange={this.handleChange('description')}
                />
                <TextField
                  id="code"
                  label="Catalogue Code"
                  className={classes.textField}
                  margin="normal"
                  style={{width: '100%'}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={code}
                  onChange={this.handleChange('code')}
                />
                <TextField
                  className={classes.textField}
                  id="price"
                  label="Catalogue Price ($)"
                  margin="normal"
                  required
                  style={{width: '100%'}}
                  type="number"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={price}
                  onChange={this.handleChange('price')}
                />
                {newCatalogue
                  ? (
                    <span>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={this.handleAddCatalogueSubs}
                      >
                        Add Catalogue
                      </Button>
                    </span>
                  ) : (
                    <span>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={this.handleEditCatalogueSubs}
                      >
                        Save Edits
                      </Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={this.handleClearSelectedCatalogue}
                      >
                        Unselect
                      </Button>
                    </span>
                  )
                }

              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </li>
      )
    })
  }

  render() {
    // console.log('Catalogue Subs render(): ', this.props)
    const { classes } = this.props
    const { auctionHighlights } = this.props.state
    const { catalogueSubscriptions } = this.props.state.catalogueSubscriptions

    catalogueSubscriptions.map(c => {
      $(`#catalogue-sort-area-${c.departmentID}`).sortable({
        items: 'li',
        update: this.handleCatalogSortUpdate
      })
    })

    // Update sortable area for department lock:
    $('#department-drag-drop-area').sortable({
      items: 'li',
      update: this.handleDepartmentSortUpdate,
      disabled: this.state.locked
    })


    return (
      <div>
        <h2>Catalogue Subscriptions</h2>
        <div className={classes.topBar}>
          <p className={classes.instructions}>
            <em>Expand to edit department subscriptions, unlock to reorder departments.</em>
          </p>
          <Button
            variant="contained"
            component="span"
            className={classes.button, classes.addButton}
            onClick={this.handleDepartmentUnlock}
            color={ this.state.locked ? 'primary' : 'secondary'}
          >
            {this.state.locked
              ? <i className="material-icons">lock</i>
              : <i className="material-icons">lock_open</i>
            }
          </Button>
        </div>
        <div>
          <ul className={classes.sortable} id="department-drag-drop-area">
            {this.sortedDepartments()}
          </ul>
        </div>
      </div>
    )
  }
}

CatalogueSubs.propTypes = {
  classes: PropTypes.object.isRequired
}

CatalogueSubs.defaultProps = {

}

export default withStyles(styles)(CatalogueSubs)
