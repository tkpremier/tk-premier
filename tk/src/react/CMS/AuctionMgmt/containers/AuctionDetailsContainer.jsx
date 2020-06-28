import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../actions/auctions';
import * as updateAuctionActions from '../actions/update-auction';
import AuctionDetails from '../components/AuctionDetails';

const AuctionDetailsContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <AuctionDetails
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
      ...state.global,
      selectedAuction: state.selectedAuction
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...auctionsActions,
      ...updateAuctionActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetailsContainer);
