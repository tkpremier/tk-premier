import { connect } from 'react-redux';
import Sort from '../Sort/Sort';

const mapStateToProps = ({ sortOptions, urlQueries }, { deviceType = 'tablet' }) => {
  const { filter = '', sort } = urlQueries;
  return {
    deviceType,
    filter,
    sort,
    sortOptions,
    type: filter.length > 0 ? 'ROUTES_FILTERSORT' : 'ROUTES_SORT'
  };
};

const mapDispatchToProps = dispatch => ({
  handleSort: (e) => {
    let { type } = e.target.dataset;
    const { filter } = e.target.dataset;
    const { value } = e.target;
    type = value.toUpperCase() === 'DEFAULT'
      ? e.target.dataset.type.indexOf('FILTER') > -1
        ? 'ROUTES_FILTER'
        : 'ROUTES_DEFAULT'
      : type;
    const sort = value.toUpperCase() === 'DEFAULT' ? '' : value;
    const action = {
      type,
      payload: {
        filter,
        sort
      }
    };
    dispatch(action);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
