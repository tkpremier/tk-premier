import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lotComponentsActions from '../actions/lot-components';

import AuctionLotsTable from '../components/AuctionsTable/AuctionLotsTable';

const AuctionLotsTableContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <AuctionLotsTable
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
      selectedLot: state.selectedLot
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

export default connect(mapStateToProps, mapDispatchToProps)(AuctionLotsTableContainer);
