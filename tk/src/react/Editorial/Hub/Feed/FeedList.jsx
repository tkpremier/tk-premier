import React, { useState, useEffect } from 'react';
import { Waypoint } from 'react-waypoint';
import feedPropTypes from './proptypes';
import PhillipsImage from '../../../PhillipsImage/PhillipsImage';
import getCloudinaryImageData from '../../../PhillipsImage/getCloudinaryData';

const FeedItem = ({ contentId,
  contentType,
  date,
  departmentId,
  departmentName,
  imageUrl,
  summary,
  title,
  url }) => {
  const contentTypeDesc = contentType === 1 ? 'article' : 'video';
  const { publicId } = contentType === 2 ? getCloudinaryImageData(imageUrl) : { publicId: null };
  return (
    <li className="editorial-hub__feed__item">
      {contentType === 2
        ? (
          <PhillipsImage
            alt={title}
            className={`editorial-hub__feed__item__image editorial-hub__feed__item__image--${contentTypeDesc}`}
            cloudinary
            imagePath={publicId}
            transformation="EditorialHubVideoThumb"
          />
        )
        : (
          <div className="editorial-hub__feed__item__image editorial-hub__feed__item__image--article">
            <div className="editorial-hub__feed__item__image__wrapper">
              <div
                className="editorial-hub__feed__item__image__bkg-img"
                title={title}
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            </div>
          </div>
        )
      }
      <a
        className="editorial-hub__feed__item__description-wrapper"
        href={url}
        style={{ 'textDecoration': 'none' }}
        title={title}
      >
        <pre className="phillips__eye-brow">{`${contentTypeDesc} | ${departmentName}`}</pre>
        <h2 className="portrait">{title}</h2>
        <p>{summary}</p>
      </a>
    </li>
  );
};

const initialEnd = 10;

const FeedList = ({ data }) => {
  const [end, setBeginIndex] = useState(initialEnd);
  useEffect(() => {
    if (end !== initialEnd) {
      setBeginIndex(10);
    }
  }, [data]);
  return (
    <ul className="editorial-hub__feed__list">
      {data.slice(0, end).map(item => (
        <FeedItem
          key={`feed__item-${item.contentType}-${item.contentId}`}
          {...item}
        />
      ))}
      <Waypoint
        onEnter={() => setBeginIndex(end + 10)}
      >
        <li>Get More</li>
      </Waypoint>
    </ul>
  );
};

FeedList.defaultProps = {
  data: []
};

FeedList.propTypes = {
  data: feedPropTypes
};

export default FeedList;
