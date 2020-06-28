import React from 'react';
import PropTypes from 'prop-types';

const DeptHero = (props) => {
  return (
    <div className="banner">
      <div className="image" style={{ backgroundImage: `url('${props.imagePath}')` }} />
      <div className="content-body">
        <div className="container">
          <section className="dept-cta row">
            <div
              className="col-xs-12 col-sm-8 caption"
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
            <div className="col-xs-12 col-sm-4 cta">
              <a className="cta-button" href={props.link}>{props.buttonText}</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

DeptHero.defaultProps = {
  imagePath: 'https://www.phillips.com/content/images/auctions/banners/2017/HK080217.jpg',
  link: '#',
  buttonText: 'View Sale',
  description: '<pre>Next Auction &bull; 26 September &bull; New York</pre>' +
    '<h2>WINNING ICONS - Legendary Watches of the 20th Century</h2>' +
    '<p>This is some blurb that will be replaced by some other blurb.  In the meantime, enjoy this blurb.</p>'
}

DeptHero.propTypes = {
  bannerImg: PropTypes.string,
  bannerLink: PropTypes.string,
  bannerLinkLabel: PropTypes.string,
  description: PropTypes.string
}

export default DeptHero;