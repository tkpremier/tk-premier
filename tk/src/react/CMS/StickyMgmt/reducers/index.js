import { combineReducers } from 'redux'
import alert from './alert' 
import deleteStickyDialog from './delete-sticky-dialog'
import formErrors from './formErrors'
import globalState from './globalState'
import selectedSticky from './selected-sticky'
import stickies from './stickies'
import stickyImage from './sticky-image'
import stickyReorder from './sticky-reorder'

export default combineReducers({  
  alert,
  deleteStickyDialog,
  formErrors,
  globalState,
  selectedSticky,
  stickies,
  stickyImage,
  stickyReorder
})
