import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lotComponentsActions from '../../actions/lot-components';
import * as sharedActions from '../../../Shared/actions/shared-actions';
import CarouselComponent from '../../components/LotComponentTypes/Carousel';

const CarouselContainer = (props) => {
  try {
    const { state, actions } = props;
    return (
      <CarouselComponent

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
      ...state.appInit,
      baseUrl: state.globalState.baseUrl,
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

export default connect(mapStateToProps, mapDispatchToProps)(CarouselContainer);
