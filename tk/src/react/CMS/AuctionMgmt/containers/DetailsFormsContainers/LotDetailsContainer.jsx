import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as updateLotActions from '../../actions/update-lot';
import * as lotActions from '../../actions/lot';
import LotDetails from '../../components/DetailsForms/LotDetails';

const LotDetailsContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <LotDetails
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
      ...lotActions,
      ...updateLotActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LotDetailsContainer);
