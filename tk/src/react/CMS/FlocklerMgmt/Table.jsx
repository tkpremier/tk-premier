import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import format from 'date-fns/format';
import { getFlocklerEditorials, getEditorialById } from '../../../services/FlocklerService';

import { selectItem } from './actions';
import { fullWidth } from './styles';

const styles = () => ({
  root: {
    ...fullWidth
  },
  table: {
    ...fullWidth,
    overflowX: 'auto'
  }
});
const getDescriptions = (type = 'state', value) => {
  const displayTypes = [
    'Not Featured',
    'Highlight',
    'Left Featured',
    'Right Featured'
  ];
  const states = [
    'Inactive',
    'Preview',
    'Active'
  ];
  if (type === 'display') {
    switch (value) {
      case 1:
      case 2:
      case 3:
      case 4:
        return displayTypes[value - 1];
      default:
        return 'Not a valid display type';
    }
  }
  switch (value) {
    case 1:
    case 2:
    case 3:
      return states[value - 1];
    default:
      return 'Not a valid state';
  }
};
// [
//   'Title',
//   'FlocklerId',
//   'Publish Date',
//   'State',
//   'Display Type',
//   'Associated Sales',
//   'Section',
//   'Maker'
// ]

const EditorialsTable = ({ classes }) => {
  const { activeView, data, selectedEditorial } = useSelector(state => state);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangeRowsPP = e => setRowsPerPage(e.target.value);
  const handleChangePage = (e, newPage) => setPage(newPage);
  return (
    <Grid xs={12} sm={5} item>
      <Paper className={classes.root}>
        <div style={{ overflowX: 'auto' }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow
                hover
              >
                <TableCell>Title</TableCell>
                <TableCell>Publish Date</TableCell>
                <TableCell align="right">Flockler ID</TableCell>
                <TableCell align="right">State</TableCell>
                {activeView === 'table'
                  ? <TableCell align="right">Display Type</TableCell>
                  : null
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, (page * rowsPerPage + rowsPerPage)).map(flockler => (
                <TableRow
                  hover
                  key={flockler.flocklerId}
                  onClick={() => dispatch(selectItem(flockler))}
                  selected={flockler.flocklerId === selectedEditorial.flocklerId}
                >
                  <TableCell component="th" scope="row">
                    {flockler.title}
                  </TableCell>
                  <TableCell>{format(new Date(flockler.publishDate), 'MMM d yyyy')}</TableCell>
                  <TableCell align="right">{flockler.flocklerId}</TableCell>
                  <TableCell align="right">{getDescriptions('state', flockler.state)}</TableCell>
                  {
                    activeView === 'table'
                      ? <TableCell align="right">{getDescriptions('display', flockler.displayType)}</TableCell>
                      : null
                  }


                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="tr"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPP}
              />
            </TableFooter>
          </Table>
        </div>
      </Paper>

    </Grid>
  );
};

EditorialsTable.propTypes = {
  classes: PropTypes.shape({
    root: '',
    table: ''
  }).isRequired
};

export default withStyles(styles)(EditorialsTable);
