import PropTypes from 'prop-types';

export const componentDataPropTypes = {
  active: PropTypes.bool.isRequired,
  componentId: PropTypes.number.isRequired,
  displayOrder: PropTypes.number.isRequired,
  htmlCaption: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

const componentPropTypes = {
  componentContainerId: PropTypes.number.isRequired,
  componentData: PropTypes.arrayOf(PropTypes.shape(componentDataPropTypes)),
  componentType: PropTypes.number.isRequired,
  displayOrder: PropTypes.number.isRequired
};

export default componentPropTypes;
