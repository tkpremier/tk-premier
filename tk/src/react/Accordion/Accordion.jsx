import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }
  render() {
    return (
      <div className={classNames('accordion', this.props.className, { 'open': this.state.opened })}>
        <div>
          {this.props.children}
          {this.state.opened
            ? null
            : (<span className="ellipsis">...</span>)
          }
        </div>
        <button onClick={() => this.setState({ opened: !this.state.opened })}>
          {this.state.opened ? this.props.btnLabelClose : this.props.btnLabelOpen}
        </button>
      </div>
    );
  }
}

Accordion.defaultProps = {
  btnLabelOpen: 'Read More',
  btnLabelClose: 'Read Less',
  className: ''
}

Accordion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  btnLabelOpen: PropTypes.string,
  btnLabelClose: PropTypes.string
}
