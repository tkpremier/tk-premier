import React from 'react';
import PropTypes from 'prop-types';

const FlocklerBanner = (props) => {
  return (
    <div className="flockler-banner clearfix">
      <div className="banner-wrapper col-xs-12 row">
        <div className="banner-image col-xs-12 col-md-4">
          <div className="image-wrapper">
            <a href={`${props.articleUrl}`}>
              <div
                className="flockler-banner-image"
                style={{ backgroundImage: `url(${props.coverUrl})` }}
              />
            </a>
          </div>
        </div>
        <div className="banner-content col-xs-12 col-md-8">
          <a href={`/${props.section}`} className="section-eyebrow" >{props.section}</a>
          <a href={`${props.articleUrl}`}>
            <p className="publish-date">{props.dateString}</p>
            <h2>{props.title}</h2>
            <p>{props.summary}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

FlocklerBanner.defaultProps = {
  id: 0,
  coverUrl: '/images/team_placeholder_backup.jpg',
  title: '',
  dateString: '',
  section: '',
  summary: ''
};

FlocklerBanner.propTypes = {
  articleUrl: PropTypes.string,
  id: PropTypes.number,
  coverUrl: PropTypes.string,
  title: PropTypes.string,
  dateString: PropTypes.string,
  section: PropTypes.string,
  summary: PropTypes.string
};

export default FlocklerBanner;
