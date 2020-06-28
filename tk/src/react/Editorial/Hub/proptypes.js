/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const componentDataPropTypes = {
  active: PropTypes.bool.isRequired,
  componentId: PropTypes.number.isRequired,
  displayOrder: PropTypes.number.isRequired,
  htmlCaption: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
export const defaultCompProps = {
  componentData: [],
  title: ''
};
export const componentPropTypes = {
  componentContainerId: PropTypes.number.isRequired,
  componentData: PropTypes.arrayOf(PropTypes.shape(componentDataPropTypes)),
  componentType: PropTypes.number.isRequired,
  displayOrder: PropTypes.number.isRequired,
  title: PropTypes.string
};
