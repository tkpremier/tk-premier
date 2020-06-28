import { combineReducers } from 'redux';
import currentHeroIndex from './currentHeroIndex';
import elements from './elements';
import modal from './modal';
import selectedElement from './selectedElement';
import makersList from './makerslist';
import loaded from './loaded';
import { editable } from '../HomePage/reducers';

const homePageCMS = combineReducers({
  currentHeroIndex,
  editable,
  elements,
  loaded,
  makersList,
  modal,
  selectedElement
});

export default homePageCMS;
