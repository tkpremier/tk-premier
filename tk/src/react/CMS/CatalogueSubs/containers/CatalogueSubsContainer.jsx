import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as catalogueSubsActions from '../actions/catalogue-subscriptions'
import CatalogueSubs from '../components/CatalogueSubs'

const CatalogueSubsContainer = (props) => {
  try {
    const { state, actions } = props
    return (
      <CatalogueSubs
        {...props}
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
      catalogueSubscriptions: state.catalogueSubscriptions
    }
  }
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...catalogueSubsActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueSubsContainer)
