import React, { Component } from 'react';
import serialize from 'form-serialize';
import classNames from 'classnames';
import { isEmpty } from 'lodash/fp';
import NewsletterService from '../services/NewsletterService';

class DeptEmailSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: '',
      editing: false,
      success: true
    };
  }
  render() {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = serialize(e.target, { hash: true });
      if (this.state.editing) {
        return false;
      }
      this.setState({
        editing: true
      });
      NewsletterService.saveEmailToNewsletter(formData)
        .then(() => {
          this.setState({
            responseMsg: 'Thank you for signing up.',
            editing: false,
            success: true
          });
        })
        .catch((resp) => {
          console.error('error ', resp);
          this.setState({
            responseMsg: resp.message,
            editing: false,
            success: false
          });
        });
    };
    const emailInputClass = classNames({ pending: this.state.editing});
    return (
      <div className="col-xs-12 col-sm-6 email-list">
        <div className="form-wrapper">
          <h2>{`Join the ${this.props.departmentName} Email List.`}</h2>
          <p>Sign up to receive emails about upcoming auctions, exhibitions and special events at Phillips.</p>
          <form onSubmit={handleSubmit}>
            {!isEmpty(this.state.responseMsg) ?
              <p className={classNames({ 'error': !this.state.success })}>{this.state.responseMsg}</p> :
              null
            }
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
              className={emailInputClass}
            />
            <input
              type="hidden"
              name="departmentId"
              value={this.props.departmentId}
            />
            <input type="submit" value={this.state.editing ? 'Signing up...' : 'Sign Up'} />
          </form>
        </div>
      </div>
    );
  }
}


export default DeptEmailSignup;
