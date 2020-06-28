import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/users';
import * as sharedActions from '../../Shared/actions/shared-actions';
import UserManagement from '../components/UserManagement';

const UserManagementContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <UserManagement
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
      users: state.users
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...userActions, ...sharedActions  }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementContainer);
