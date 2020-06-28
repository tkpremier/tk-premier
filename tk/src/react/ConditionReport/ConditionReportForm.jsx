import React from 'react';
import PropTypes from 'prop-types';

const ConditionReportForm = (props) => {
  return (
    <div className="condition-form-container">
      {props.requestError !== null ?
        (
          <div className="condition-request-error">
            <p className="error-message">There was an error handling your request.</p>
          </div>
        ) :
        null
      }
      {props.requestSucceeded ?
        (
          <div className="condition-request-success">
            <h2>Thank you for your request.</h2>
            <h3>A specialist will be in contact with you shortly.</h3>
          </div>
        ) :
        (
          <form id="condition-form" className="condition-report-form" onSubmit={props.onSubmit}>
            <div id="status-info" />
            <div>
              <h2>Contact Us</h2>
              <p className="required">* Required</p>
              <input
                type="hidden"
                className="hidden"
                value={props.lotNumberFull}
                name="lotNumber"
              />
              <input
                type="hidden"
                className="hidden"
                value={props.saleNumber}
                name="saleNumber"
              />
              <input
                type="hidden"
                className="hidden"
                value={props.makerName}
                name="maker"
              />
              <input
                type="hidden"
                className="hidden"
                value={props.conditionRequestEmail}
                name="emailTo"
              />
              <input
                type="hidden"
                className="hidden"
                value={17}
                name="activityTypeID"
              />
              <input
                type="text"
                defaultValue={props.user.firstName}
                id="first_name"
                name="firstName"
                placeholder="First Name*"
                alt="First Name"
                required
              />
              <input
                type="text"
                defaultValue={props.user.lastName}
                id="last_name"
                name="lastName"
                placeholder="Last Name*"
                alt="Last Name"
                required
              />
              <input
                type="email"
                defaultValue={props.user.email}
                id="email"
                className="option-input"
                name="email"
                placeholder="Email*"
                alt="E-Mail"
                required
              />
              <textarea
                placeholder="Have a question or need assistance? Enter the details here, and we'll get back to you shortly."
                id="specialistMessage"
                name="specialistMessage"
              />
              <div className="form-controls">
                <button className="submit" type="submit">Contact Specialist</button>
              </div>
            </div>
          </form>
        )
      }
    </div>
  );
};


ConditionReportForm.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    email: ''
  }
};

ConditionReportForm.propTypes = {
  user: PropTypes.objectOf({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired
};

export default ConditionReportForm;
