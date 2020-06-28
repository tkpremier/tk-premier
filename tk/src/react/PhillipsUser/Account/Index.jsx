import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../../utils/configureStore';
import AccountDetails from './AccountDetails';
import createInitialUserState from '../createInitialUserState';
import * as userReducers from '../reducers';
import * as uiReducers from './uiReducers';

const UserAccount = ({ userJSON }) => {
  const store = configureStore(
    {
      ...userReducers,
      ...uiReducers
    },
    {
      ...createInitialUserState(JSON.parse(userJSON)),
      formState: {
        status: '',
        payload: {
          formName: ''
        }
      }
    }
  );
  return (
    <Provider store={store}>
      <AccountDetails />
    </Provider>
  );
}


// eslint-disable-next-line import/prefer-default-export
export { UserAccount };
