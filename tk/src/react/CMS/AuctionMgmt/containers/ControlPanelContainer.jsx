import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auctionsActions from '../actions/auctions';
import * as auctionActions from '../actions/auction';
import * as updateAuctionActions from '../actions/update-auction';
import * as updateLotActions from '../actions/update-lot';
import * as uploadImageActions from '../actions/upload-image';
import * as cloudinaryUploadActions from '../actions/cloudinary-upload';
import * as migratePreviewToStaging from '../actions/migrate-preview-to-staging';
import * as auctionMobilityActions from '../actions/auction-mobility';
import ControlPanel from '../components/ControlPanel';

const ControlPanelContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <ControlPanel
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
      ...state
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...auctionActions,
      ...auctionMobilityActions,
      ...auctionsActions,
      ...cloudinaryUploadActions,
      ...migratePreviewToStaging,
      ...updateAuctionActions,
      ...updateLotActions,
      ...uploadImageActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanelContainer);
