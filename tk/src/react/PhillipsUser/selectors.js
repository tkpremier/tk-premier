import { createSelector } from 'reselect';
import { isNull, isEmpty } from 'lodash/fp';

export const userSelector = ({ user }) => user;

export const userStateSelector = createSelector(
  [userSelector],
  user => ({
    loggedIn: isNull(user) ? false : !isEmpty(user.id),
    email: isNull(user) ? '': user.email
  })
);
