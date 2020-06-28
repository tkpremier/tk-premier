import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import makeStore from './store';

import UserManagementContainer from './containers/UserManagementContainer';
import PhillipsSnackbarContainer from '../Shared/containers/PhillipsSnackbarContainer';

import '../Styles/global.scss';
import '../../styles/editorials.scss';

class Index extends React.Component {
  state = {}

  componentWillMount() {
    const store = makeStore();
    this.setState({ store: store });
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <Fragment>
          <UserManagementContainer />
          <PhillipsSnackbarContainer />
        </Fragment>
      </Provider>
    );
  }
}

const mountNode = document.getElementById('users');
ReactDOM.render(<Index />, mountNode);
