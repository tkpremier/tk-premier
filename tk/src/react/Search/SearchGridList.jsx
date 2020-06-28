import PropTypes from 'prop-types';
import SearchGrid from './SearchGrid';

const SearchGridList = (props) => {
  return (<div className="col-xs-12 col-sm-9">
    {props.results.map(list =>
      <SearchGrid {...list} />
    )}
  </div>);
};

SearchGridList.defaultProps = {
  results: []
};

SearchGridList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object)
};

export default SearchGridList;
