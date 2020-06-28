import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import WebsiteCacheManagementManagement from '../components/WebsiteCacheManagement'
import * as websiteCacheManagementActions from '../actions/cacheManagement'

const WebsiteCacheManagamentContainer = (props) => {
  try {
    return (
      <WebsiteCacheManagementManagement
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
    selectedCacheEndpoint: state.selectedCacheEndpoint,
    cacheEndpoints: state.cacheEndpoints
  }
}

// map actions to component properties and connect to dispatch
function _mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...websiteCacheManagementActions,
    }, dispatch)
  }
}

export default connect(_mapStateToProps, _mapDispatchToProps)(WebsiteCacheManagamentContainer)