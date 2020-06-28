import PropTypes from 'prop-types';

export const defaultModalProps = {
  show: false,
  component: null,
  data: {},
  status: '',
  error: null
};

export const modalPropTypes = {
  component: PropTypes.element,
  data: PropTypes.shape({}),
  error: PropTypes.shape({}),
  show: PropTypes.bool,
  status: PropTypes.string
};
