import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNull } from 'lodash/fp';

export default class ConditionReportRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactType: 'email'
    };
  }

  render() {
    const changeContactType = changeEvent => {
      this.setState({ contactType: changeEvent.target.value });
    };
    const closeOrCancel = this.props.requestSucceeded ? 'Close' : 'Cancel';
    return (
      <div className="report panel">
        <a
          href="#"
          className={classNames('request-button show-report', { hidden: this.props.requestSucceeded })}
          onClick={this.props.toggleReport}
          rel="nofollow"
        >
          Request Condition Report
        </a>
        <div className={classNames('report-success', { hidden: !this.props.requestSucceeded })}>
          <h2>Thank you</h2>
          <h3>for your request.</h3>
          <br />
          <h4>
            The Condition Report
            <br />
            will be sent shortly.
          </h4>
        </div>
        <div
          className={classNames('cond-report', {
            show: this.props.showReport,
            hidden: !this.props.showReport || this.props.requestSucceeded
          })}
        >
          <form id="condition-form" className="condition-report-form" onSubmit={this.props.onSubmit}>
            <div id="status-info" />
            <div>
              <h2>Contact Us</h2>
              <p className="required">* Required</p>
              <input type="hidden" className="hidden" value={this.props.lotNumberFull} name="lotNumber" />
              <input type="hidden" className="hidden" value={this.props.saleNumber} name="saleNumber" />
              <input type="hidden" className="hidden" value={this.props.makerName} name="maker" />
              <input type="hidden" className="hidden" value={this.props.conditionRequestEmail} name="emailTo" />
              <input type="hidden" className="hidden" value={2} name="activityTypeID" />
              <input
                type="text"
                defaultValue={isNull(this.props.user) ? '' : this.props.user.firstName}
                id="first_name"
                name="firstName"
                placeholder="First Name*"
                alt="First Name"
                required
              />
              <input
                type="text"
                defaultValue={isNull(this.props.user) ? '' : this.props.user.lastName}
                id="last_name"
                name="lastName"
                placeholder="Last Name*"
                alt="Last Name"
                required
              />
              <input
                type="email"
                defaultValue={isNull(this.props.user) ? '' : this.props.user.email}
                id="email"
                className="option-input"
                name="email"
                placeholder="Email*"
                alt="E-Mail"
                required={this.state.contactType === 'email'}
              />
              {this.state.contactType === 'fax' ? (
                <input
                  type="tel"
                  id="fax"
                  className="option-input"
                  name="fax"
                  placeholder="Fax Number*"
                  alt="Fax Number"
                  required={this.state.contactType === 'fax'}
                />
              ) : null}
              <div className="send-switch">
                <p>Send me the Report Via</p>
                <input
                  type="radio"
                  value="email"
                  className="option"
                  id="option_email"
                  name="optionEmailOrFax"
                  checked={this.state.contactType === 'email'}
                  onChange={changeContactType}
                />
                <label htmlFor="option_email">Email</label>
                <input
                  type="radio"
                  value="fax"
                  className="option"
                  id="option_fax"
                  name="optionEmailOrFax"
                  checked={this.state.contactType === 'fax'}
                  onChange={changeContactType}
                />
                <label htmlFor="option_fax">Fax</label>
              </div>
              <div className="form-controls">
                <button className="submit" type="submit">
                  Contact Specialist
                </button>
              </div>
            </div>
          </form>
          <button className="request-cancel" onClick={this.props.toggleReport}>
            {closeOrCancel}
          </button>
        </div>
      </div>
    );
  }
}

ConditionReportRequest.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    email: ''
  }
};

ConditionReportRequest.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  toggleReport: PropTypes.func.isRequired,
  user: PropTypes.objectOf({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  })
};
