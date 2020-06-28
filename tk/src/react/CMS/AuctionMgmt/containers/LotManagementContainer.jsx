import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lotsActions from '../actions/update-lot';
import * as cloudinaryActions from '../actions/cloudinary-upload';
import LotManagement from '../components/LotManagement';

const LotManagementContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <LotManagement
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
      ...state,
      selectedLot: state.selectedLot
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...lotsActions,
      ...cloudinaryActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LotManagementContainer);
