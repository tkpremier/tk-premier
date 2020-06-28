import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PhillipsCarousel from './PhillipsCarousel';
import handleMql from '../utils/handleMql';

class BuyNowCarousel extends PureComponent {
  state = {
    deviceType: 'tablet'
  }

  componentDidMount() {
    if (typeof matchMedia !== 'undefined') {
      handleMql('screen and (min-width: 480px)', this.setDeviceType);
    }
  }

  setDeviceType = (mql) => {
    const { deviceType } = this.state;
    if (mql.matches) {
      if (deviceType === 'mobile') {
        this.setState(state => ({ ...state, deviceType: 'tablet' }));
      }
    } else if (deviceType === 'tablet') {
      this.setState(state => ({ ...state, deviceType: 'mobile' }));
    }
  }

  render() {
    const { itemCount, position } = this.props;
    const { deviceType } = this.state;
    return (
      <div className={classNames("phillips-carousel--buy-now__container container", {
        'phillips-carousel--buy-now__container--no-border-top': position === 1
      })}>
        <div className="row">
          <div className="col-xs-12 phillips-carousel--buy-now__top">
            <section className="phillips-carousel--buy-now__title-count-desc-wrapper">
              <div className="phillips-carousel--buy-now__title-count-wrapper">
                <span
                  className="phillips-carousel--buy-now__title"
                  dangerouslySetInnerHTML={{ __html: this.props.carouselTitle }}
                />
                &nbsp;&nbsp;
                  <span className="phillips-carousel--buy-now__count">
                  {`${itemCount} watches for sale`}
                </span>
              </div>
              <span
                className="phillips-carousel--buy-now__description"
                dangerouslySetInnerHTML={{ __html: this.props.carouselDesc }}
              />
            </section>
            {deviceType === 'tablet'
              ? (
                <div className="phillips-carousel--buy-now__link__wrapper homepage__buy-now__link__wrapper--tablet">
                  <a
                    className="phillips-carousel--buy-now__link"
                    href={this.props.editable
                      ? 'https://phillips.com/perpetual'
                      : '/perpetual'
                    }
                    title="Enter Watches Store"
                  >
                    Enter Watches Store
                    </a>
                </div>
              )
              : null
            }
          </div>

          <PhillipsCarousel
            classNames="col-xs-12 phillips-carousel--buy-now"
          >
            {this.props.children}
          </PhillipsCarousel>
          {deviceType === 'mobile'
            ? (
              <div className="phillips-carousel--buy-now__link__wrapper phillips-carousel--buy-now__link__wrapper--mobile">
                <a
                  className="phillips-carousel--buy-now__link"
                  href={this.props.editable
                    ? 'https://phillips.com/perpetual'
                    : '/perpetual'
                  }
                  title="Enter Watches Store"
                >
                  Enter Watches Store
                </a>
              </div>
            )
            : null
          }
        </div>
      </div>
    );
  }
}

BuyNowCarousel.defaultProps = {
  buyNowSaleNumber: '',
  carouselItems: [],
  carouselDesc: '',
  position: 0,
  carouselTitle: 'Watches Perpetual'
}

BuyNowCarousel.propTypes = {
  active: PropTypes.bool.isRequired,
  buyNowSaleNumber: PropTypes.string,
  carouselItems: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  carouselDesc: PropTypes.string,
  carouselId: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  position: PropTypes.number,
  carouselTitle: PropTypes.string
};

export default BuyNowCarousel;
