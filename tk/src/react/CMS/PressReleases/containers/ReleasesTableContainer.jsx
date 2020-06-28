'use strict'

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pressReleasesActions from '../actions/press-releases'
import ReleasesTable from '../components/ReleasesTable'

const ReleasesTableContainer = (props) => {
  try {
    const { state, actions } = props
    return (
      <ReleasesTable
        {...props}
        state={state}
        actions={actions}
      />
    )
  } catch (e) {
    console.error('Something went wrong', e)
    throw e
  }
}

// map global state to component properties
function mapStateToProps(state) {
  return {
    state: {
      ...state.global,
      ...state.auctions,
      pressReleases: state.pressReleases
    }
  }
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...pressReleasesActions,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesTableContainer)
