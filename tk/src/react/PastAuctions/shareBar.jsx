import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import uniqueId from 'lodash/fp/uniqueId';
import { isDescendant } from '../utils/DOMUtils';

class Share extends Component {
  constructor(props) {
    super(props);
    this.shareContainer = createRef(null);
    this.addthisEl = createRef(null);

    this.state = { showShareBox: false };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (!isUndefined(window.addthis)) {
        window.addthis.toolbox(`#${this.addthisEl.id}`);
      }
    }
  }

  render() {
    const url = this.props.path;
    const onClick = () => {
      this.setState(state => ({ ...state, showShareBox: !state.showShareBox }));
    };
    if (this.state.showShareBox) {
      document.addEventListener('click', (e) => {
        if (!isDescendant(this.shareContainer, e.target)) {
          this.setState(state => ({ ...state, showShareBox: false }));
        }
      }, { once: true });
    }
    return (
      <div
        className={classNames({ 'phillips-share': !this.props.displayHorizontal })}
        ref={this.shareContainer}
      >
        <span
          className={classNames('share', { icon: !this.props.displayHorizontal })}
          onClick={onClick}
        >
          {this.props.displayHorizontal ? 'Share' : null}
        </span>
        <div
          className={classNames('icons', {
            'share-box': !this.props.displayHorizontal,
            'data-addthis-toolbox': !this.props.displayHorizontal,
            row: !this.props.displayHorizontal,
            clicked: this.state.showShareBox
          })}
          id={uniqueId('data-addthis-')}
          ref={this.addthisEl}
        >
          <a
            href="#"
            data-addthis-url={url}
            className={classNames(
              'addthis_button_email share-icon email at300b', { icon: this.props.displayHorizontal }
            )}
            title="Email"
          >
            Email
          </a>
          <a
            href="#"
            data-addthis-url={url}
            className={classNames(
              'addthis_button_facebook share-icon facebook at300b', { icon: this.props.displayHorizontal }
            )}
            title="Facebook"
          >
            Facebook
          </a>
          <a
            href="#"
            data-addthis-url={url}
            className={classNames(
              'addthis_button_twitter share-icon twitter at300b', { icon: this.props.displayHorizontal }
            )}
            title="Twitter"
          >
            Twitter
          </a>
          <a
            href="#"
            data-addthis-url={url}
            className={classNames(
              'addthis_button_pinterest share-icon pinterest at300b', { icon: this.props.displayHorizontal }
            )}
            title="Pinterest"
          >
            Pinterest
          </a>
        </div>
      </div>
    );
  }
}

Share.defaultProps = {
  displayHorizontal: false
};

Share.propTypes = {
  displayHorizontal: PropTypes.bool
};

export default Share;
