import React, { useState, Fragment, useRef } from 'react';
import classNames from 'classnames';
import find from 'lodash/fp/find';
import serialize from 'form-serialize';
import PropTypes from 'prop-types';
import PhillipsCheckbox from '../../PhillipsCheckbox/PhillipsCheckbox';
import { validateEmail, validateLength, validateConfirmPassword, validatePassword } from '../../../utils/validate';

const getUtmData = () => sessionStorage ? JSON.parse(sessionStorage.getItem('utmData')) : '';

const inputValidStates = [
  {
    'name': 'FirstName',
    'valid': true,
    'validate': validateLength
  },
  {
    'name': 'LastName',
    'valid': true,
    'validate': validateLength
  },
  {
    'name': 'Email',
    'valid': true,
    'validate': validateEmail
  },
  {
    'name': 'confirmPassword',
    'valid': true,
    'validate': validateConfirmPassword
  }
]

const getErrorMsg = (type = 'required', name = '') => {
  const msg = {
    'email': 'You must enter a valid email',
    'required': `${name} is required.`,
    'confirm': 'Your passwords did not match. Please try again.'
  };
  return msg[type];
};

const SignUpForm = (props) => {
  const [formData, setFormdata] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email
  });
  const passwordEl = useRef(null);
  const [sendNewsLetter, setSendNews] = useState(false);
  const [validInputs, validateInput] = useState(inputValidStates.map(({ name }) => name));
  const { onSubmit, userForm } = props;
  const handleBlur = (e) => {
    const input = find(inputEl => inputEl.name === e.target.name)(inputValidStates);
    const inputIndex = validInputs.indexOf(e.target.name);
    const wasValid = inputIndex > -1;
    const value = e.target.name === 'confirmPassword'
      ? { password: passwordEl.current.value, confirmPassword: e.target.value }
      : e.target.value;
    const isValid = input.validate(value);
    if (isValid !== wasValid) {
      if (isValid) {
        validInputs.push(input.name);
      } else {
        validInputs.splice(inputIndex, 1);
      }
      return validateInput([...validInputs]);
    }
    return false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = serialize(e.target, { hash: true });
    onSubmit({
      ...data,
      sendNewsLetter,
      utmData: getUtmData()
    });
    // reset valid inputs to all
    validateInput(inputValidStates.map(({ name }) => name));
    setFormdata({
      firstName: data.FirstName,
      lastName: data.LastName,
      email: data.Email
    });
  };
  const handleChange = () => setSendNews(!sendNewsLetter);
  return (
    <div className={`user-form user-form--signup ${props.classNames}`}>
      {userForm.status !== 'success'
        ? userForm.status === 'pending'
          ? (
            <div className="user-form__loading" />
          )
          : (
            <Fragment>
              <h2 className="user-form__title">{props.formTitle}</h2>
              <form className="user-form__form user-form__form--register" onSubmit={handleSubmit}>
                {validInputs.indexOf('FirstName') > -1
                  ? null
                  : (
                    <label
                      className="error-message"
                      htmlFor="FirstName"
                    >
                      {getErrorMsg('required', 'First name')}
                    </label>
                  )
                }
                <input
                  id="FirstName"
                  type="text"
                  name="FirstName"
                  className="form-control"
                  placeholder="First Name"
                  required
                  autoComplete="given-name"
                  onBlur={handleBlur}
                  defaultValue={formData.firstName}
                />
                {validInputs.indexOf('LastName') > -1 ? null :
                  <label className="error-message" htmlFor="LastName">{getErrorMsg('required', 'Last name')}</label>
                }
                <input
                  id="LastName"
                  type="text"
                  name="LastName"
                  className="form-control"
                  autoComplete="family-name"
                  onBlur={handleBlur}
                  placeholder="Last Name"
                  required
                  defaultValue={formData.lastName}
                />
                {validInputs.indexOf('Email') > -1 ? null :
                  <label className="error-message" htmlFor="Email">{getErrorMsg('email')}</label>
                }
                <input
                  autoComplete="email"
                  className="form-control"
                  defaultValue={formData.email}
                  id="Email"
                  name="Email"
                  onBlur={handleBlur}
                  placeholder="Email"
                  required
                  type="email"
                />
                <label className="user-form__label user-form__label--pw-hint" htmlFor="Password">
                  Password must be at least 8 characters and contain one uppercase letter, one lowercase letter and a number.
              </label>
                {validInputs.indexOf('Password') > -1 ? null :
                  <label className="error-message" htmlFor="Password">{getErrorMsg('password')}</label>
                }
                <input
                  className="form-control"
                  id="Password"
                  name="Password"
                  placeholder="Password"
                  required
                  ref={passwordEl}
                  type="password"
                />
                {validInputs.indexOf('confirmPassword') > -1
                  ? null
                  : (
                    <label
                      className="error-message"
                      htmlFor="confirmPassword"
                    >
                      {getErrorMsg('confirm')}
                    </label>
                  )
                }
                <input
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
                <PhillipsCheckbox
                  id="sendNewsLetter"
                  label=" Would you like to receive emails from Phillips about our upcoming auctions, exhibitions and special events?"
                  onChange={handleChange}
                  isChecked={sendNewsLetter}
                />
                {userForm.status === 'error'
                  ? (
                    <p className={classNames('user-form__message', {
                      'user-form__message--consent': true,
                      'user-form__message--red': true
                    })}
                    >
                      {userForm.message}
                    </p>
                  )
                  : null
                }
                <input type="submit" className="button btn btn-default" name="Submit" value="Sign Up" />
                <p className="user-form__message user-form__message--consent">
                  By creating a&nbsp;
                <b>Phillips</b>
                &nbsp;account you agree&nbsp;
                <br />
                &nbsp;to our&nbsp;
                <a
                    className="user-form__link"
                    href="/buysell/buy"
                    target="_blank"
                  >
                    Terms of Use
                </a>
                &nbsp;and&nbsp;
                <a
                    className="user-form__link"
                    href="/about/privacy"
                    target="_blank"
                  >
                    Privacy Policy
                </a>
                .
              </p>
                <p className="user-form__message user-form__message--consent ">
                  Already created an account?&nbsp;&nbsp;
                {props.toggleForm
                    ? (
                      <button
                        className="user-form__open-login user-form--underline"
                        type="button"
                        value="login"
                        onClick={props.onToggle}
                      >
                        Log in
                      </button>
                    )
                    : (
                      <a className="user-form__open-login user-form--underline" href="/login" title="Log in">Log in</a>
                    )
                  }
                </p>
              </form>
            </Fragment>
          )
        : <p className="user-form__message user-form__message--align-center">{userForm.message}</p>
      }
    </div>
  );
};

SignUpForm.defaultProps = {
  classNames: '',
  email: '',
  firstName: '',
  lastName: '',
  onToggle() {
    return false;
  },
  userForm: {
    status: '',
    message: '',
    type: ''
  },
  formTitle: 'Create an account',
  toggleForm: false
}

SignUpForm.propTypes = {
  classNames: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  userForm: PropTypes.shape({ status: PropTypes.string, message: PropTypes.string, type: PropTypes.string }),
  formTitle: PropTypes.string,
  toggleForm: PropTypes.bool
}

export default SignUpForm;