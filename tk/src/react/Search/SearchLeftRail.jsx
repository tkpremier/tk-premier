import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import { allResultsPending, typeSpecificPending } from './actions';

const SearchLeftRail = (props) => {
  return (<div className="col-xs-12 col-sm-3">
    <p>Search Results</p>
    <ul>
      <li><Link to={allResultsPending({ query: props.query })}>All Results</Link></li>
      {props.results.map(result =>
        (<li>
          <Link to={typeSpecificPending({ query: props.query, searchType: result.type })} >
            {result.title} ({result.totalCount})
          </Link>
        </li>)
      )}
    </ul>
  </div>);
};

SearchLeftRail.defaultProps = {
  results: [],
  query: ''
};

SearchLeftRail.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  query: PropTypes.string
};

export default SearchLeftRail;
