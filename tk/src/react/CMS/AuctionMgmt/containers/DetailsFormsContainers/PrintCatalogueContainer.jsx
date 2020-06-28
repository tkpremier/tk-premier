import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../../actions/auction';
import * as uploadImageActions from '../../actions/upload-image';
import PrintCatalogue from '../../components/DetailsForms/PrintCatalogue';

const PrintCatalogueContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <PrintCatalogue
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
      selectedAuction: state.selectedAuction,
      uploadImage: state.uploadImage
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...auctionsActions,
      ...uploadImageActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintCatalogueContainer);
