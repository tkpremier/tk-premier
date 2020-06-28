import React, { Fragment } from "react"
import { Provider } from 'react-redux'
import makeStore from './store'

import WebsiteCacheManagamentContainer from './containers/WebsiteCacheManagamentContainer'
import PhillipsSnackbarContainer from '../Shared/containers/PhillipsSnackbarContainer'

class WebsiteCacheManagementIndex extends React.Component {
  state = {}
  constructor(props) {
    super(props);    
    const intialState = {
      globalState:{
        websiteUrl: props.websiteUrl
      }
    };
    this.store = makeStore(intialState)
  }

  componentWillMount() {
  }

  render() {
    return (
      <Provider store={this.store}>
        <Fragment>
          <WebsiteCacheManagamentContainer />
          <PhillipsSnackbarContainer />
        </Fragment>
      </Provider>
    )
  }
}

export { WebsiteCacheManagementIndex }
