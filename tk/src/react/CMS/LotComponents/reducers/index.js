import { combineReducers } from 'redux'
import alert from './alert'
import formErrors from './formErrors'
import globalState from './globalState'
import lotComponents from './lot-components'

export default combineReducers({
  alert,
  formErrors,
  globalState,
  lotComponents
});
