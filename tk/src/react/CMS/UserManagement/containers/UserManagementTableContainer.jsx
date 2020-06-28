import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/users';
import UserManagementTable from '../components/UserManagementTable';

const UserManagementTableContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <UserManagementTable
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
    actions: bindActionCreators({
      ...userActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementTableContainer);
