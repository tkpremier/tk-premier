import { Link } from 'react-router-dom';
import SearchCont from '../containers/search';

const letters = [...Array(26)].map((val, i) => String.fromCharCode(i + 65).toLowerCase());

const BrowseBar = props => (
  <div className="row" id="browse-search-bar">
    <span className="seroMedium">Browse by name</span>
    <LinkList {...props} list={letters} />
    <SearchCont />
  </div>
);

const LinkList = (props) => {
  const links = props.list.map((val) => {
    let link;
    if (props.page === 'landing') {
      link = (<li key={val}>
        <a href={`/artists/${val}`}>{val}</a>
      </li>)
    } else {
      link = (<li key={val}>
        <Link {...props} activeClassName='active' to={`/artists/${val}`}>{val}</Link>
      </li>)
    }
    return link;
  })
  return (
    <ul className="browse-bar col-xs-12 col-md-6">
      {links}
    </ul>
  );
}


export default BrowseBar;
