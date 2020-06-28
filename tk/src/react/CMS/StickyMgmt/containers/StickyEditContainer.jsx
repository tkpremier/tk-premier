import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StickyEdit from '../components/StickyEdit'
import * as stickyActions from '../actions/sticky'
import * as formErrorActions from '../actions/formErrors'

const StickyEditContainer = (props) => {
  try {    
    return (
      <StickyEdit
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
    alert: state.alert,
    deleteStickyDialog: state.deleteStickyDialog,
    formErrors: state.formErrors,
    selectedSticky: state.selectedSticky
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

export default connect(_mapStateToProps, _mapDispatchToProps)(StickyEditContainer)