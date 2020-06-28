import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../../actions/auction';
import * as uploadImageActions from '../../actions/upload-image';
import Banners from '../../components/DetailsForms/Banners';

const BannersContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <Banners
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

export default connect(mapStateToProps, mapDispatchToProps)(BannersContainer);
