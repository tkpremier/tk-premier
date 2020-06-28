import React, { Fragment } from "react"
import { Provider } from 'react-redux'
import makeStore from './store'

import StickyManagementContainer from './containers/StickyManagementContainer'
import PhillipsSnackbarContainer from "./containers/PhillipsSnackbarContainer";

class StickyManagementIndex extends React.Component {
  state = {}
  constructor(props) {
    super(props);    
    const intialState = {
      stickies: props.stickies
    };
    this.store = makeStore(intialState)
  }

  componentWillMount() {
  }

  render() {
    return (
      <Provider store={this.store}>
        <Fragment>
          <StickyManagementContainer />
          <PhillipsSnackbarContainer />
        </Fragment>
      </Provider>
    )
  }
}

export { StickyManagementIndex }
// const mountNode = document.getElementById("sticky-management")
// ReactDOM.render(<Index />, mountNode)
