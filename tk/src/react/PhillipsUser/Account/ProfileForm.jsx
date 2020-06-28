import React, { useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import TelDropDown from '../../PhillipsIntlTelInput/TelDropDown';
import { sanitizeNumber } from '../../../utils/sanitizestring';
import { user as userPropTypes } from '../../PropTypes/proptypes';


const titleOptions = ['Mr', 'Mrs', 'Ms', 'Dr'];
const ProfileForm = ({
  formState,
  handleCancel,
  handleSubmit,
  showForms,
  user
}) => {
  const { status, payload } = formState;
  const iti = useRef(null);
  const prepareSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      ...serialize(e.target, { hash: true }),
      'phoneNumberLocal': sanitizeNumber(iti.iti.getNumber(intlTelInputUtils.numberFormat.NATIONAL)),
      'phoneCountryCode': iti.iti.getSelectedCountryData().iso2
    }, e.target.dataset.formName);
  };
  return (
    <Fragment>
      {((status === 'success' || status === 'error') && (payload.formName === 'edit-profile'))
        ? (
          <p className={`response-msg ${formState.status}`}>
            {formState.payload.message}
          </p>
        ) : null
      }
      {showForms.indexOf('edit-profile') > -1
        ? (
          <form
            data-form-name="edit-profile"
            id="edit-profile-form"
            onSubmit={prepareSubmit}
          >
            <fieldset>
              <legend className="text-right">(*) Required</legend>
              <div className="select-wrapper col-xs-12">
                <select name="title" id="title" defaultValue={user.title}>
                  {titleOptions.map(title => (
                    <option value={title}>{title}</option>
                  ))}
                </select>
                <span className="select-arrow" />
              </div>
              <span
                className="field-validation-valid text-danger"
                data-valmsg-for="first-name"
              />
              <input
                className="required"
                id="first-name"
                data-val-required="First Name is required."
                type="text"
                name="firstName"
                placeholder="First Name*"
                alt="First Name"
                defaultValue={user.firstName}
              />
              <span
                className="field-validation-valid text-danger"
                data-valmsg-for="last-name"
              />
              <input
                alt="Last Name"
                className="required"
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Last Name*"
                defaultValue={user.lastName}
                data-val-required="The Last Name field is required."
              />
              <TelDropDown
                ref={iti}
                initialCountry={user.phoneCountryCode}
                initialValue={user.phoneNumberLocal}
              />
              <input
                type="submit"
                name="submit-profile"
                className="button"
                value="Save"
              />
              <span className="cancel-edit">
                &nbsp;or&nbsp;
                <button
                  className="button--toggle button--inline-block"
                  data-id="edit-profile"
                  onClick={handleCancel}
                  type="button"
                >
                  Cancel
                </button>
              </span>
            </fieldset>
          </form>
        ) : null
      }
    </Fragment>
  );
};

ProfileForm.defaultProps = {
  formState: {
    status: '',
    payload: null
  },
  showForms: [],
  user: {
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    phoneCountryCode: null,
    phoneNumber: null,
    phoneNumberLocal: null,
    title: ''
  }
}

ProfileForm.propTypes = {
  formState: PropTypes.shape({
    status: '',
    payload: null
  }),
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  showForms: PropTypes.arrayOf(PropTypes.string),
  user: userPropTypes
};

export default ProfileForm;
