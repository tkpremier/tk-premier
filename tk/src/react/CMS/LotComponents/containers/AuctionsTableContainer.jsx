import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lotComponentsActions from '../actions/lot-components';
import AuctionsTable from '../components/AuctionsTable/AuctionsTable';

const AuctionsTableContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <AuctionsTable
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
      selectedAuction: state.selectedAuction
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...lotComponentsActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsTableContainer);
