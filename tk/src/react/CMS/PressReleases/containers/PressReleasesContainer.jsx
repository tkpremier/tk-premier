import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pressReleaseActions from '../actions/press-releases'
import PressReleases from '../components/PressReleases'

const PressReleasesContainer = (props) => {
  try {
    const { state, actions } = props
    return (
      <PressReleases
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
      ...state.appInit,
      pressReleases: state.pressReleases
    }
  }
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...pressReleaseActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PressReleasesContainer)
