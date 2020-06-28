import { combineReducers } from 'redux'
import alert from './alert'
import formErrors from './formErrors'
import globalState from './globalState'
import teamPage from './team-page'

export default combineReducers({
  alert,
  formErrors,
  globalState,
  teamPage
});
