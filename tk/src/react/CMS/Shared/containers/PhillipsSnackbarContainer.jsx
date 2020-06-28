import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PhillipsSnackbar from '../components/PhillipsSnackbar'
import { clearAlerts } from '../actions/shared-actions'

const PhillipsSnackbarContainer = (props) => {
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
function mapStateToProps(state) {
  return {
    alert: state.alert
  }
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearAlerts
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhillipsSnackbarContainer)
