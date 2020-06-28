import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import makeStore from './store'

import PressReleasesContainer from './containers/PressReleasesContainer'
import PhillipsSnackbarContainer from '../Shared/containers/PhillipsSnackbarContainer'

class PressReleasesIndex extends React.Component {
  state = {}

  constructor(props) {
    super(props);
    const intialState = {
      pressReleases: props.pressReleases
    };
    this.store = makeStore(intialState)
  }

  render() {
    return (
      <Provider store={this.store}>
        <Fragment>
          <PressReleasesContainer />
          <PhillipsSnackbarContainer />
        </Fragment>
      </Provider>
    )
  }
}

export { PressReleasesIndex }
// const mountNode = document.getElementById("press-releases")
// ReactDOM.render(<Index />, mountNode)
