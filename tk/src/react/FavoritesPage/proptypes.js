import PropTypes from 'prop-types';
import { lotPropTypes } from '../PropTypes/proptypes';

export const defaultEditingLotList = {
  id: null,
  lots: [],
  name: '',
  description: '',
  status: '',
  updateProp: ''
};

export const editingLotListPropTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  lots: PropTypes.arrayOf(lotPropTypes),
  name: PropTypes.string,
  status: PropTypes.string,
  updatedProperty: PropTypes.string
};

export const defaultList = {
  id: 0,
  count: 0,
  description: '',
  lots: [],
  name: ''
};

const listPropTypes = {
  id: PropTypes.number,
  count: PropTypes.number,
  description: PropTypes.string,
  lots: PropTypes.arrayOf(lotPropTypes),
  name: PropTypes.string
};

export default listPropTypes;