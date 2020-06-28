import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LowerBannerImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      desktopImageUrl: props.desktopImageUrl,
      mobileImageUrl: props.mobileImageUrl
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.changedImg && (this.props.id === nextProps.updatedId)) {
      this.setState({
        desktopImageUrl: `${nextProps.desktopImageUrl}?${Date.now()}`,
        mobileImageUrl: `${nextProps.mobileImageUrl}?${Date.now()}`
      });
      return;
    }
    this.setState({
      imageUrl: nextProps.imageUrl
    });
  }
  render() {
    let trackSegment = null;
    let btn;
    let btnDesc = 'Add';

    const addItem = () => {
      const lowerBannerModel = {
        'id': 0,
        'url': '',
        'desktopImageUrl': '',
        'mobileImageUrl': '',
        'active': false,
        'type': 'lowerBanner',
        isNew: true
      };
      if (_.has(this.props, 'desktopImageUrl')) {
        this.props.onSelect(this, 'lowerBanner', 'POST');
      } else {
        this.props.onSelect(<LowerBannerImg {...lowerBannerModel} />, 'lowerBanner', 'POST');
      }
    };
    if (this.props.editable) {
      if (_.has(this.props, 'desktopImageUrl')) {
        btnDesc = 'Edit';
      }
      btn = <button className="btn edit-homepage" onClick={addItem}>{btnDesc}</button>
    } else {
      trackSegment = () => {
        if (!_.isUndefined(window.analytics)) {
          analytics.track('Click', {
            category: 'Homepage / Lower Banner',
            label: `Destination ${this.props.url}`
          });
        }
      };
    }
    return (
      <section id="lower-banner">
        {btn}
        <a href={this.props.url} onClick={trackSegment}>
          <picture>
            <source srcSet={this.state.desktopImageUrl} media="(min-width: 480px)" />
            <img srcSet={this.state.mobileImageUrl} alt="…" title="…" />
          </picture>
        </a>
      </section>
    );
  }
}

LowerBannerImg.defaultProps = {
  changedImg: true,
  desktopImageUrl: '',
  editable: false,
  id: '',
  imageUrl: '',
  mobileImageUrl: '',
  updatedId: '',
  url: ''
};

LowerBannerImg.propTypes = {
  changedImg: PropTypes.boolean,
  desktopImageUrl: PropTypes.string,
  editable: PropTypes.boolean,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  mobileImageUrl: PropTypes.string,
  onSelect: PropTypes.function,
  updatedId: PropTypes.string,
  url: PropTypes.string
};

export default LowerBannerImg;
