import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isNull from 'lodash/fp/isNull';
import ProfileForm from './ProfileForm';
import ChangePw from './ChangePw';
import getPhillipsBackboneProperty from '../../utils/getPhillipsBackboneProperty';
import { clearFormStatus } from './uiActions';
import { editUser, loggedIn } from '../actions';
import bindUserModel from '../bindUserModel';

function formatPhone(text) {
  if (text && text.length <= 10) {
    return text.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  return text;
}

const AccountDetails = () => {
  const { user, formState } = useSelector(state => state);
  const { status, payload } = formState;
  const [showForms, toggleForm] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getPhillipsBackboneProperty('user').then((userModel) => {
      bindUserModel(userModel, dispatch);
      if (user.id.length === 0 && userModel.loggedIn) {
        dispatch(loggedIn(userModel.toJSON()));
      }
    });
  }, []);

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        showForms.splice(showForms.indexOf(payload.formName), 1);
        // toggleForm([...showForms]);
        dispatch(clearFormStatus(payload.formName));
      }, 5000);
    }

  }, [status, payload, showForms, dispatch, toggleForm]);

  const handleSubmit = (data, formName) => {
    dispatch(editUser({ ...user, ...data }, user.id, formName));
  };

  const handleClick = (e) => {
    if (showForms.indexOf(e.target.dataset.id) > -1) {
      showForms.splice(showForms.indexOf(e.target.dataset.id), 1);
    } else {
      showForms.push(e.target.dataset.id);
    }
    return toggleForm([...showForms]);
  };
  return (
    <Fragment>
      <div className="col-xs-12 col-sm-6 col-md-4">
        <h3>Account Details</h3>
        <p className="value">
          {user.title.length > 0 ? `${user.title}. ` : null}
          {`${user.firstName} ${user.lastName}`}
        </p>
        <p className="value">{user.email}</p>
        <p className="value">{formatPhone(user.phoneNumber)}</p>
        <button
          className="button--toggle"
          data-id="edit-profile"
          id="edit-profile"
          onClick={handleClick}
          type="button"
        >
          Edit Profile
        </button>
        <button
          className="button--toggle"
          id="change-pw"
          data-id="change-pw"
          onClick={handleClick}
          type="button"
        >
          Change Password
        </button>
        <ProfileForm
          formState={formState}
          handleCancel={handleClick}
          handleSubmit={handleSubmit}
          showForms={showForms}
          user={user}
        />
        {status === 'pending' && (!isNull(payload) && payload.formName === 'edit-profile')
          ? <div id="loadingGif" />
          : null
        }
      </div>
      {showForms.indexOf('change-pw') > -1
        ? (
          <ChangePw
            formState={formState}
            handleCancel={handleClick}
            handleSubmit={handleSubmit}
            user={user}
          />
        )
        : null
      }
    </Fragment>
  );
};

export default AccountDetails;
