import React, { PureComponent } from 'react';

class OpenSeaDragonControls extends PureComponent {
  render() {
    return (
      <div className="openseadragon-controls">
        <input
          type="range"
          min={this.props.minZoom}
          max={this.props.maxZoom}
          value={this.props.currentZoom}
          step={0.001}
          onChange={this.props.onChange}
        />
        <button className="zoom-in" onClick={this.props.onZoomIn} />
        <button className="zoom-out" onClick={this.props.onZoomOut} />
      </div>
    );
  }
}

export default OpenSeaDragonControls;
