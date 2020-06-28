import React from 'react';
import PropTypes from 'prop-types';

const EditorialItem = ({ className, htmlCaption, imageUrl, url }) => {
  const imageStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%'
  };
  return (
    <li className={className}>
      <a href={url}>
        <div className="content-wrapper">
          <div
            className="image-container"
            style={imageStyles}
          />
          <span
            className="caption"
            dangerouslySetInnerHTML={{ __html: htmlCaption }}
          />
        </div>
      </a>
    </li>
  );
};

EditorialItem.propTypes = {
  className: PropTypes.string,
  htmlCaption: PropTypes.string,
  imageUrl: PropTypes.string,
  url: PropTypes.string
};
export default EditorialItem;
