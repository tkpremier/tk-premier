import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../../actions/auction';
import * as uploadFileActions from '../../actions/upload-file';
import {
  setUploadFile,
  clearUploadFile
} from '../../../Shared/actions/shared-actions';
import SaleResults from '../../components/DetailsForms/SaleResults';

const SaleResultsContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <SaleResults
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
      uploadFile: state.uploadFile
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...auctionsActions,
      ...uploadFileActions,
      setUploadFile,
      clearUploadFile
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleResultsContainer);
