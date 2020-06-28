import React, { Component } from 'react';
import { has } from 'lodash/fp';
import PropTypes from 'prop-types';

const nowPlayingHtml = '<h2>Now Playing</h2>\n';

class HomepageVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: {
        id: props.featuredVideos[0].id,
        videoUrl: props.featuredVideos[0].videoUrl,
        saleInfo: props.featuredVideos[0].saleInfo,
        htmlCaption: props.featuredVideos[0].htmlCaption
      }
    };
  }

  render() {
    return (
      <div className="phillips-video">
        <div className="video-wrapper">
          <iframe
            title={this.state.nowPlaying.videoUrl}
            src={this.state.nowPlaying.videoUrl}
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className="text-wrapper">
          <div
            className="feature-info col-xs-12 col-sm-6"
            dangerouslySetInnerHTML={{ __html: this.state.nowPlaying.saleInfo }}
          />
          <div
            className="feature-caption col-xs-12 col-sm-6"
            dangerouslySetInnerHTML={{ __html: this.state.nowPlaying.htmlCaption }}
          />
        </div>
        <ul className="hp-video-thumbnails">
          {this.props.featuredVideos.slice(0, 3).map(video => (
            <li
              onClick={() => {
                this.setState(() => {
                  return { nowPlaying: { ...video, videoUrl: `${video.videoUrl}?autoplay=1&vq=hd720` } };
                });
              }}
              role="button"
              style={{
                backgroundImage: `url(${video.thumbnail})`
              }}
              title={`Thumbnail for Vimeo ${video.videoUrl}`}
            >
              <div>
                <h2>
                  {(video.id === this.state.nowPlaying.id)
                    ? 'Now Playing'
                    : video.thumbnailCaption
                  }
                </h2>
              </div>
            </li>
          ))}
          <li className="more-videos">
            <a href="/video" title="More Videos">More Videos</a>
          </li>
        </ul>
      </div>
    );
  }
}

HomepageVideo.propTypes = {
  featuredVideos: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    displayOrder: PropTypes.number,
    htmlCaption: PropTypes.string,
    id: PropTypes.number,
    saleInfo: PropTypes.string,
    type: PropTypes.string,
    thumbnail: PropTypes.string,
    videoUrl: PropTypes.string
  })).isRequired
}

export default HomepageVideo;
