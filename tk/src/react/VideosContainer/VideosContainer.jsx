import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { filter } from 'lodash/fp';
import { videoPropType } from '../PropTypes/proptypes';

class Videos extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mainVideo: props.videos[0]
    };
  }
  moreVideosList(removeVideo) {
    const videos = filter(video => video.videoPath !== removeVideo.videoPath)(this.props.videos);
    return videos;
  }
  render() {
    return (
      <section className="videos-container container">
        <h2>Videos</h2>
        <div className="row">
          <div className="col-xs-12 col-sm-7" id="video">
            <div className="phillips-video">
              <div className="video-wrapper">
                <iframe src={this.state.mainVideo.videoPath} frameBorder="0" title={this.state.mainVideo.title} />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-5" id="thumbnails">
            <div className="video-thumbnails">
              <ul>
                {this.moreVideosList(this.state.mainVideo).map(video => (
                  <li className="thumbnail-row">
                    <button onClick={() => { this.setState({ mainVideo: video }); }}>
                      <div
                        className="col-xs-6 thumb"
                        style={{ backgroundImage: `url(${video.thumbnail})`}}
                      />
                      <div className="col-xs-6 title">
                        <p>{video.title}</p>
                      </div>
                    </button>
                  </li>
                ))}
                <li>
                  <a href={`/video/filter/Department=${this.props.departmentName}`}>All Videos</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-sm-7 video-caption" id="caption">
            <h2 className="video-title">{this.state.mainVideo.title}</h2>
            <p className="video-description">{this.state.mainVideo.description}</p>
          </div>
        </div>
      </section>
    );
  }
}

Videos.defaultProps = {
  videos: [{
    "videoPath": "https://player.vimeo.com/video/161672257",
    "thumbnail": "https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/video/StartStop_thumb.jpg",
    "title": "Expert’s Guide: Aurel Bacs Presents START-STOP-RESET: 88 Epic Stainless Steel Chronographs ",
    "description": "Phillips's Senior Consultant, Aurel Bacs presents highlights from our spring thematic sale dedicated to vintage stainless steel chronographs -- START-STOP-RESET, in partnership with Pucci Papaleo"
  }]
}

Videos.propTypes = {
  videos: PropTypes.arrayOf(videoPropType),
  departmentName: PropTypes.string.isRequired
}

export default Videos;
