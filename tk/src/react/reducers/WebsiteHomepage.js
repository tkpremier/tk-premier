import { combineReducers } from 'redux';
import elements from './elements';
import currentHeroIndex from './currentHeroIndex';
import loaded from './loaded';

const homePage = combineReducers({
  currentHeroIndex,
  elements,
  loaded
});

export default homePage;
