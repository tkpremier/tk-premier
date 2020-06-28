import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StickyManagement from '../components/StickyManagement'
import * as stickyActions from '../actions/sticky'
import * as formErrorActions from '../actions/formErrors'

const StickyManagementContainer = (props) => {
  try {
    return (
      <StickyManagement
        {...props}
      />
    )
  } catch (e) {
    console.error('Something went wrong', e)
    throw e
  }
}

// map global state to component properties
function _mapStateToProps(state) {
  return {
    state: {
      ...state.global
    },
    alert: state.alert,
    deleteStickyDialog: state.deleteStickyDialog,
    formErrors: state.formErrors,
    selectedSticky: state.selectedSticky,
    stickies: state.stickies
  }
}

// map actions to component properties and connect to dispatch
function _mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...stickyActions,
      ...formErrorActions
    }, dispatch)
  }
}

export default connect(_mapStateToProps, _mapDispatchToProps)(StickyManagementContainer)