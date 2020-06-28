import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as makerBiosActions from '../actions/maker-bios';
import MakerBios from '../components/MakerBios';

const PressReleasesContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <MakerBios
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
      makerBios: state.makerBios
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...makerBiosActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PressReleasesContainer);
