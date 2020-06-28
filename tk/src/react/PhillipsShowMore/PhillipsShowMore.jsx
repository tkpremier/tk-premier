import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PhillipsShowMore extends Component {
  constructor(props) {
    super(props);
    this.state = { showAll: false };
  }
  componentDidMount() {
    if (this.showMoreContent.offsetHeight <= this.props.height) {
      this.showContent();
    }
  }
  componentWillReceiveProps() {
    if (this.showMoreContent.offsetHeight <= this.props.height) {
      this.setState(state => ({ ...state, showAll: true }));
    } else {
      this.setState(state => ({ ...state, showAll: false }));
    }
  }
  showContent() {
    this.setState(state => ({ ...state, showAll: true }));
  }
  render() {
    const style = this.state.showAll ? null : { height: `${this.props.height}px` };
    return (
      <div
        style={style}
        className="phillips-show-more"
      >
        <div className="show-more-content" ref={el => this.showMoreContent = el}>
          {this.props.children}
        </div>
        <div className={this.state.showAll ? 'show-more-overlay hidden' : 'show-more-overlay'} />
        <button
          className={this.state.showAll ? 'show-more-button hidden' : 'show-more-button'}
          onClick={() => this.showContent()}
        >
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

PhillipsShowMore.defaultProps = {
  height: 300,
  buttonText: 'Show More'
};

PhillipsShowMore.propTypes = {
  height: PropTypes.number,
  buttonText: PropTypes.string,
  children: PropTypes.element.isRequired
};

export default PhillipsShowMore;
