import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorialsActions from '../../actions/editorials';
import * as sharedActions from '../../../Shared/actions/shared-actions';
import FeaturedLeft from '../../components/EditorialTypes/FeaturedLeft';

const FeaturedLeftContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <FeaturedLeft

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
      editorials: state.editorials
    }
  };
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...editorialsActions, ...sharedActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedLeftContainer);
