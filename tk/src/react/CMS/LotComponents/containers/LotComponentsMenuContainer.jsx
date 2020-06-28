import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lotComponentsActions from '../actions/lot-components';
import * as sharedActions from '../../Shared/actions/shared-actions';
import LotComponentsMenu from '../components/LotComponentsMenu';

const LotComponentsMenuContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <LotComponentsMenu
        {...props}
        state={state}
        actions={actions}
      />
    );
  } catch (e) {
    console.error('Something went wrong', e);
    throw e;
  }
};

// map global state to component properties
function mapStateToProps(state) {
  return {
    state: {
      ...state.global,
      ...state.appInit,
      lotComponents: state.lotComponents
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...lotComponentsActions, ...sharedActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LotComponentsMenuContainer);
