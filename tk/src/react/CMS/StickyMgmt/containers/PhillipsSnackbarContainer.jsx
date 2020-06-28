import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PhillipsSnackbar from '../components/PhillipsSnackbar'
import { clearAlerts } from '../actions/sticky'

const StickyEditContainer = (props) => {
  try {
    return (
      <PhillipsSnackbar
        {...props}
      />
    )
  } catch (e) {
    console.error('Something went wrong ', e)
    throw e
  }
}

// map global state to component properties
function _mapStateToProps(state) {
  return {
    alert: state.alert
  }
}

// map actions to component properties and connect to dispatch
function _mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearAlerts
    }, dispatch)
  }
}

export default connect(_mapStateToProps, _mapDispatchToProps)(StickyEditContainer)