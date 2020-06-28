import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { configureStore } from '../../utils/configureStore';
import * as reducers from './reducers';
import EditorialsTable from './Table';
import Form from './Form';
import { editorialPropTypes } from '../../PropTypes/proptypes';

const setInitialState = ({ data, selectedEditorial }) => ({
  activeView: 'form',
  data,
  formStatus: {
    pending: false,
    msg: ''
  },
  selectedEditorial
});

const App = ({ data, selectedEditorial }) => (
  <Provider store={configureStore({ ...reducers }, setInitialState({ data, selectedEditorial }))}>
    <Grid container spacing={16}>
      <EditorialsTable />
      <Form />
    </Grid>
  </Provider>
);
App.defaultProps = {
  data: []
};

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(editorialPropTypes)),
  selectedEditorial: PropTypes.shape(editorialPropTypes).isRequired
};

export default App;
