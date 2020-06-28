import React, { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames';
import serialize from 'form-serialize';
import PropTypes from 'prop-types';
import PhillipsCheckbox from '../../PhillipsCheckbox/PhillipsCheckbox';

const LoginForm = (props) => {
  const { userForm } = props;
  const [rememberMe, setRemember] = useState(false);
  const [active, setActive] = useState('login');
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.onSubmit({
      ...serialize(e.target, true),
      rememberMe
    });
  };
  const handleChange = () => setRemember(!rememberMe);
  const handleForgotPassword = (e) => {
    e.preventDefault();
    props.onResetPassword(serialize(e.target));
  };
  return active === 'login'
    ? (
      <div className="user-form user-form--login">
        {userForm.status === 'pending'
          ? <div className="user-form__loading" />
          : (
            <Fragment>
              <h2 className="user-form__title">{props.formTitle}</h2>
              <form className="user-form__form user-form__form--login" onSubmit={handleSubmit}>
                {userForm.status === 'error' && userForm.type === 'login'
                  ? (
                    <p className="user-form__message user-form__message--red">
                      {userForm.message}
                    </p>
                  )
                  : null
                }
                <input
                  className="form-control"
                  type="email"
                  name="Username"
                  id="Username"
                  placeholder="Email"
                  required
                  autoComplete="email"
                />
                <input
                  className="form-control"
                  type="password"
                  name="Password"
                  id="Password"
                  placeholder="Password"
                  required
                />
                <input
                  type="hidden"
                  name="grant_type"
                  value="password"
                />
                <div className="user-form__input-wrapper">
                  <PhillipsCheckbox
                    id="RememberMe"
                    label="Remember Me"
                    onChange={handleChange}
                    isChecked={rememberMe}
                  />
                  <span className="user-form__message user-form__message--consent">
                    Forgot your&nbsp;
                    <button type="button" onClick={() => setActive('forgot-pw')} className="user-form--underline">
                      password
                    </button>
                    ?
                  </span>
                </div>

                <input
                  className="button btn btn-default"
                  type="submit"
                  value="Login"
                />
                <p className="user-form__message user-form__message--consent">
                  Don&apos;t have an account yet?
                  <br />
                  {props.toggleForm
                    ? (
                      <button
                        onClick={props.onToggle}
                        className="user-form__open-register user-form--underline"
                        type="button"
                        value="signup"
                      >
                        Create Account
                      </button>
                    )
                    : (
                      <a
                        className="user-form__open-register user-form--underline"
                        href="/signup"
                        title="Create Account"
                      >
                        Create Account
                      </a>
                    )
                  }
                </p>
              </form>
            </Fragment>
          )
        }
      </div>
    )
    : (
      <div className="user-form user-form--forgot-pw">
        <h2 className="user-form__title">Reset Password</h2>
        {userForm.type === 'forgot-pw'
          ? userForm.status === 'pending'
            ? <div className="user-form__loading" />
            : (
              <p
                className={classNames('user-form__message user-form__message--align-center', {
                  'user-form__message--red': userForm.status === 'error'
                })}
              >
                {userForm.message}
              </p>
            )
          : null
        }
        {userForm.status !== 'pending'
          ? (
            <form className="user-form__form user-form__form--forgot-pw" onSubmit={handleForgotPassword}>
              <label
                className="user-form__label user-form__label--pw-hint"
                htmlFor="Email"
              >
                Enter your email address and we’ll send you a new link to reset your password.
                  </label>
              <input
                className="form-control"
                type="email"
                name="Email"
                id="Email"
                placeholder="Email"
                required
                autoComplete="email"
              />
              <input
                className="button btn btn-default"
                type="submit"
                value="Send"
              />
              <button
                className="user-form--underline"
                type="button"
                onClick={() => setActive('login')}
              >
                Cancel
              </button>
            </form>
          )
          : null}
      </div>
    );
};

LoginForm.defaultProps = {
  onToggle() {
    return false;
  },
  userForm: {
    status: '',
    message: '',
    type: ''
  },
  formTitle: 'Login',
  toggleForm: false
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onResetPassword: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  userForm: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string
  }),
  formTitle: PropTypes.string,
  toggleForm: PropTypes.bool
};

export default LoginForm;
