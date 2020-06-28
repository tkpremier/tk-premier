import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sendAnalytics from '../../utils/sendAnalytics';
import breakpoints from '../utils/breakpoints';

export default class ConsignmentBannerCMS extends Component {
  constructor(props) {
    super(props);
    this.submitConsignAnalytics = this.submitConsignAnalytics.bind(this);
    this.state = {
      hidden: true,
      showBanner: this.props.backgroundUrl
    };
  }

  componentDidMount() {
    breakpoints((mql) => {
      const backgroundUrl = mql.size === 'xs' ?
        '' :
        this.props.backgroundUrl;
      return this.setState({
        showBanner: backgroundUrl
      });
    });
  }

  submitConsignAnalytics() {
    sendAnalytics({
      eventCategory: 'Consignment Click',
      eventAction: `Clicked Consignment Promotion, Homepage Banner: ${this.props.bannerId}`,
      eventLabel: 'www.phillips.com'
    });
  }

  render() {
    const imageStyle = {
      backgroundImage: `url('${this.state.showBanner}')`,
      backgroundColor: this.props.backgroundColor,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '100% 50%',
      height: this.props.bannerHeight,
      width: '100%',
      marginLeft: 0,
      marginBottom: '60px'
    };

    return (
      <div className="sell-consignment consignment-home banner-cms" style={imageStyle}>
        <div className="container">
          <div className="col-md-3 hidden-xs" />
          <div className="cms-banner-copy col-md-6 col-xs-12">
            <h3>{this.props.sellText}</h3>
            <p>{this.props.consignmentText}</p>
            <a
              className="submit"
              href="/sell"
              onClick={this.submitConsignAnalytics}
            >
              {this.props.submitText}
            </a>
          </div>
          <div className="col-md-3 hidden-xs" />
        </div>
      </div>
    );
  }
}

ConsignmentBannerCMS.defaultProps = {
  backgroundColor: '#eee',
  backgroundUrl: '',
  bannerId: '0',
  bgFit: 'inside',
  bgHorizontalJustify: 'left',
  bgVerticalJustify: 'center',
  consignmentText: 'We are inviting consignments for our upcoming auctions.',
  copyJustify: 'center',
  bannerHeight: 285,
  sellText: 'Sell with us.',
  submitText: 'Submit Now'
};

ConsignmentBannerCMS.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundUrl: PropTypes.string,
  bannerId: PropTypes.string,
  bgFit: PropTypes.string, // inside, breaking
  bgHorizontalJustify: PropTypes.string, // left, right
  bgVerticalJustify: PropTypes.string, // top, center, bottom
  consignmentText: PropTypes.string,
  copyJustify: PropTypes.string, // center, offset
  bannerHeight: PropTypes.number,
  sellText: PropTypes.string,
  submitText: PropTypes.string
};
