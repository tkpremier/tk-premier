import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhillipsImage from '../PhillipsImage/PhillipsImage';

class SearchArtist extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }
  render() {
    const imagePath = '/images';
    // PLACEHOLDER FOR ElasticSearch demo
    return (
      <li className="phillips-artist" style={this.props.style}>
        <a href="https://wwww.phillips.com/artist/700/shelby-lee-adams">
          <PhillipsImage
            alt={this.props.makerName}
            imagePath={this.props.imageSource}
            transformation={'HomePageCarousel'}
            cloudinary={false}
          />
          <div className="description">
            <h3>{this.props.makerName}</h3>
          </div>
        </a>
      </li>
    );
  }
}

SearchArtist.defaultProps = {
  style: {},
  makerId: PropTypes.number,
  makerUrl: PropTypes.string,
  makerName: PropTypes.string,
  lotImageUrl: PropTypes.string,
  imageSource: PropTypes.string,
  detailLink: PropTypes.string
};

SearchArtist.propTypes = {
  style: PropTypes.objectOf({}),
  makerId: PropTypes.number,
  makerName: PropTypes.string,
  imageSource: PropTypes.string,
  detailLink: PropTypes.string
};

export default SearchArtist;
