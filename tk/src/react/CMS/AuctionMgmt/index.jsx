import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AuctionManagementContainer from './containers/AuctionManagementContainer';
import PhillipsSnackbarContainer from '../Shared/containers/PhillipsSnackbarContainer';

import makeStore from './store';

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
          <AuctionManagementContainer />
          <PhillipsSnackbarContainer />
        </Fragment>
      </Provider>
    );
  }
}

const mountNode = document.getElementById('auction-management');
ReactDOM.render(<Index />, mountNode);
