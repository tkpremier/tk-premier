import React from 'react';
import PropTypes from 'prop-types';
import PhillipsImage from '../../../PhillipsImage/PhillipsImage';

const FullWidthArticle = ({
  className,
  isMobile,
  htmlCaption,
  imageUrl,
  textPosition,
  title,
  url
}) => {
  const textClassName = textPosition === 'left' ? textPosition : 'right';
  const imagePosition = textPosition === 'left' ? 'right' : 'left';
  return !isMobile
    ? (
      <article className={`row ${className} phillips__feature phillips__feature--full-width`}>
        <a
          className={`phillips__feature__description phillips__feature__description--${textClassName}`}
          dangerouslySetInnerHTML={{ __html: htmlCaption }}
          href={url}
          style={{ textDecoration: 'none' }}
        />
        <PhillipsImage
          alt={title}
          className={`phillips__feature__image phillips__feature__image--${imagePosition}`}
          cloudinary
          imagePath={imageUrl}
          transformation="EditorialHubFullWidth"
        />
      </article>
    )
    : (
      <article className={`row ${className} phillips__feature phillips__feature--full-width`}>
        <PhillipsImage
          alt={title}
          className={`phillips__feature__image phillips__feature__image--${imagePosition} phillips__feature__image--mobile`}
          cloudinary
          imagePath={imageUrl}
          transformation="EditorialHubFullWidth"
        />
        <a
          className={`phillips__feature__description phillips__feature__description--mobile phillips__feature__description--${textClassName}`}
          dangerouslySetInnerHTML={{ __html: htmlCaption }}
          href={url}
          style={{ textDecoration: 'none' }}
        />
      </article>
    );
};

FullWidthArticle.defaultProps = {
  className: '',
  isMobile: false,
  htmlCaption: '',
  imageUrl: '',
  textPosition: 'left',
  title: '',
  url: ''
};

FullWidthArticle.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  htmlCaption: PropTypes.string,
  imageUrl: PropTypes.string,
  textPosition: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
};

export default FullWidthArticle;
