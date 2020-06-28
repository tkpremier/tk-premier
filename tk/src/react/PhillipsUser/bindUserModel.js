import { bindActionCreators } from 'redux';
import * as actions from './actions';

export default function (userModel, dispatch, reduxUser) {
  const boundActions = bindActionCreators(actions, dispatch);
  // considering making smarter as it is creating an extra re-render
  userModel.on('loggedIn', (model) => boundActions.loggedIn(model.toJSON()));
  userModel.on('logout', (model) => boundActions.logout(model.toJSON()));
}
