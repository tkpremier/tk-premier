import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import OpenSeaDragonControls from './OpenSeaDragonControls';

class OpenSeaDragonView extends Component {
  constructor(props) {
    super(props);
    this.state = { initialized: false, currentZoom: 0 };
    this.config = this.config.bind(this);
  }
  componentDidMount() {
    this.viewer = window.OpenSeadragon(this.config());
    this.viewer.addHandler('open', () => {
      this.setState((state) => {
        return { ...state, initialized: true, currentZoom: this.viewer.viewport.getZoom() }
      });
    });
    this.viewer.addHandler('zoom', () => {
      this.setState(state => ({ ...state, currentZoom: this.viewer.viewport.getZoom() }));
    });
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentZoom !== this.state.currentZoom) {
      this.viewer.viewport.zoomTo(nextState.currentZoom);
    }
  }
  updateZoom(e) {
    const value = e.target.value;
    this.setState(state => ({ ...state, currentZoom: value }));
  }
  zoomIn() {
    if (this.viewer.viewport.getZoom() * 1.2 < this.viewer.viewport.getMaxZoom()) {
      this.setState(state => ({ ...state, currentZoom: state.currentZoom * 1.2 }));
    }
  }
  zoomOut() {
    if (this.viewer.viewport.getZoom() * (1 / 1.2) > this.viewer.viewport.getMinZoom()) {
      this.setState(state => ({ ...state, currentZoom: state.currentZoom * (1 / 1.2) }));
    }
  }
  config() {
    const config = {
      id: 'osd-viewer',
      include_navigator: true,
      include_controls: true,
      default_config: {
        showNavigator: true,
        id: 'osd-viewer',
        visibilityRatio: 1.0,
        constrainDuringPan: false,
        defaultZoomLevel: 0.8,
        minZoomLevel: 0.5,
        maxZoomLevel: 10,
        zoomInButton: 'zoom-in',
        homeButton: 'reset',
        fullPageButton: 'full-page',
        nextButton: 'next',
        previousButton: 'previous'
      }
    };
    return { ...config, ...this.props.config };
  }
  render() {
    let controls = null;
    if (this.props.showControls && this.state.initialized) {
      controls = (
        <OpenSeaDragonControls
          minZoom={this.viewer.viewport.getMinZoom()}
          maxZoom={this.viewer.viewport.getMaxZoom()} 
          currentZoom={this.state.currentZoom}
          onChange={e => this.updateZoom(e)}
          onZoomIn={() => this.zoomIn()}
          onZoomOut={() => this.zoomOut()}
        />
      );
    }
    return (
      <div className="openseadragon-view">
        <div className={classNames('image-loader', { hidden: this.state.initialized })}>
          <div className="signal" />
        </div>
        <div className="close" onClick={this.props.close} />
        {controls}
        <div className="openseadragon" id="osd-viewer"></div>
      </div>
    );
  }
}

OpenSeaDragonView.propTypes = {
  close: PropTypes.func,
  showControls: PropTypes.bool,
  config: PropTypes.Object,
  source: PropTypes.string.isRequired
};

export default OpenSeaDragonView;
