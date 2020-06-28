import { combineReducers } from 'redux'
import alert from './alert'
import formErrors from './formErrors'
import globalState from './globalState'
import makerBios from './maker-bios'

export default combineReducers({
  alert,
  formErrors,
  globalState,
  makerBios
});
