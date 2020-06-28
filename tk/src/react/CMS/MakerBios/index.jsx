import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import makeStore from './store';

import MakerBiosContainer from './containers/MakerBiosContainer';
import PhillipsSnackbarContainer from '../Shared/containers/PhillipsSnackbarContainer';

import '../Styles/global.scss';

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
          <MakerBiosContainer />
          <PhillipsSnackbarContainer />
        </Fragment>
      </Provider>
    );
  }
}

const mountNode = document.getElementById('maker-bios');
ReactDOM.render(<Index />, mountNode);
