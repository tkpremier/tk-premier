import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../../actions/auction';
import LiveAuctionDetails from '../../components/DetailsForms/LiveAuctionDetails';

const LiveAuctionDetailsContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <LiveAuctionDetails
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

export default connect(mapStateToProps, mapDispatchToProps)(LiveAuctionDetailsContainer);
