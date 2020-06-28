import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pressReleaseActions from '../actions/press-releases'
import * as sharedActions from '../../Shared/actions/shared-actions'
import PressReleaseDetails from '../components/PressReleaseDetails'

const PressReleaseDetailsContainer = (props) => {
  try {
    const { state, actions } = props
    return (
      <PressReleaseDetails
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
    actions: bindActionCreators({ ...pressReleaseActions, ...sharedActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PressReleaseDetailsContainer)
