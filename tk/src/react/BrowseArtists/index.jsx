import React, { Component } from 'react';
import { isNull } from 'lodash/fp';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, StaticRouter } from 'react-router-dom';
import App from './containers/app';
import configureStore from './configureStore';
import initialState from './initialstate';

const nullServerData = {
  letter: '',
  data : [],
  currentPage: 0,
  currentCount: 0,
  totalCount : 0,
  isFetching: false
};


class BrowseArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'mounted': false
    };
  }
  componentDidMount() {
    this.setState({
      mounted: true
    });
  }
  render() {
    const serverState = isNull(this.props.serverData) ? nullServerData : this.props.serverData;
    const store = configureStore(initialState(serverState));
    const AddRouter = this.state.mounted ?
      (<BrowserRouter>
        <div>
          <Route path="/artists/:letter" component={App} />
        </div>
      </BrowserRouter>) :
      (<StaticRouter basename="/artists">
        <App />
      </StaticRouter>);

    return (
      <Provider store={store}>
        {AddRouter}
      </Provider>
    );
  }
}

export { BrowseArtists };
