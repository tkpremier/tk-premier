import { combineReducers } from 'redux'
import alert from './alert'
import formErrors from './formErrors'
import globalState from './globalState'
import editorials from './editorials'

export default combineReducers({
  alert,
  formErrors,
  globalState,
  editorials
});
