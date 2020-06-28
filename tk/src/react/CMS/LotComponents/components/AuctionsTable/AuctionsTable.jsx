import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { filter } from 'lodash';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Search from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TablePaginationActionsWrapped from '../../../Shared/components/TablePaginationActionsWrapped';

function descending(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => descending(a, b, orderBy) : (a, b) => -descending(a, b, orderBy);
}

const TableHeaders = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  }

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableHeaders>
            <Tooltip
              title="Sort"
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === 'saleNumber'}
                direction={order}
                onClick={this.createSortHandler('saleNumber')}
              >
                Sale Number
              </TableSortLabel>
            </Tooltip>
          </TableHeaders>
          <TableHeaders>
            <Tooltip
              title="Sort"
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === 'auctionTile'}
                direction={order}
                onClick={this.createSortHandler('auctionTitle')}
              >
                Auction Title
              </TableSortLabel>
            </Tooltip>
          </TableHeaders>
          <TableHeaders>
            <Tooltip
              title="Sort"
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === 'startDate'}
                direction={order}
                onClick={this.createSortHandler('startDate')}
              >
                Auction Start Date
              </TableSortLabel>
            </Tooltip>
          </TableHeaders>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    // minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  tableCell: {
    // padding: '4px 5px 4px 10px'
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

class ReleasesTable extends Component {
  state = {
    order: 'asc',
    orderBy: '',
    page: 0,
    rowsPerPage: 10,
    currentlyDisplayed: this.props.state.lotComponents.auctions
  }

  componentWillMount() {
    const fullList = this.props.state.lotComponents.auctions;

    this.props.actions.editAuctionsDisplayList(fullList);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }

  handleClick = (event, row) => {
    const { auctions } = this.props.state.lotComponents;
    const selectedAuction = auctions.find(a => (a.saleNumber === row.saleNumber));

    this.props.actions.selectAuction(selectedAuction);
    this.props.actions.auctionLotsRequested();
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }

  // "Search" filtering
  filterOnInputChange = (event) => {
    let filterText = event.target.value ? event.target.value : "";
    const newlyDisplayed = filter(
      this.props.state.lotComponents.auctions,
      auction => (
        (auction.auctionTitle && auction.auctionTitle.toUpperCase().includes(filterText.toUpperCase()))
        || (auction.saleNumber && auction.saleNumber.toUpperCase().includes(filterText.toUpperCase()))
        || (auction.startDate && auction.startDate.includes(filterText)) 
      )
    );

    this.setState({
      searchTerm: event.target.value,
      currentlyDisplayed: newlyDisplayed
    });
  }

  render() {
    // console.log('AuctionsTable render() with props: ', this.props);
    let iterator = 0;
    const auctionsWithId = this.state.currentlyDisplayed.map((obj) => ({ ...obj, id: iterator++ }));
    const { classes } = this.props;
    const {
      order,
      orderBy,
      rowsPerPage,
      page
    } = this.state;
    const emptyRows = rowsPerPage
      - Math.min(rowsPerPage, auctionsWithId.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <br />
        <div className={classes.margin}>
          <Grid
            container
            spacing={8}
            alignItems="flex-end"
            justify="center"
          >
            <Grid item>
              <Search />
            </Grid>
            <Grid item>
              <TextField
                id="auction-search"
                label="Search"
                onChange={this.filterOnInputChange}
              />
            </Grid>
          </Grid>
        </div>
        <br />
        <div className={classes.tableWrapper} style={{ position: 'relative' }}>
          <Table className={classes.table}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={auctionsWithId.length}
              rows={auctionsWithId}
            />
            <TableBody>
              {stableSort(auctionsWithId, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isSelected = this.props.state.lotComponents.selectedAuction.saleNumber === row.saleNumber;
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      onClick={event => this.handleClick(event, row)}
                      selected={isSelected}
                      aria-checked={isSelected}
                    >
                      <TableCell component="th" scope="row" className={classes.tableCell}>
                        {row.saleNumber}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.auctionTitle}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.startDate.slice('T', 10)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={auctionsWithId.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }
}

ReleasesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    editAuctionsDisplayList: PropTypes.func.isRequired,
    auctionLotsRequested: PropTypes.func.isRequired,
    selectAuction: PropTypes.func.isRequired
  }).isRequired
}

export default withStyles(styles)(ReleasesTable)
