import React, { Component } from 'react';
const withScroll = (Child) => {
  return class ScrollPosition extends Component {
    constructor(props) {
      super(props);
      this.setRef = this.setRef.bind(this);
    }
    componentDidMount() {
      console.log('withScrollMounted: ', this.scrollRef);
    }
    setRef(el) {
      this.scrollRef = el;
    }
    render() {
      return (
        <Child {...this.props} ref={this.setRef} />
      );
    }
  };
};

export default withScroll;
