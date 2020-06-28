import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { kebabCase } from 'lodash/fp';

const bannerUrl = {
  1: 'https://content.phillips.com/images/banners/contemporary-banner.png',
  2: 'https://content.phillips.com/images/banners/photographs-banner.jpg',
  3: 'https://content.phillips.com/images/banners/design-banner.png',
  4: 'https://content.phillips.com/images/banners/jewels-banner.png',
  5: 'https://content.phillips.com/images/banners/editions-banner.png',
  6: 'https://content.phillips.com/images/banners/latin-america-banner.png',
  12: 'https://content.phillips.com/images/banners/watches-banner.png',
  24: 'https://content.phillips.com/images/banners/design-banner.png',
};

const DeptSellBanner = (props) => {
  const styles = {
    backgroundImage: `url(${bannerUrl[props.departmentId]})`
  };
  return (
    <section
      className={classNames(
        'sell-with-us',
        kebabCase(props.departmentName)
      )}
      style={styles}
    >
      <div className="container">
        <h2>Sell with us.</h2>
        <p>{`Consign to an upcoming ${props.departmentName} sale.`}</p>
        <a href="/sell/">Submit Now</a>
      </div>
    </section>
  );
};

DeptSellBanner.propTypes = {
  departmentName: PropTypes.string.isRequired
};

export default DeptSellBanner;
