import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../actions/auction';
import { highlightsGetSubmit } from '../actions/highlights';
import { lotsGetSubmit } from '../actions/lots';
import { getAMSaleSubmit, setAMSale } from '../actions/auction-mobility';
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
      ...state.global,
      ...state.auctions,
      selectedAuction: state.selectedAuction
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...auctionsActions,
      highlightsGetSubmit,
      lotsGetSubmit,
      getAMSaleSubmit,
      setAMSale
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsTableContainer);
