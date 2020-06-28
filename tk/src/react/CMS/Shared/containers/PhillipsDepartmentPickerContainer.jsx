import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sharedActions from '../actions/shared-actions';
import PhillipsDepartmentPicker from '../components/PhillipsDepartmentPicker';

const PhillipsDepartmentPickerContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <PhillipsDepartmentPicker
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
      ...state
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...sharedActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhillipsDepartmentPickerContainer);
