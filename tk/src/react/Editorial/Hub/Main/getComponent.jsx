import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Featured from './Featured';
import { componentPropTypes, defaultCompProps } from '../proptypes';
import PhillipsVideo from '../../../PhillipsVideo/PhillipsVideo';
import PhillipsGrid from '../../../PhillipsGrid/PhillipsGrid';
import FullWidthArticle from './FullWidthArticle';
import GridItemArticle from './GridItemArticle';

export const EditorialHubVideo = ({ componentData }) => (
  <Fragment>
    {componentData.map(({ componentId, componentType, htmlCaption, title, url }) => (
      <PhillipsVideo
        className="editorial-hub__video"
        htmlCaption={htmlCaption}
        key={`${componentType}-${componentId}`}
        source={url}
        title={title}
      />
    ))}
  </Fragment>
);
EditorialHubVideo.defaultProps = defaultCompProps;
EditorialHubVideo.propTypes = componentPropTypes;

export const EditorialHubFullWidthArticle = ({ componentType, componentData, isMobile }) => (
  <Fragment>
    {componentData.map(({ componentId, htmlCaption, imageUrl, itemType, title, url }) => {
      switch (itemType.toUpperCase()) {
        case 'VIDEO':
          return (
            <PhillipsVideo
              className="editorial-hub__video"
              htmlCaption={htmlCaption}
              key={`${componentType}-${componentId}`}
              source={url}
              title={title}
            />
          );
        default:
          return (
            <FullWidthArticle
              isMobile={isMobile}
              htmlCaption={htmlCaption}
              imageUrl={imageUrl}
              key={`${componentType}-${componentId}`}
              textPosition={componentType === 4 ? 'right' : 'left'}
              title={title}
              url={url}
            />
          );
      }
    })}
  </Fragment>
);

EditorialHubFullWidthArticle.defaultProps = defaultCompProps;
EditorialHubFullWidthArticle.propTypes = { ...componentPropTypes, isMobile: PropTypes.bool.isRequired };

export const EditorialHubGrid = ({ componentContainerId, componentData, isMobile, title }) => (
  <Fragment>
    <h2 className="editorial-hub__grid__title">{title}</h2>
    <PhillipsGrid
      classNames="editorial-hub__grid"
      columns={{
        lg: 4,
        md: 4,
        sm: 6,
        xs: 12
      }}
      key={`EditorialHubGrid-${componentContainerId}`}
    >
      {componentData.map(child => {
        switch (child.itemType.toUpperCase()) {
          case 'VIDEO':
            return (
              <PhillipsVideo
                className="editorial-hub__video"
                htmlCaption={child.htmlCaption}
                key={`EditorialHubGridItem-${componentContainerId}-${child.componentId}`}
                source={child.url}
                title={child.title}
              />
            );
          default:
            return (
              <GridItemArticle
                isMobile={isMobile}
                key={`EditorialHubGridItem-${componentContainerId}-${child.componentId}`}
                className="editorial-hub__grid__item"
                htmlCaption={child.htmlCaption}
                url={child.url}
                imageUrl={child.imageUrl}
              />
            );
        };
      })}
    </PhillipsGrid>
  </Fragment>
);

EditorialHubGrid.defaultProps = defaultCompProps;
EditorialHubGrid.propTypes = { ...componentPropTypes, isMobile: PropTypes.bool.isRequired };

const getComponentByTypeId = (typeId) => {
  switch (typeId) {
    case 1:
      return Featured;
    case 2:
      return EditorialHubVideo;
    case 3:
    case 4:
      return EditorialHubFullWidthArticle;
    case 5:
      return EditorialHubGrid;
    default:
      return null;
  }
};

/*
  {
    featuredSection = 1,
    video = 2,
    articleTextLeft = 3,
    articleTextRight = 4,
    articleGrid = 5
  }
*/

export default getComponentByTypeId;
