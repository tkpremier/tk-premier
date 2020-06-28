import PropTypes from 'prop-types';

export const defaultFilterData = {
  stateToFilter: [],
  relevantProps: [],
  filterDimensions: []
};

const filterDataPropTypes = {
  stateToFilter: PropTypes.arrayOf(PropTypes.string),
  relevantProps: PropTypes.arrayOf(PropTypes.string),
  filterDimensions: PropTypes.arrayOf(PropTypes.shape({
    'dimension': PropTypes.string,
    'enabled': PropTypes.bool,
    'items': PropTypes.arrayOf(PropTypes.object),
    'filterBy': PropTypes.oneOf([PropTypes.string, PropTypes.func])
  }))
};

export const filterItemDefaultProps = {
  label: '',
  filter: '',
  hide: true,
  linkPayload: {
    type: ''
  },
  payload: {},
  sort: '',
  status: 'inactive',
  type: ''
};

export const filterItemPropTypes = {
  label: PropTypes.string,
  filter: PropTypes.string,
  hide: PropTypes.bool,
  linkPayload: PropTypes.shape({ type: '' }),
  payload: PropTypes.shape({}),
  sort: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string
};

export default filterDataPropTypes;