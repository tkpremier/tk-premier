import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhillipsCarousel from '../PhillipsCarousel/PhillipsCarousel';
import handleMql from '../utils/handleMql';

const InstaPanel = (data) => {
  const imageStyle = {
    backgroundImage: `url('${encodeURI(data.imagePath)}')`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    height: '320px',
    width: '320px'
  };

  return (
    <section className="content-block-instapanel" key={data.postUrl}>
      <a href={data.postUrl}>
        <div className="content-block-image" style={imageStyle} />
      </a>
    </section>
  );
}


export default class DeptInsta extends Component {
  state = {
    isDesktop: false
  }

  componentDidMount() {
    handleMql('screen and (min-width: 480px)', this.setIsDesktop);
  }

  setIsDesktop = ({ matches }) => {
    this.setState(state => ({ ...state, isDesktop: matches }));
  }

  render() {
    return (
      <div className="department-grid instagram-wrapper">
        <div className={this.state.isDesktop ? 'container' : 'mobile-container'}>
          <div className="instagram-header">
            <h2>{this.props.title}</h2>
            <div className="instagram-follow">
              <a href={`https://www.instagram.com/${this.props.data.account}/`}>Follow Us</a>
            </div>
          </div>
        </div>
        {this.state.isDesktop
          ? (
            <div className="container">
              <div className="row instagram-thumbs">
                {this.props.data.photos.map(data => InstaPanel(data))}
              </div>
            </div>
          )
          : (
            <PhillipsCarousel
              sizes={{
                xl: 3, lg: 3, md: 2, sm: 1, xs: 1
              }}
            >
              {this.props.data.photos.map(data => InstaPanel(data))}
            </PhillipsCarousel>
          )
        }
      </div>
    );
  }
}

DeptInsta.defaultProps = {
  title: 'Instagram Feed'
};

DeptInsta.propTypes = {
  data: PropTypes.shape({
    'account': PropTypes.string,
    'photos': PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  title: PropTypes.string
};
