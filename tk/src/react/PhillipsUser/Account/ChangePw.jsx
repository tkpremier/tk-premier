import React from 'react';
import serialize from 'form-serialize';

const ChangePw = ({ formState, handleCancel, handleSubmit, user }) => {
  const { payload, status } = formState;
  const prepareSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      ...serialize(e.target, { hash: true })
    }, e.target.dataset.formName);
  };
  const responseMsg = (status === 'success' || status === 'error')
    ? payload.message
    : '';
  return (
    <form
      className="col-xs-12 col-sm-6 col-md-4"
      data-form-name="change-pw"
      id="change-pw-form"
      onSubmit={prepareSubmit}
    >
      <fieldset form="change-pw-form">
        <legend className="text-right">(*) Required</legend>
        {responseMsg.length > 0 && (payload.formName === 'change-pw')
          ? (
            <p className={`response-msg ${formState.status}`}>
              {responseMsg}
            </p>
          ) : null
        }
        <input
          alt="Current Password"
          className="required"
          type="password"
          id="current-password"
          name="password"
          placeholder="Current Password*"
          data-val-required="Please enter your current Password"
        />
        <legend>
          Password must be at least 8 characters and contain one uppercase letter, one lowercase letter and a number
        </legend>
        <input
          alt="New Password"
          className="required"
          type="password"
          id="new-password"
          name="newPassword"
          placeholder="New Password*"
          data-regex="Password does not meet above requirements."
          data-val-required="The New Password field is required."
        />
        <input
          alt="Confirm New Password"
          className="required last"
          data-match="The password and confirmation password do not match."
          data-val-required="The Confirm Password field is required."
          id="confirm-new-password"
          name="confirmPassword"
          placeholder="Confirm New Password*"
          type="password"
        />
        <div className="form-controls">
          <input
            className="button "
            name="submit-new-password"
            type="submit"
            value="Save"
          />
          <span className="cancel-edit">
            &nbsp;or&nbsp;
            <button
              className="button--toggle button--inline-block"
              data-id="change-pw"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
          </span>
        </div>
      </fieldset>
      {(status === 'pending' && payload.formName === 'change-pw')
        ? <div id="loadingGif" />
        : null
      }
    </form>
  );
};

export default ChangePw;
