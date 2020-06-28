import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lotComponentsActions from '../../actions/lot-components';
import * as sharedActions from '../../../Shared/actions/shared-actions';
import VideoComponent from '../../components/LotComponentTypes/Video';

const VideoContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <VideoComponent

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
      ...state.appInit,
      lotComponents: state.lotComponents
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...lotComponentsActions, ...sharedActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
