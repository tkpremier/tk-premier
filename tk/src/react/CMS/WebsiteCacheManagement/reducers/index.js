import { combineReducers } from 'redux'
import alert from './alert' 
import cacheEndpoints from './cache-endpoints'
import globalState from './globalState'
import selectedCacheEndpoint from './selected-endpoint'

export default combineReducers({  
  alert,
  cacheEndpoints,
  globalState,
  selectedCacheEndpoint
})
