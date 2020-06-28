import React from 'react';
import PropTypes from 'prop-types';
import PhillipsImage from '../../../PhillipsImage/PhillipsImage';

const GridItemArticle = ({
  htmlCaption,
  imageUrl,
  title,
  url
}) => (
    <a href={url} style={{ textDecoration: 'none' }} title={title}>
      <PhillipsImage
        alt={title}
        className="editorial-hub__grid__item__image"
        cloudinary
        imagePath={imageUrl}
        transformation="EditorialHub"
      />
      <span
        className="editorial-hub__grid__item__description"
        dangerouslySetInnerHTML={{ __html: htmlCaption }}
      />
    </a>
  );

GridItemArticle.defaultProps = {
  active: false,
  componentId: 0,
  displayOrder: 1,
  htmlCaption: '',
  imageUrl: '',
  title: '',
  url: ''
};

GridItemArticle.propTypes = {
  active: PropTypes.bool,
  componentId: PropTypes.number,
  displayOrder: PropTypes.number,
  htmlCaption: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
};

export default GridItemArticle;
