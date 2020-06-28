import createSagaMiddleware from 'redux-saga';
import {
  createStore,
  applyMiddleware
} from 'redux';

// import * as C from './constants'
import * as types from './actions/action-types';
import * as appInitialState from './initial-state';
import rootSaga from './sagas';
import rootReducer from './reducers';
import {
  logger
} from '../Shared/middlewares';

/* ----- Create store  ----- */
export default function makeStore(state) {
  const initialState = { ...appInitialState, ...state };
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    logger
  ];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  try {
    store.dispatch({
      type: types.APP_INIT
    });
  } catch (error) {
    console.log('Error during app init!');
  }

  return store;
}
