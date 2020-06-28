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
          <TableHeaders style={{ width: '70%' }}>
            <Tooltip
              title="Sort"
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === 'email'}
                direction={order}
                onClick={this.createSortHandler('email')}
              >
                User Email
              </TableSortLabel>
            </Tooltip>
          </TableHeaders>
          <TableHeaders>
            <Tooltip
              title="Sort"
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === 'lastName'}
                direction={order}
                onClick={this.createSortHandler('lastName')}
              >
                User Name
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
  instructions: {
    justifySelf: 'flex-start'
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

class UserManagementTable extends Component {
  state = {
    order: 'asc',
    orderBy: '',
    page: 0,
    rowsPerPage: 10
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }

  handleClick = (event, row) => {
    const { users } = this.props.state.users;
    const selectedUser = users.find(a => (a.email === row.email));

    this.props.actions.setSelectedUser(selectedUser);
    this.props.actions.userDetailsRequested();
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }

  // Search calls api in this part + times debounce
  queryOnInput = (event) => {
    const { value } = event.target;
    this.props.actions.setUserQueryString(value.trim());
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.actions.usersRequested();
    }, 500);
  }

  render() {
    let iterator = 0;
    const membersWithId = this.props.state.users.users.map((obj) => ({ ...obj, gid: iterator++ }));
    const { classes } = this.props;
    const {
      order,
      orderBy,
      rowsPerPage,
      page
    } = this.state;
    const {
      selectedUser
    } = this.props.state.users;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, membersWithId.length - page * rowsPerPage);

    // console.log('UserManagementTable render() with props: ', this.props);

    return (
      <Paper className={classes.root}>
        <br />
        <div className={classes.margin}>
          <p className={classes.instructions}>
            <em>Enter text to search for users:</em>
          </p>
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
                onChange={this.queryOnInput}
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
              rowCount={membersWithId.length}
              rows={membersWithId}
            />
            <TableBody>
              {stableSort(membersWithId, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isSelected = selectedUser.email === row.email;
                  return (
                    <TableRow
                      hover
                      key={row.gid}
                      onClick={event => this.handleClick(event, row)}
                      selected={isSelected}
                      aria-checked={isSelected}>
                      <TableCell component="th" scope="row" className={classes.tableCell} style={{ width: '50px' }}>
                        {row.email}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {`${row.firstName} ${row.lastName}`}
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
                  count={membersWithId.length}
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

UserManagementTable.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    setSelectedUser: PropTypes.func.isRequired,
    setUserQueryString: PropTypes.func.isRequired,
    usersRequested: PropTypes.func.isRequired,
    userDetailsRequested: PropTypes.func.isRequired
  }).isRequired
};

export default withStyles(styles)(UserManagementTable);
