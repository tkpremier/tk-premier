import React from 'react';
import PropTypes from 'prop-types';

const PhillipsVideo = ({
  className,
  description,
  htmlCaption,
  showCaption,
  source,
  title
}) => {
  let caption = null;
  if (showCaption) {
    caption = (
      <div className="video-caption">
        <p className="video-title">
          <strong>{title}</strong>
        </p>
        {description.length > 0
          ? (
            <p className="video-description">
              {description}
            </p>
          ) : null
        }
      </div>
    );
  } else if (htmlCaption.length > 0) {
    caption = (
      <div
        className="video-caption"
        dangerouslySetInnerHTML={{ __html: htmlCaption }}
      />
    );
  }

  return (
    <div className={`phillips-video ${className}`}>
      <div className="video-wrapper">
        <iframe allowFullScreen src={source} frameBorder="0" title={title} />
      </div>
      {caption}
    </div>
  );
};
PhillipsVideo.defaultProps = {
  className: '',
  source: '',
  title: '',
  description: '',
  htmlCaption: '',
  showCaption: false
};

PhillipsVideo.propTypes = {
  className: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  htmlCaption: PropTypes.string,
  showCaption: PropTypes.bool
};

export default PhillipsVideo;
