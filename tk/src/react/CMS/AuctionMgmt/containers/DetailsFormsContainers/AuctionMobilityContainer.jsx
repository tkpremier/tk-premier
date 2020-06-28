import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../../actions/auction';
import * as aMSaleActions from '../../actions/auction-mobility';
import AuctionMobility from '../../components/DetailsForms/AuctionMobility';

const AuctionMobilityContainer = (props) => {
  console.log('AuctionMobilityContainer', props);
  try {
    const { state, actions } = props;
    return (
      <AuctionMobility
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
      auctionMobility: state.auctionMobility,
      selectedAuction: state.selectedAuction
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...auctionsActions,
      ...aMSaleActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionMobilityContainer);
