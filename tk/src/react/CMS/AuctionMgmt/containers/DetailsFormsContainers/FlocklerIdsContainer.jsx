import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../../actions/auction';
import FlocklerIds from '../../components/DetailsForms/FlocklerIds';

const FlocklerIdsContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <FlocklerIds
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
      selectedAuction: state.selectedAuction
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...auctionsActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlocklerIdsContainer);
