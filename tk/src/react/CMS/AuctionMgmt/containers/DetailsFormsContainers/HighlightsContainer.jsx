import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as highlightsActions from '../../actions/highlights';
import Highlights from '../../components/DetailsForms/Highlights';

const HighlightsContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <Highlights
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
      ...state.globalState,
      ...state.highlights,
      selectedAuction: state.selectedAuction
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...highlightsActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightsContainer);
