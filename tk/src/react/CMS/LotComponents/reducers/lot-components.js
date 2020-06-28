import { lensPath, lensProp, compose, view, set, over } from 'ramda';

import * as types from '../actions/action-types';
import { lotComponents as initialState } from '../initial-state';

export default function lotComponents(state = initialState, action) {
  switch (action.type) {
    case types.AUCTIONS_REQUESTED:
      return {
        ...state,
        errors: {}
      };

    case types.AUCTIONS_REQUEST_SUCCESS:
      return {
        ...state,
        auctions: action.payload.json
      };

    case types.AUCTIONS_REQUEST_ERROR:
      return {
        ...state
      };

    case types.AUCTION_LOTS_REQUESTED:
      return {
        ...state,
        errors: {}
      };

    case types.AUCTION_LOTS_REQUEST_SUCCESS:
      return {
        ...state,
        lots: action.payload.json,
        noLots: action.payload.json.length === 0 ? true : false
      };

    case types.AUCTION_LOTS_REQUEST_ERROR:
      return {
        ...state
      };

    case types.EDIT_LOT_COMPONENT: {
      const componentDataLens = lensPath([
        ['lotComponents'],
        action.lotComponentIndex,
        action.editedField
      ]);

      return {
        ...state,
        ...set(componentDataLens, action.edit, state),
        lotComponentEdited: true,
        selectedLotComponent: {
          ...state.selectedLotComponent,
          [action.editedField]: action.edit
        }
      }
    }

    case types.EDIT_LOT_COMPONENTDATA: {
      const selectedLotComponentLens = lensPath([
        ['componentData'],
        action.componentIndex,
        action.editedField
      ]);
      const componentDataLens = lensPath([
        ['lotComponents'],
        action.lotComponentIndex,
        ['componentData'],
        action.componentIndex,
        action.editedField
      ]);

      // console.log(
      //   'EDIT_LOT_COMPONENTDATA: ',
      //   set(componentDataLens, action.edit, state),
      //   set(selectedLotComponentLens, action.edit, state.selectedLotComponent)
      // );

      return {
        ...state,
        ...set(componentDataLens, action.edit, state),
        lotComponentEdited: true,
        selectedLotComponent: {
          ...state.selectedLotComponent,
          ...set(selectedLotComponentLens, action.edit, state.selectedLotComponent)
        },
        selectedLotComponentData: {
          ...state.selectedLotComponentData,
          [action.editedField]: action.edit
        }
      }
    }

    case types.EDIT_LOT_COMPONENTDATA_IMAGE:
      return {
        ...state,
        lotComponentEdited: true,
        selectedLotComponent: {
          ...action.lotComponent,
          [action.editedField]: action.edit
        }
      };

    case types.GET_LOT_COMPONENTS_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.GET_LOT_COMPONENTS_SUCCESS:
      return {
        ...state,
        lotComponents: action.payload.json
      };

    case types.GET_LOT_COMPONENTS_ERROR:
      return {
        ...state
      };

    case types.UPDATE_LOT_COMPONENT_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      };

    case types.UPDATE_LOT_COMPONENT_SUCCESS:
      return {
        ...state,
        progressIndicator: false
      };

    case types.UPDATE_LOT_COMPONENT_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.DELETE_LOT_COMPONENT_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      };

    case types.DELETE_LOT_COMPONENT_SUCCESS:
      return {
        ...state,
        progressIndicator: false
      };

    case types.DELETE_LOT_COMPONENT_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.UPLOAD_LOT_COMPONENT_IMAGE_SUBMIT:
      return {
        ...state,
        errors: {},
        progressIndicator: true
      };

    case types.UPLOAD_LOT_COMPONENT_IMAGE_SUCCESS:
      return {
        ...state,
        progressIndicator: false,
        selectedComponent: {
          ...action.payload.selectedComponent,
          imageUrl: action.payload.json.imagePath
        }
      };

    case types.UPLOAD_LOT_COMPONENT_IMAGE_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.LOT_COMPONENT_UPLOAD_IMAGE_SET:
      return {
        ...state,
        [action.imageLabel]: action.uploadImage
      };

    case types.LOT_COMPONENT_UPLOAD_IMAGE_CLEAR:
      return {
        ...state,
        [action.imageLabel]: { preview: '' }
      };

    case types.SET_SELECTED_LOT_COMPONENT:
      return {
        ...state,
        selectedLotComponent: {
          ...initialState.selectedLotComponent,
          ...action.lotComponent
        }
      };

    case types.SET_SELECTED_LOT_COMPONENT_DATA:
      return {
        ...state,
        selectedLotComponentData: {
          ...initialState.selectedLotComponentData,
          ...action.lotComponentData
        }
      };

    case types.CLEAR_SELECTED_LOT_COMPONENT:
      return {
        ...state,
        selectedLotComponent: {
          ...initialState.selectedLotComponent
        }
      };

    case types.SET_NEW_LOT_COMPONENT_TYPE:
      return {
        ...state,
        newLotComponentType: action.lotComponentType
      };

    case types.EDIT_LOT_COMPONENT_LIST:
      return {
        ...state,
        lotComponents: action.lotComponentList
      };

    case types.EDIT_AUCTIONS_DISPLAY_LIST:
      return {
        ...state,
        displayAuctions: action.auctionsList
      };

    case types.AUCTION_SELECTED:
      return {
        ...state,
        selectedAuction: {
          ...action.selectedAuction,
          auctionSelected: true
        }
      };

    case types.LOT_SELECTED:
      return {
        ...state,
        selectedLot: {
          ...action.selectedLot,
          lotSelected: true
        }
      };

    case types.SET_PREVIOUSLY_SELECTED_COMPONENTID:
      // console.log('SET_PREVIOUSLY_SELECTED_COMPONENTID reducer: ', action);
      return {
        ...state,
        previouslySelectedComponentId: action.selectedLotComponent !== undefined ? action.selectedLotComponent.componentContainerId : 0
      };

    default:
      return state;
  }
}
