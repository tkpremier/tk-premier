import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DetailVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canPlay: false,
      playing: false,
      showControls: false,
      paused: false
    };
    this.checkAutoPlay = this.checkAutoPlay.bind(this);
    this.checkPlaying = this.checkPlaying.bind(this);
    this.checkPause = this.checkPause.bind(this);
  }
  checkAutoPlay(e) {
    let showControls = false;
    if (!this.state.playing) {
      e.target.play();
      showControls = true;
    }
    this.setState((state) => {
      return {
        ...state,
        showControls,
        canPlay: true
      };
    });
  }
  checkPlaying() {
    this.setState((state) => {
      return { ...state, showControls: false, playing: true };
    });
  }
  checkPause() {
    this.setState((state) => {
      return { ...state, showControls: true, paused: true, playing: false };
    });
  }
  render() {
    return (
      <video
        autoPlay
        loop
        preload="auto"
        src={this.props.src}
        onCanPlay={this.checkAutoPlay}
        controls={this.state.showControls || this.state.paused}
        onPlaying={this.checkPlaying}
        onPause={this.checkPause}
      />
    );
  }
}


DetailVideo.propTypes = {
  src: PropTypes.string
};

export default DetailVideo;