import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import SignUpForm from './SignUpForm';
import { loginUser, createUser, resetPassword } from '../actions';

const UserForm = () => {
  const [activeForm, toggleActive] = useState('signup');
  const { user, userForm } = useSelector(state => state);
  const dispatch = useDispatch();
  const handleToggle = e => toggleActive(e.target.value);
  const handleSubmitSignup = payload => dispatch(createUser(payload, true));
  const handleSubmitLogin = payload => dispatch(loginUser(payload));
  const handleResetPassword = payload => dispatch(resetPassword(payload));
  return (
    <div className=" container content-area phillips__user__paywall">
      {activeForm === 'signup'
        ? (
          <SignUpForm
            {...user}
            onSubmit={handleSubmitSignup}
            onToggle={handleToggle}
            formTitle="Please log in or create an account to view our Private Sales property"
            toggleForm
            userForm={userForm}
          />
        )
        : activeForm === 'login'
          ? (
            <Login
              {...user}
              onResetPassword={handleResetPassword}
              onSubmit={handleSubmitLogin}
              onToggle={handleToggle}
              formTitle="Please log in or create an account to view our Private Sales property"
              toggleForm
              userForm={userForm}
            />
          )
          : null
      }
    </div>
  );
};

export default UserForm;
