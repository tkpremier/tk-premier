import React from 'react';
import classNames from 'classnames';
import { componentDataPropTypes, componentPropTypes, defaultCompProps } from '../proptypes';
import PhillipsImage from '../../../PhillipsImage/PhillipsImage';
import PhillipsVideo from '../../../PhillipsVideo/PhillipsVideo';

const FeaturedMain = ({ htmlCaption, imageUrl, itemType, title, url }) => itemType.toUpperCase() === 'VIDEO'
  ? (
    <PhillipsVideo
      className="col-xs-12 col-sm-9 editorial-hub__featured__video editorial-hub__featured__video--main"
      htmlCaption={htmlCaption}
      source={url}
      title={title}
    />
  )
  : (
    <div className="col-xs-12 col-sm-9 editorial-hub__featured__wrapper editorial-hub__featured__wrapper--main">
      <PhillipsImage
        alt={title}
        cloudinary
        imagePath={imageUrl}
        loading="eager"
        transformation="EditorialHubFeaturedMain"
      />
      <a
        className="editorial-hub__html-wrapper editorial-hub__html-wrapper--featured-main"
        dangerouslySetInnerHTML={{ __html: htmlCaption }}
        href={url}
        style={{ textDecoration: 'none' }}
        title={title}
      />
    </div>
  );
FeaturedMain.propTypes = componentDataPropTypes;
const FeaturedSide = ({ displayOrder, htmlCaption, imageUrl, itemType, title, url }) => itemType.toUpperCase() === 'VIDEO'
  ? (
    <PhillipsVideo
      className={classNames('editorial-hub__featured__side-item editorial-hub__featured__side-item--video', {
        'editorial-hub__featured__side-item--top': (displayOrder === 2),
        'editorial-hub__featured__side-item--bottom': (displayOrder === 3)
      })}
      htmlCaption={htmlCaption}
      source={url}
      title={title}
    />
  )
  : (
    <div
      className={classNames('editorial-hub__featured__side-item', {
        'editorial-hub__featured__side-item--top': (displayOrder === 2),
        'editorial-hub__featured__side-item--bottom': (displayOrder === 3)
      })}
    >
      <PhillipsImage
        alt={title}
        cloudinary
        imagePath={imageUrl}
        loading="eager"
        transformation="EditorialHub"
      />
      <a
        className="editorial-hub__html-wrapper"
        dangerouslySetInnerHTML={{ __html: htmlCaption }}
        href={url}
        style={{ textDecoration: 'none' }}
        title={title}
      />
    </div>
  );
FeaturedSide.propTypes = componentDataPropTypes;

const Featured = ({ componentData, title }) => (
  <div className="row editorial-hub__featured">
    <FeaturedMain
      {...componentData[0]}
    />
    <div className="col-xs-12 col-sm-3 editorial-hub__featured__wrapper editorial-hub__featured__wrapper--side">
      <FeaturedSide
        {...componentData[1]}
      />
      <FeaturedSide
        {...componentData[2]}
      />
    </div>
  </div>
);
Featured.defaultProps = defaultCompProps;
Featured.propTypes = componentPropTypes;
export default Featured;
