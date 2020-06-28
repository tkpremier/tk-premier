import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StickyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollPosition: 0 };
  }
  componentDidMount() {
    let scheduledAnimationFrame = false;
    window.addEventListener('scroll', () => {
      const doc = document.documentElement;
      const scrollPosition = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      if (scheduledAnimationFrame) { return; }
      scheduledAnimationFrame = true;
      requestAnimationFrame(() => {
        scheduledAnimationFrame = false;
        this.updatePosition(scrollPosition);
      });
    });
  }
  updatePosition(scrollPosition) {
    if (this.shouldWrapperBeSticky()) {
      const bodyPosition = document.body.getBoundingClientRect();
      const containerPosition = this.containerEl.getBoundingClientRect();
      const topOffset = containerPosition.top - bodyPosition.top;
      const bottomOffset = topOffset + this.containerEl.offsetHeight;
      if (bottomOffset <= scrollPosition + this.wrapperEl.clientHeight) {
        this.wrapperEl.style.bottom = `${this.props.padding}px`;
      } else if (scrollPosition - topOffset > 0) {
        const top = scrollPosition - topOffset;
        this.wrapperEl.style.top = `${top + 97}px`;
      }
      // this.wrapperEl.style = { ...currentStyles, ...style };
    }
  }
  calculateStyle() {
    let style = { position: 'relative', left: '0px' };
    const mobileHeader = 117;
    const desktopHeader = 97;
    if (this.shouldWrapperBeSticky()) {
      style = { ...style, position: 'absolute' };
      const bodyPosition = document.body.getBoundingClientRect();
      const containerPosition = this.containerEl.getBoundingClientRect();
      const topOffset = containerPosition.top - bodyPosition.top;
      const bottomOffset = topOffset + this.containerEl.offsetHeight;
      if (bottomOffset <= this.state.scrollPosition + this.wrapperEl.clientHeight) {
        style = { ...style, bottom: `${this.props.padding}px` };
      } else if (this.state.scrollPosition - topOffset > 0) {
        let top = this.state.scrollPosition - topOffset;
        if (this.props.isMobile) {
          top += mobileHeader;
        } else {
          top += desktopHeader;
        }
        style = { ...style, top: `${top}px` };
      }
    }
    return style;
  }
  shouldWrapperBeSticky() {
    let sticky = false;
    if (this.wrapperEl && this.wrapperEl.clientHeight < window.innerHeight) {
      const heightDifference = this.containerEl.clientHeight - this.wrapperEl.clientHeight;
      if (heightDifference > 300) {
        sticky = true;
      }
    }
    return sticky;
  }
  render() {
    return (
      <div className="sticky-container" ref={(el) => { this.containerEl = el; }}>
        <div
          className="sticky-wrapper"
          ref={(el) => { this.wrapperEl = el; }}
          style={this.calculateStyle()}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

StickyContainer.defaultProps = { padding: 0 };

StickyContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  padding: PropTypes.number
};

export default StickyContainer;
