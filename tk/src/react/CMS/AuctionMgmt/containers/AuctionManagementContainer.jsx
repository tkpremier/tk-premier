import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../actions/auctions';
import * as updateAuctionActions from '../actions/update-auction';
import * as tagsActions from '../actions/tags';
import AuctionManagement from '../components/AuctionManagement';

const AuctionManagementContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <AuctionManagement
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
      ...state.auctions,
      ...state.lots,
      selectedLot: state.selectedLot,
      selectedAuction: state.selectedAuction,
      auctionMobility: state.auctionMobility
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...auctionsActions,
      ...updateAuctionActions,
      ...tagsActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionManagementContainer);
