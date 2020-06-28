import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as teamPageActions from '../actions/team-page';
import TeamMembersTable from '../components/TeamMembersTable';

const TeamMembersTableContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <TeamMembersTable
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
      teamPage: state.teamPage
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...teamPageActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembersTableContainer);
