/* eslint-disable import/prefer-default-export */
import 'fetch-ponyfill';
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import handleResponse from '../utils/handleResponse';
import sendAnalytics from '../../utils/sendAnalytics';

export class NewsletterSignup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitPending: false,
      submitSuccess: false,
      email: '',
      errorMsg: ''
    };
    this.handleFormCopy = this.handleFormCopy.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openRegister = this.openRegister.bind(this);
  }

  handleFormCopy() {
    return this.state.errorMsg.length === 0 ? (
      this.state.submitPending ? (
        <p>Signing up...</p>
      ) : (
        <p>
          Subscribe to our newsletter and receive exclusive content about our auctions, exhibitions, and special events.
        </p>
      )
    ) : (
      <p>{this.state.errorMsg}</p>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { pageType, propToSendAnalytics } = this.props;
    const data = serialize(e.target, { hash: true });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    this.setState({
      submitPending: true
    });
    fetch('/SaveEmailSignup', options)
      .then(handleResponse)
      .then(response => {
        if (response.Result === 'Failure') {
          return this.setState({
            submitPending: false,
            submitSuccess: false,
            email: '',
            errorMsg: response.Message
          });
        }
        sendAnalytics({
          eventCategory: `newsletter subscribe ${pageType}`,
          eventAction: 'newsletter subscribe',
          eventLabel: `Email ${data.email}, ${propToSendAnalytics}: ${this.props[propToSendAnalytics]}`
        });
        return this.setState({
          submitPending: false,
          submitSuccess: true,
          email: data.email,
          errorMsg: ''
        });
      });
  }

  openRegister() {
    const { email } = this.state;
  }

  render() {
    return this.state.submitSuccess ? (
      <Fragment>
        <h3>Thank you.</h3>
        <p>
          Welcome, you will now receive an email from Phillips. Create an account to get more out of your Phillips
          experience
        </p>
        <button onClick={this.openRegister} type="button">
          Create Account
        </button>
      </Fragment>
    ) : (
      <form onSubmit={this.handleSubmit}>
        <h3>Newsletter</h3>
        {this.handleFormCopy()}
        {!this.state.submitPending ? (
          <Fragment>
            <input autoComplete="email" name="email" placeholder="Enter Your Email" type="email" required />
            <input type="submit" placeholder="Sign Up" value="Submit" />
          </Fragment>
        ) : null}
      </form>
    );
  }
}

NewsletterSignup.defaultProps = {
  saleNumber: '',
  editorialTitle: ''
};

NewsletterSignup.propTypes = {
  pageType: PropTypes.string.isRequired,
  propToSendAnalytics: PropTypes.string.isRequired,
  saleNumber: PropTypes.string,
  editorialTitle: PropTypes.string
};
