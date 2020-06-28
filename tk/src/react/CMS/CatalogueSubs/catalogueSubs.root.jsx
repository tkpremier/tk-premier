import React, { Fragment } from "react"
import { Provider } from 'react-redux'
import makeStore from './store'

import CatalogueSubsContainer from './containers/CatalogueSubsContainer'
import PhillipsSnackbarContainer from '../Shared/containers/PhillipsSnackbarContainer'

class CatalogueSubsIndex extends React.Component {
  state = {}

  constructor(props) {
    super(props);
    const intialState = {
      catalogueSubscriptions: props.catalogueSubscriptions
    };
    this.store = makeStore(intialState)
  }

  render() {
    return (
      <Provider store={this.store}>
        <Fragment>
          <CatalogueSubsContainer />
          <PhillipsSnackbarContainer />
        </Fragment>
      </Provider>
    )
  }
}

export { CatalogueSubsIndex }
// const mountNode = document.getElementById("sticky-management")
// ReactDOM.render(<Index />, mountNode)
