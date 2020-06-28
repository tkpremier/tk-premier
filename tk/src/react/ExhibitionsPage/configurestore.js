import {
  createStore, compose, combineReducers, applyMiddleware
} from 'redux';
import { connectRoutes } from 'redux-first-router';
import thunkMiddleware from 'redux-thunk';
import queryString from 'query-string';

/**
   * @function configureStoreWithRouter
   * @param {Object} reducers - reducers to pass to combineReducers
   * @param {Object} preloadedState - initial state object
   * @param {Object} routesMap - registered routes object to be used in connectRoutes
   * @param {Object} [options] - router options to pass through connectRoutes
   */
export const configureStoreWithRouter = (reducers, preloadedState, routesMap, options = {}, enableDevTools = false) => {
  const { reducer, middleware, enhancer } = connectRoutes(routesMap,
    { ...options, querySerializer: queryString });
  const middlewares = applyMiddleware(middleware, thunkMiddleware);
  const composeEnhancers = compose;
  const enhancers = composeEnhancers(enhancer, middlewares);
  return createStore(
    combineReducers({
      ...reducers,
      location: reducer
    }),
    preloadedState,
    enhancers
  );
};

export function configureStore(reducers, preloadedState) {
  const enhancer = applyMiddleware(thunkMiddleware);
  return createStore(
    combineReducers({
      ...reducers
    }),
    preloadedState,
    enhancer
  );
}
