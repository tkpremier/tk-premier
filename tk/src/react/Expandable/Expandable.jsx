import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Expandable extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: props.expanded };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.state.expanded) {
      this.setState(state => ({ ...state, expanded: nextProps.expanded }));
    }
  }

  render() {
    const toggleExpanded = (e) => {
      e.preventDefault();
      this.setState(state => ({ ...state, expanded: !state.expanded }));
    };
    return (
      <li
        className={classNames(`expandable ${this.props.className}`, { closed: !this.state.expanded })}>
        <button
          className={classNames(this.props.className)}
          onClick={toggleExpanded}>{this.props.header}</button>
        <div className={classNames('panel', { hide: !this.state.expanded, 'panel--root': this.props.isRoot })}>
          {this.props.children}
        </div>
      </li>
    );
  }
}

Expandable.defaultProps = {
  className: '',
  expanded: false,
  isRoot: false
};

Expandable.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  expanded: PropTypes.bool,
  header: PropTypes.string.isRequired,
  isRoot: PropTypes.bool
};

export default Expandable;
