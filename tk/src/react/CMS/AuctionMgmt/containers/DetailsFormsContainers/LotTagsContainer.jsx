import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as updateTagActions from '../../actions/update-tags';
import * as tagActions from '../../actions/tags';
import { editLotTagList } from '../../actions/lot';
import LotTags from '../../components/DetailsForms/LotTags';

const LotTagsContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <LotTags
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
      ...tagActions,
      ...updateTagActions,
      editLotTagList
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LotTagsContainer);
