import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Phillips360View extends Component {
  componentDidMount() {
    this.initializePlugin();
  }
  initializePlugin() {
    let xmlPath = '/dataXML/360view/';
    if (this.props.frameCount !== 36) {
      xmlPath = `${xmlPath}${this.props.frameCount}/`;
    }
    $(this.viewElement)
      .animate360({
        centerInWindow: false,
        xmlPath,
        objPath: this.props.source,
        iconPath: '/images/icons/360icons/'
      });
  }
  render() {
    return (
      <div className="phillips-360">
        <p>Drag Image for 360 view</p>
        <div
          className="animate-360"
          ref={el => { this.viewElement = el; }}
        >
        </div>
      </div>
    );
  }
}

Phillips360View.defaultProps = {
  frameCount: 36
}

Phillips360View.propTypes = {
  saleNumber: PropTypes.string,
  lotNumber: PropTypes.string,
  frameCount: PropTypes.number,
  index: PropTypes.number
};

export default Phillips360View;
