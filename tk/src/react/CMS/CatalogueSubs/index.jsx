import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import makeStore from './store'

import CatalogueSubsContainer from './containers/CatalogueSubsContainer'

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
        <CatalogueSubsContainer />
      </Provider>
    )
  }
}

const mountNode = document.getElementById('catalogue-subscriptions')
ReactDOM.render(<Index />, mountNode)
