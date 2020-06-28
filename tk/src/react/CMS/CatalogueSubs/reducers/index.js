import { combineReducers } from 'redux'
import alert from './alert'
import formErrors from './formErrors'
import globalState from './globalState'
import catalogueSubscriptions from './catalogue-subscriptions'

export default combineReducers({
  alert,
  formErrors,
  globalState,
  catalogueSubscriptions
})
