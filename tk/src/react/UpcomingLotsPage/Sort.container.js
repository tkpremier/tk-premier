import { connect } from 'react-redux';
import Sort from '../Sort/Sort';


const mapStateToProps = ({ sortOptions, urlQueries }) => {
  
  const { saleNumber, filter, sort, saleNumbers } = urlQueries;
  const saleNumberType = saleNumber.length > 0 ? 'SALENUMBER' : '';
  const filterType = filter.length > 0 ? 'FILTER' : '';
  let type = `ROUTES_${saleNumberType}${filterType}SORT`;
  return { filter, sortOptions, type, urlQueries };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSort: (e) => {
    const { type, filter } = e.target.dataset;
    const action = {
      type,
      payload: {
        filter,
        sort: e.target.value
      }
    };
    dispatch(action);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
