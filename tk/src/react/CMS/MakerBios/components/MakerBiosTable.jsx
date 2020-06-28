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

import TablePaginationActionsWrapped from '../../Shared/components/TablePaginationActionsWrapped';

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
  },
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
          <TableHeaders style={{ width: '15px' }}>
            <Tooltip
              title="Sort"
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === 'makerId'}
                direction={order}
                onClick={this.createSortHandler('makerId')}
              >
                Maker Id
              </TableSortLabel>
            </Tooltip>
          </TableHeaders>
          <TableHeaders>
            <Tooltip
              title="Sort"
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === 'makerName'}
                direction={order}
                onClick={this.createSortHandler('makerName')}
              >
                Maker Name
              </TableSortLabel>
            </Tooltip>
          </TableHeaders>
        </TableRow>
      </TableHead>
    )
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
  }
});

class MakerBiosTable extends Component {
  state = {
    order: 'asc',
    orderBy: '',
    page: 0,
    rowsPerPage: 10,
    currentlyDisplayed: this.props.state.makerBios.makerBios
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }

  handleClick = (event, row) => {
    const { makerBios } = this.props.state.makerBios;
    const selectedMakerBio = makerBios.find(a => (a.makerId === row.makerId));
    this.props.actions.setSelectedMakerBio(selectedMakerBio);
    // this.props.actions.pressReleaseArticleRequested();
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
    let newlyDisplayed = filter(
      this.props.state.makerBios.makerBios,
      bio => (
        bio.makerName.toLowerCase().includes(event.target.value)
        || bio.makerName.toUpperCase().includes(event.target.value)
        || bio.makerId.toString().includes(event.target.value)
      )
    );

    this.setState({
      searchTerm: event.target.value,
      currentlyDisplayed: newlyDisplayed
    });
  }

  render() {
    let iterator = 0;
    const biosWithId = this.state.currentlyDisplayed.map((obj) => ({ ...obj, id: iterator++ }));
    const { classes } = this.props;
    const {
      order,
      orderBy,
      rowsPerPage,
      page
    } = this.state;
    const {
      selectedMakerBio
    } = this.props.state.makerBios;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, biosWithId.length - page * rowsPerPage);

    // console.log('MakerBiosTable render() with props: ', this.props);

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
                id="lots-search"
                label="Search"
                onChange={this.filterOnInputChange}
              />
            </Grid>
          </Grid>
        </div>
        <br />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={biosWithId.length}
              rows={biosWithId}
            />
            <TableBody>
              {stableSort(biosWithId, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isSelected = selectedMakerBio.makerId === row.makerId;
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      onClick={event => this.handleClick(event, row)}
                      selected={isSelected}
                      aria-checked={isSelected}>
                      <TableCell component="th" scope="row" className={classes.tableCell} style={{ width: '50px' }}>
                        {row.makerId}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.makerName}
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
                  count={biosWithId.length}
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
    );
  }
}

MakerBiosTable.propTypes = {
  classes: PropTypes.object.isRequired
  // lots: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(MakerBiosTable);
