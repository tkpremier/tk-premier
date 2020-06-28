import { combineReducers } from 'redux'
import alert from './alert'
import formErrors from './formErrors'
import globalState from './globalState'
import users from './users'

export default combineReducers({
  alert,
  formErrors,
  globalState,
  users
});
