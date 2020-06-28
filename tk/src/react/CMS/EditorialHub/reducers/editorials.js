import { lensPath, lensProp, compose, view, set, over } from 'ramda';

import * as types from '../actions/action-types';
import { editorials as initialState } from '../initial-state';

export default function editorials(state = initialState, action) {
  switch (action.type) {
    case types.EDIT_COMPONENT: {
      console.log('EDIT_COMPONENT Reducer: ', action, state);
      const selectedEditorialLens = lensPath([
        ['componentData'],
        action.componentIndex,
        action.editedField
      ]);
      const componentDataLens = lensPath([
        ['editorials'],
        action.editorialIndex,
        ['componentData'],
        action.componentIndex,
        action.editedField
      ]);

      console.log('selectedEditorialLens: ', set(selectedEditorialLens, action.edit, state.selectedEditorial));
      console.log('componentDataLens', set(componentDataLens, action.edit, state));

      return {
        ...state,
        ...set(componentDataLens, action.edit, state),
        editorialEdited: true,
        selectedEditorial: {
          ...state.selectedEditorial,
          ...set(selectedEditorialLens, action.edit, state.selectedEditorial)
        }
      }
    }

    case types.GET_EDITORIALS_SUBMIT:
      return {
        ...state,
        errors: {}
      };

    case types.GET_EDITORIALS_SUCCESS:
      return {
        ...state,
        editorials: action.payload.json
      };

    case types.GET_EDITORIALS_ERROR:
      return {
        ...state
      };

    case types.UPDATE_EDITORIAL_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      };

    case types.UPDATE_EDITORIAL_SUCCESS:
      return {
        ...state,
        progressIndicator: false
      };

    case types.UPDATE_EDITORIAL_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.UPDATE_EDITORIAL_ARTICLES_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      };

    case types.UPDATE_EDITORIAL_ARTICLES_SUCCESS:
      return {
        ...state,
        progressIndicator: false
      };

    case types.UPDATE_EDITORIAL_ARTICLES_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.DELETE_EDITORIAL_ARTICLE_SUBMIT:
      return {
        ...state,
        progressIndicator: true,
        errors: {}
      };

    case types.DELETE_EDITORIAL_ARTICLE_SUCCESS:
      return {
        ...state,
        progressIndicator: false
      };

    case types.DELETE_EDITORIAL_ARTICLE_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.UPLOAD_EDITORIAL_IMAGE_SUBMIT:
      return {
        ...state,
        errors: {},
        progressIndicator: true
      };

    case types.UPLOAD_EDITORIAL_IMAGE_SUCCESS:
      return {
        ...state,
        progressIndicator: false,
        selectedComponent: {
          ...action.payload.selectedComponent,
          imageUrl: action.payload.json.imagePath
        }
      };

    case types.UPLOAD_EDITORIAL_IMAGE_ERROR:
      return {
        ...state,
        progressIndicator: false
      };

    case types.EDITORIAL_UPLOAD_IMAGE_SET:
      return {
        ...state,
        [action.imageLabel]: action.uploadImage
      };

    case types.EDITORIAL_UPLOAD_IMAGE_CLEAR:
      return {
        ...state,
        [action.imageLabel]: { preview: '' }
      };

    case types.EDIT_EDITORIAL:
      return {
        ...state,
        editorialEdited: true,
        selectedEditorial: {
          ...action.editorial,
          [action.editedField]: action.edit
        }
      };

    // case types.EDIT_COMPONENT:
    //   return {
    //     ...state,
    //     editorialEdited: true,
    //     selectedComponent: {
    //       ...action.component,
    //       [action.editedField]: action.edit
    //     }
    //   };

    case types.SET_SELECTED_EDITORIAL:
      return {
        ...state,
        selectedEditorial: {
          ...initialState.selectedEditorial,
          ...action.editorial
        }
      };

    case types.CLEAR_SELECTED_EDITORIAL:
      return {
        ...state,
        selectedEditorial: {
          ...initialState.selectedEditorial
        }
      };

    case types.SET_SELECTED_COMPONENT:
      return {
        ...state,
        selectedComponent: {
          ...initialState.selectedComponent,
          ...action.component
        }
      };

    case types.CLEAR_SELECTED_COMPONENT:
      return {
        ...state,
        selectedComponent: {
          ...initialState.selectedComponent
        }
      };

    case types.SET_NEW_EDITORIAL_TYPE:
      return {
        ...state,
        newEditorialType: action.editorialType
      };

    case types.EDIT_EDITORIAL_LIST:
      return {
        ...state,
        editorials: action.editorialList
      };

    case types.EDIT_EDITORIAL_COMPONENT_LIST:
      return {
        ...state,
        editorialEdited: true,
        selectedEditorial: {
          ...action.selectedEditorial,
          componentData: action.componentList
        }
      };

    default:
      return state;

  }
}
