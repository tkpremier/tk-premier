import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import makeStore from './store';

import EditorialsContainer from './containers/EditorialsContainer';
import PhillipsSnackbarContainer from '../Shared/containers/PhillipsSnackbarContainer';

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
          <EditorialsContainer />
          <PhillipsSnackbarContainer />
        </Fragment>
      </Provider>
    );
  }
}

const mountNode = document.getElementById('editorials');
ReactDOM.render(<Index />, mountNode);
