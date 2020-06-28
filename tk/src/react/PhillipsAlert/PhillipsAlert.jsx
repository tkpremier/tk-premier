import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class PhillipsAlert extends Component {
  constructor(props) {
    super(props);
    this.dismissAlert = this.dismissAlert.bind(this);
    this.state = {
      hidden: true
    };
  }

  componentWillMount() {
    if (this.props.dismissable) {
      if (typeof localStorage !== 'undefined') {
        const alertState = localStorage.getItem('bannerDismissed');

        if (alertState === 'true') {
          this.setState({ 'hidden': true });
        } else if (alertState === null || 'false') {
          localStorage.setItem('bannerDismissed', false);
          this.setState({ 'hidden': false });
        }
      }
    }
  }

  dismissAlert() {
    if (this.props.dismissable) {
      localStorage.setItem('bannerDismissed', true);
    }
    this.setState({ 'hidden': true });
  }

  render() {
    return (
      <div>
        {this.state.hidden ? null :
        <div className="phillips-alert">
          <div className="row">
            <div className="col-xs-11">
              <div className="alert-html col-sm-10 col-xs-12">
                {this.props.children}
              </div>
              <div className="col-sm-2 col-xs-12">
                <button
                  className="alert-button"
                  onClick={this.dismissAlert}
                >
                  {this.props.buttonLabel}
                </button>
              </div>
            </div>
            <div
              className="close col-xs-1"
              onClick={this.dismissAlert}
              onKeyPress={this.dismissAlert}
              role="button"
              tabIndex={0}
            >
              &times;
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

PhillipsAlert.defaultProps = {
  dismissable: 'false',
  buttonLabel: '',
  children: ''
};

PhillipsAlert.propTypes = {
  buttonLabel: PropTypes.string,
  dismissable: PropTypes.boolean,
  children: PropTypes.element
};
