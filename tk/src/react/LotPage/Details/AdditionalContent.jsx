import React from 'react';
import camelCase from 'lodash/camelCase';
import { additionalContentPropTypes } from '../proptypes';
import PhillipsCarousel from '../../PhillipsCarousel/PhillipsCarousel';
import PhillipsDangerous from '../../PhillipsDangerous';
import PhillipsImage from '../../PhillipsImage/PhillipsImage';

const getComponent = (type) => {
  switch (type.toUpperCase()) {
    case 'CAROUSEL':
    case 'RICHTEXTCAROUSEL':
      return PhillipsCarousel;
    case 'RICHTEXT':
    default:
      return PhillipsDangerous;
  }
};

const LotContent = (props) => {
  const Component = getComponent(props.componentType);
  let child = null;
  switch (props.componentType.toUpperCase()) {
    case 'CAROUSEL':
      child = (
        <Component sizes={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} classNames="lot-page__details__list__item__carousel">
          {props.componentData.map((data) => {
            return (
              <div
                className="lot-page__details__list__item__carousel__item"
                key={data.componentId}
              >
                <PhillipsImage
                  alt={props.title}
                  cloudinary
                  transformation="TwoColumnsOneRowNoPad"
                  imagePath={data.imageUrl}
                />
              </div>
            );
          })}
        </Component>
      );
      break;
    case 'RICHTEXTCAROUSEL':
      child = (
        <Component sizes={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} classNames="lot-page__details__list__item__carousel">
          {props.componentData.map(data => (
            <PhillipsDangerous
              {...data}
              className="lot-page__details__list__item__carousel__item lot-page__details__list__item__richtext"
              key={data.componentId}
            />
          ))}
        </Component>
      );
      break;
    case 'RICHTEXT':
    default:
      child = props.componentData.map(data => <Component {...data} className="lot-page__details__list__item__richtext" />);
  }
  return (
    <li name={`${camelCase(props.title)}-stickyNav`} className="lot-page__details__list__item">
      <h4 className="lot-page__details__list__item__header">{props.title}</h4>
      {child}
    </li>
  );
};

LotContent.propTypes = additionalContentPropTypes;

export default LotContent;
