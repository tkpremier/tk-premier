import React from 'react'
import PropTypes from 'prop-types'
import { sortBy, find, clone } from 'lodash'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%',
  },
  menu: {
    width: 200,
  },
})

class FlocklerIds extends React.Component {
  state = {
    multiline: 'Controlled',
    flocklerIds: [],
    // flocklerIds: [
    //   {key: 34121462, value: "VR Walkthrough: Summer School"},
    //   {key: 33878677, value: "Spotlight on Nicolas Party"},
    //   {key: 33870919, value: "Guide to Art Night 2018"}],
    selectedArticle: '',
    // auctionEditorials: [{
    //   displayOrder: 2,
    //   flocklerId: 33351568,
    //   isDisplay: true
    // }, {
    //   displayOrder: 3,
    //   flocklerId: 33356988,
    //   isDisplay: true
    // }, {
    //   displayOrder: 0,
    //   flocklerId: 33479686,
    //   isDisplay: true
    // }, {
    //   displayOrder: 1,
    //   flocklerId: 33587786,
    //   isDisplay: true
    // }, {
    //   displayOrder: 4,
    //   flocklerId: 33614164,
    //   isDisplay: true
    // }]
  }

  // React Lifecycle
  componentWillMount() {
    const flocklerIds = JSON.parse(localStorage.getItem('flocklerArticles'))
    this.setState({ flocklerIds: flocklerIds})
  }

  componentDidMount() {
    $('.sortable-chip-list').sortable({
      items: 'li',
      update: this.handleSortableUpdate
    })
  }

  // Handlers
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
    this.props.actions.editDetails(name, event.target.value)
  }

  handleDisplayValue = (event) => {
    const editorials = this.props.state.selectedAuction.auctionEditorials
    const articleIndex = editorials.findIndex(obj => obj.flocklerId == event.target.innerText)
    const displayFlag = editorials[articleIndex].isDisplay ? false : true
    const updatedArticle = {
      ...editorials[articleIndex],
      isDisplay: displayFlag
    }
    const updatedEditorials = [
      ...editorials.slice(0, articleIndex),
      updatedArticle,
      ...editorials.slice(articleIndex + 1),
    ]
    this.props.actions.editDetails('auctionEditorials', updatedEditorials)
  }

  handleDeleteArticle = (event) => {
    let iterator = 0
    const filteredArticles = this.props.state.selectedAuction.auctionEditorials.filter(
      a => a.flocklerId != event.currentTarget.parentElement.innerText
    ).sort((a, b) =>  a.displayOrder - b.displayOrder)
    filteredArticles.map(a => a.displayOrder = iterator++ )
    this.props.actions.editDetails('auctionEditorials', filteredArticles)
  }

  handleAddArticle = () => {
    let iterator = 0
    let filteredArticles = clone(this.props.state.selectedAuction.auctionEditorials, true)
    if (typeof(this.state.selectedArticle) === 'number') {
      filteredArticles.push({
        displayOrder: -1,
        flocklerId: this.state.selectedArticle,
        isDisplay: true
      })
      filteredArticles.sort((a, b) =>  a.displayOrder - b.displayOrder)
      filteredArticles.map(a => a.displayOrder = iterator++)
      this.props.actions.editDetails('auctionEditorials', filteredArticles)
    }
  }

  handleSortableUpdate = () => {
    const newItems = this.props.state.selectedAuction.auctionEditorials
    const $node = $('.sortable-chip-list')
    const ids = $node.sortable('toArray', { attribute: 'data-id' })

    ids.forEach((flocklerId, index) => {
      const item = find(newItems, (obj) => obj.flocklerId === parseInt(flocklerId))
      item.displayOrder = index
    })

    // Lets React reorder the DOM
    $node.sortable('cancel')
    this.props.actions.editDetails('auctionEditorials', newItems)
  }

  // "Components"
  sortedItems() {
    // const auctionEditorials = sortBy(this.props.state.selectedAuction.auctionEditorials, 'displayOrder')
    let iterator = 0
    const itemsWithId = this.props.state.selectedAuction.auctionEditorials.map((obj) => ({ ...obj, id: iterator++ }))
    const { classes } = this.props

    return itemsWithId.sort((a, b) =>  a.displayOrder - b.displayOrder).map((item) => {
      if (item.isDisplay === true) {
        return (
          <li key={item.id} data-id={item.flocklerId}>
            <Chip
              label={item.flocklerId}
              onClick={this.handleDisplayValue}
              onDelete={this.handleDeleteArticle}
              className={classes.chip}
              color="primary"
              value={item.flocklerId}
            />
          </li>
        )
      }

      return (
        <li key={item.id} data-id={item.flocklerId}>
          <Chip
            label={item.flocklerId}
            onClick={this.handleDisplayValue}
            onDelete={this.handleDeleteArticle}
            className={classes.chip}
            value={item.flocklerId}
          />
        </li>
      )
    })
  }

  render() {
    console.log('render() flocklerIds: ', this.props, this.state)
    const { classes } = this.props
    const { flocklerIds } = this.state

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item container xs={6}>
            <Grid item xs={12}>
              &nbsp;
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="select-article"
                select
                label="Flocker Articles"
                className={classes.textField}
                value={this.state.selectedArticle}
                fullwidth="true"
                onChange={this.handleChange('selectedArticle')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
              >
                {flocklerIds != null
                  ? flocklerIds.map(article => (
                    <MenuItem key={article.key} value={article.key}>
                      {article.key} - {article.value}
                    </MenuItem>))
                  : <MenuItem>
                      Flocker Articles Not Found!
                  </MenuItem>
                }
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="span"
                className={classes.button}
                onClick={(event) => this.handleAddArticle(event)}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={12}>
              If the flockler article you're looking for is not on the list,
              you may need to <a href="http://localhost:8000/Editorial" target="_blank">activate it</a>
            </Grid>
          </Grid>
          <Grid item container xs={6} spacing={24}>
            <Grid item xs={12}>
              &nbsp;
            </Grid>
            <Grid item xs={12}>
              <div className="sortable-chip-list">
                <ul>{this.sortedItems()}</ul>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

FlocklerIds.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FlocklerIds)
