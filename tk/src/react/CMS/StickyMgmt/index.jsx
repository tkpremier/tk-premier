import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import makeStore from './store'

import StickyManagementContainer from './containers/StickyManagementContainer'

import '../Styles/global.scss'

class Index extends React.Component {
  state = {}

  componentWillMount() {
    const store = makeStore()
    this.setState({ store: store })
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <StickyManagementContainer />
      </Provider>
    )
  }
}

const mountNode = document.getElementById("sticky-management")
ReactDOM.render(<Index />, mountNode)
