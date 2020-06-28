import { combineReducers } from 'redux'
import alert from './alert'
import formErrors from './formErrors'
import globalState from './globalState'
import pressReleases from './press-releases'

export default combineReducers({
  alert,
  formErrors,
  globalState,
  pressReleases
});
